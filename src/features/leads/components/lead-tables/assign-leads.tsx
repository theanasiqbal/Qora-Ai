import { getInitials } from "@/lib/helpers";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const AssignLeads = ({ leadData }: { leadData: any }) => {
  const [agents, setAgents] = useState<{ id: string; name: string }[]>([]);
  const [assignedAgent, setAssignedAgent] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<{
    top: number;
    left: number;
    direction: "up" | "down";
  }>({
    top: 0,
    left: 0,
    direction: "down",
  });

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("/api/add-users");
        const data = await res.json();
        if (res.ok) {
          const formattedAgents = data.users.map((user: any) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName ?? ""}`.trim(),
          }));
          setAgents(formattedAgents);

          const foundAgent = formattedAgents.find(
            (agent: any) => agent.id === leadData?.assignedAgentId
          );

          if (foundAgent) {
            setAssignedAgent(foundAgent);
          }
        } else {
          console.error("Failed to fetch agents:", data.error);
        }
      } catch (err) {
        console.error("Error fetching agents:", err);
      }
    };
    fetchAgents();
  }, []);

  const handleSelectAgent = async (agent: { id: string; name: string }) => {
    console.log("agent", agent)
    try {
      const res = await fetch(`/api/lead/${leadData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignedAgentId: agent.id,
        }),
      });
  
      if (res.ok) {
        setAssignedAgent(agent);
      } else {
        const errorData = await res.json();
        console.error("Failed to assign agent:", errorData);
      }
    } catch (error) {
      console.error("Error assigning agent:", error);
    }
  
    setIsDropdownOpen(false);
  };
  

  const initials = assignedAgent ? getInitials(assignedAgent.name) : "UA";

  const handleClickOutside = (event: MouseEvent) => {
    if (
      avatarRef.current &&
      !avatarRef.current.contains(event.target as Node) &&
      document.getElementById("assign-dropdown") &&
      !document
        .getElementById("assign-dropdown")
        ?.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!avatarRef.current) return;

    const rect = avatarRef.current.getBoundingClientRect();
    const dropdownHeight = 200; // estimate height
    const viewportHeight = window.innerHeight;

    const direction =
      rect.bottom + dropdownHeight > viewportHeight ? "up" : "down";
    const top =
      direction === "down"
        ? rect.bottom + window.scrollY
        : rect.top + window.scrollY;
    const left = rect.left + window.scrollX;

    setDropdownStyle({ top, left, direction });
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <button
        ref={avatarRef}
        className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-md cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
      >
        {initials}
      </button>

      {isDropdownOpen &&
        createPortal(
          <div
            id="assign-dropdown"
            style={{
              position: "absolute",
              top:
                dropdownStyle.direction === "down"
                  ? dropdownStyle.top
                  : dropdownStyle.top - 200,
              left: dropdownStyle.left,
              zIndex: 9999,
              width: "9rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              borderRadius: "0.375rem",
              overflow: "hidden",
            }}
            className="ring-1 ring-black ring-opacity-5"
          >
            <div className="py-1">
              {agents.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No agents found
                </div>
              ) : (
                agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={(e) => {
                      // e.stopPropagation();
                      handleSelectAgent(agent);
                    }}
                    className="block w-full text-left text-black px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {agent.name}
                  </button>
                ))
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default AssignLeads;

"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Menu, Brain, X } from "lucide-react";
import {
  format,
  isToday,
  isYesterday,
  isWithinInterval,
  subDays,
} from "date-fns";
import { setCookie, getCookie, clearCookie } from "@/lib/helpers";
import { ChatInput } from "./ChatInput";
import Messages from "./Messages";
import FormattingPanel from "./FormattingPanel";
import toast from "react-hot-toast";
import Image from "next/image";
import BrainModal from "./modal/brain-modal";
import { currentUser } from "@clerk/nextjs/server";

type Chat = {
  chatId: string;
  lastMessage: string;
  companyName: string;
  createdAt: string;
};

type GroupedChats = {
  [label: string]: Chat[];
};

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: any;
}) => {
  // const { user } = useUser();
  // const companyName = user?.fullName;
  // const cookieChatId = getCookie("chatId");
  // const dynamicSessionId = `${companyName}-${cookieChatId || "Unknown"}`;

  const {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    setInput,
    isLoading,
  } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
    credentials: "include",
  });

  const [chatGroups, setChatGroups] = useState<GroupedChats>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormattingPanelOpen, setIsFormattingPanelOpen] = useState(false);
  const [isMailMode, setIsMailMode] = useState(false);
  const [formattedContent, setFormattedContent] = useState("");
  const [isBrainModalOpen, setIsBrainModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const orderedLabels = ["Today", "Yesterday", "Last 7 Days", "Older"];

  const groupChatsByDate = (chats: Chat[]): GroupedChats => {
    const groups: GroupedChats = {};
    const now = new Date();

    chats.forEach((chat) => {
      const createdAt = new Date(chat.createdAt);
      let label = "Older";

      if (isToday(createdAt)) {
        label = "Today";
      } else if (isYesterday(createdAt)) {
        label = "Yesterday";
      } else if (
        isWithinInterval(createdAt, {
          start: subDays(now, 7),
          end: now,
        })
      ) {
        label = "Last 7 Days";
      }

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(chat);
    });

    return groups;
  };

  const fetchChatIds = async () => {
    try {
      const res = await fetch("/api/chat-ids", {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        const grouped = groupChatsByDate(data.chats);
        setChatGroups(grouped);
      } else {
        toast.error("Failed to load chats");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching chats");
    }
  };

  useEffect(() => {
    fetchChatIds();
  }, [isLoading]);

  const handlePromptButton = (promptText: string) => {
    setInput(promptText);
    setTimeout(() => {
      formRef.current?.requestSubmit();
    }, 0);
  };

  const handleChatSelect = (chatId: string) => {
    setCookie("chatId", chatId, 7);
    window.location.reload();
  };

  const handleShareClick = (content: string) => {
    setFormattedContent(content);
    setIsFormattingPanelOpen(true);
    setIsSidebarOpen(false);
  };

  const handleMailClick = (content: string) => {
    setFormattedContent(content);
    setIsMailMode(true);
    setIsFormattingPanelOpen(true);
    setIsSidebarOpen(false);
  };

  const handleCloseFormattingPanel = () => {
    setFormattedContent("")
    setIsFormattingPanelOpen(false);
    setIsMailMode(false);
  };

  const toggleBrainModal = () => {
    setIsBrainModalOpen(!isBrainModalOpen);
  };

  return (
    <div className=" bg-[#151221] flex divide-x divide-zinc-700 h-full">
      {!isFormattingPanelOpen && (
        <button
          className="absolute top-4 left-4 text-white md:hidden"
          onClick={() => {
            setIsSidebarOpen(true);
            setIsFormattingPanelOpen(false);
          }}
        >
          <Menu size={24} />
        </button>
      )}

      {!isFormattingPanelOpen && (
        <div
          className={`fixed inset-y-0 left-0 w-[250px] overflow-y-auto scroll-bar bg-[#1E1E2D] p-4 text-white transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:block z-30`}
        >
          <button
            className="absolute top-4 right-4 text-white md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-xl font-semibold hover:cursor-pointer"
              onClick={() => {
                clearCookie("chatId");
                window.location.reload();
              }}
            >
              {process.env.NEXT_PUBLIC_NAME}
            </h3>
            <button
              className="text-white hover:text-gray-300 flex items-center justify-center p-2 rounded-full hover:bg-[#2a2845]"
              aria-label="Open Brain Dashboard"
            >
              <BrainModal />
            </button>
          </div>

          {Object.keys(chatGroups).length > 0 ? (
  orderedLabels.map((label) =>
    chatGroups[label]?.length ? (
      <div key={label} className="mb-4">
        <h4 className="text-sm text-gray-400 mb-1">{label}</h4>
        <ul className="ml-2 space-y-1">
          {chatGroups[label].map((chat) => (
            <li
              key={chat.chatId}
              onClick={() => handleChatSelect(chat.chatId)}
              className="text-sm hover:bg-gray-700 p-2 rounded cursor-pointer text-gray-300"
            >
              {(() => {
                const words = chat.lastMessage.trim().split(/\s+/);
                return words.length > 3
                  ? words.slice(0, 3).join(" ") + "..."
                  : chat.lastMessage;
              })()}
            </li>
          ))}
        </ul>
      </div>
    ) : null
  )
) : (
  <p className="text-gray-400 text-sm">No chats found</p>
)}
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-between">
        <div className="flex-1 text-black bg-[#151221] justify-between flex flex-col lg:max-w-3xl xl:max-w-4xl max-h-full">
          <Messages
            messages={messages}
            isLoading={isLoading}
            onShareClick={handleShareClick}
            onMailClick={handleMailClick}
            handlePromptButton={handlePromptButton}
          />
        </div>
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
          formRef={formRef}
        />
      </div>

      <FormattingPanel
        isOpen={isFormattingPanelOpen}
        onClose={handleCloseFormattingPanel}
        initialContent={formattedContent}
        isMailMode={isMailMode}
      />
    </div>
  );
};

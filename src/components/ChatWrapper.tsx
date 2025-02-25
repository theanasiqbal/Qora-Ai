"use client";
import { useEffect, useState } from "react";
import { Message, useChat } from "ai/react";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";
import { setCookie } from "@/lib/helpers";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
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
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [folders, setFolders] = useState<
    { name: string; type: string; files: { name: string }[] }[]
  >([]);
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedFile, setSelectedFile] = useState<{ folder: string; file: string } | null>(null);

  useEffect(() => {
    const storedData = document.cookie
      .split("; ")
      .find((row) => row.startsWith("selectedItem="));
  
    if (storedData) {
      const selectedItem = JSON.parse(decodeURIComponent(storedData.split("=")[1]));
      setSelectedFile(selectedItem);
      setOpenFolders((prev) => ({
        ...prev,
        [selectedItem.folder]: true, // Open the folder of the selected file
      }));
    }
  }, []);

  // Fetch folder & file data
  useEffect(() => {
    fetch("/api/upload")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFolders(data.data);
        }
      })
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  // Toggle folder open/close
  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  // Handle file click (store in localStorage)
  const handleFileClick = (folderName: string, fileName: string) => {
    const data = { folder: folderName, file: fileName };
    setCookie("selectedItem", data, 1);
    setSelectedFile(data);
    window.location.reload();
  };

  return (
    <div className="relative h-[96vh] bg-[#151221] flex divide-x divide-zinc-700">
      {/* Mobile Sidebar Toggle */}
      <button
        className="absolute top-4 left-4 text-white md:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[250px] bg-[#1E1E2D] p-4 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:block`}
      >
        {/* Close Button (Only on Mobile) */}
        <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4">Qora</h3>
        <ul className="space-y-2">
          {folders.map((folder) => (
            <li key={folder.name} className="text-sm">
              <div
                className="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
                onClick={() => toggleFolder(folder.name)}
              >
                {openFolders[folder.name] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                <span className="ml-2">📂 {folder.name}</span>
              </div>
              {openFolders[folder.name] && (
                <ul className="ml-8 mt-1 space-y-1">
                  {folder.files.map((file) => {
                    const fileName = file.name.replace(/\.pdf$/, "");
                    return (
                      <li
                        key={file.name}
                        onClick={() => handleFileClick(folder.name, file.name)}
                        className={`text-xs hover:bg-gray-700 p-2 rounded cursor-pointer ${
                          selectedFile?.folder === folder.name && selectedFile?.file === file.name
                            ? "bg-gray-600 text-white"
                            : "text-gray-300"
                        }`}
                      >
                        📄 {fileName}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col divide-y divide-zinc-700">
        <div className="flex-1 text-black bg-[#151221] flex flex-col">
          <Messages messages={messages} isLoading={isLoading} />
        </div>
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
        />
      </div>
    </div>
  );
};

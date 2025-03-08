"use client";
import { useEffect, useRef, useState } from "react";
import { Message, useChat } from "ai/react";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Linkedin,
  MessageCircle,
  Facebook,
  FileUp,
  Mail,
  Loader,
  MessageCirclePlus,
  Plus,
} from "lucide-react";
import Messages from "./Messages";
import { ChatInput } from "./ChatInput";
import { clearCookie, getCookie, setCookie } from "@/lib/helpers";
import TiptapEditor from "./TipTapEditor";
import exportContentAsPdf from "@/lib/generatePdf";
import { FolderSkeleton } from "./Skeletons";
import { motion, AnimatePresence } from "framer-motion";
import { SalesforceSvg } from "@/lib/svgs";
import { redis } from "@/lib/redis";

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
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isFormattingPanelOpen, setIsFormattingPanelOpen] = useState(false);
  const [formattedContent, setFormattedContent] = useState("");
  const [isFetchingSalesforce, setIsFetchingSalesforce] = useState(false);
  const [chatIds, setChatIds] = useState();
  const formRef = useRef<HTMLFormElement>(null);
  // Function to apply formatting
  // const applyFormatting = (tag: string) => {
  //   setFormattedContent((prev) => prev + ` <${tag}></${tag}> `);
  // };

  // Handle sharing - Open formatting panel, close sidebar
  const handleShareClick = (content: string) => {
    setFormattedContent(content);
    setIsFormattingPanelOpen(true);
    setIsSidebarOpen(false); // Hide sidebar
  };

  useEffect(() => {
    const storedData = document.cookie
      .split("; ")
      .find((row) => row.startsWith("selectedItem="));

    if (storedData) {
      const selectedItem = JSON.parse(
        decodeURIComponent(storedData.split("=")[1])
      );
      setSelectedFolder(selectedItem.folder);
      setOpenFolders((prev) => ({
        ...prev,
        [selectedItem.folder]: true, // Open the folder of the selected file
      }));
    }
  }, []);

  // Fetch folder & file data
  useEffect(() => {
    fetchFolderData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      fetchChatIds();
    }
  }, [isLoading, folders]);

  const fetchChatIds = async () => {
    try {
      const updatedChatIds = {};

      await Promise.all(
        folders.map(async (folder) => {
          const res = await fetch("/api/chat-ids", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ folderName: folder.name }),
          });
          const data = await res.json();

          if (data.success) {
            updatedChatIds[folder.name] = data.parsedChats.map((chat) => ({
              chatId: chat.chatId.trim(),
              lastMessage: chat.lastMessage,
            }));
          } else {
            updatedChatIds[folder.name] = [];
          }
        })
      );

      setChatIds(updatedChatIds);
    } catch (error) {
      console.error("Failed to fetch chat IDs:", error);
    }
  };

  const fetchFolderData = () => {
    fetch("/api/upload")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Sort folders to put Salesforce first
          const sortedFolders = data.data.sort(
            (a: { name: string }, b: { name: string }) => {
              if (a.name.toLowerCase() === "salesforce") return -1;
              if (b.name.toLowerCase() === "salesforce") return 1;
              return a.name.localeCompare(b.name);
            }
          );
          setFolders(sortedFolders);
        }
      })
      .catch((error) => console.error("Error fetching files:", error));
  };

  const toggleFolder = async (folderName: string) => {
    // Special handling for Salesforce folder
    if (folderName.toLowerCase() === "salesforce") {
      const isFolderOpen = openFolders[folderName];

      // If we're opening the folder and it has no files, fetch Salesforce data
      const salesforceFolder = folders.find(
        (folder) => folder.name.toLowerCase() === "salesforce"
      );

      if (
        !isFolderOpen &&
        salesforceFolder &&
        salesforceFolder.files.length === 0
      ) {
        try {
          setIsFetchingSalesforce(true);
          await fetchSalesforceData();
          setIsFetchingSalesforce(false);
        } catch (error) {
          setIsFetchingSalesforce(false);
          console.error("Error fetching Salesforce data:", error);
        }
      }
    }
    setOpenFolders((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
    // if (!openFolders[folderName]) {

    // }
  };

  const handleFolderClick = (folderName: string) => {
    const data = { folder: folderName };
    setCookie("selectedItem", data, 7);
    setSelectedFolder(data.folder);
  };

  const copyFormattedText = async () => {
    // Create a Blob with HTML content type
    const htmlBlob = new Blob([formattedContent], { type: "text/html" });

    // Create a ClipboardItem with the HTML blob
    const clipboardItem = new ClipboardItem({
      "text/html": htmlBlob,
      "text/plain": new Blob([formattedContent], { type: "text/plain" }),
    });

    // Write to clipboard with format
    await navigator.clipboard.write([clipboardItem]);
  };

  const copyPlainText = () => {
    // Create a temporary DOM element
    const tempElement = document.createElement("div");
    tempElement.innerHTML = formattedContent; // Set the HTML content

    // Extract plain text
    const plainText = tempElement.textContent || tempElement.innerText;

    // Copy to clipboard
    navigator.clipboard.writeText(plainText);
  };

  const handlePromptButton = (promptText: string) => {
    setInput((prevInput) => {
      const updatedInput = promptText;
      // Submit after the state is set
      setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 0);

      return updatedInput;
    });
  };

  const fetchSalesforceData = async () => {
    try {
      const response = await fetch("/api/salesforce/query", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch Salesforce data");
      }

      alert("Salesforce data fetched and PDF created successfully!");
    } catch (error) {
      console.error("Error fetching Salesforce data:", error);
      alert(error.message);
    }
  };

  return (
    <div className="relative bg-[#151221] flex divide-x divide-zinc-700 h-full">
      {/* Mobile Sidebar Toggle Button */}
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

      {/* Left Sidebar (Hidden when Formatting Panel is Open) */}
      {!isFormattingPanelOpen && (
        <div
          className={`fixed inset-y-0 left-0 w-[250px] bg-[#1E1E2D] p-4 text-white transition-transform ${
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

          <h3 className="text-xl font-semibold mb-4">
            {process.env.NEXT_PUBLIC_NAME}
          </h3>
          {folders.length > 0 ? (
            <ul className="space-y-2">
              {folders.map((folder) => (
                <li key={folder.name} className="text-sm">
                  <div
                    className={`flex items-center cursor-pointer ${selectedFolder === folder.name ? "bg-purple-600" : ""} hover:bg-gray-700 p-2 rounded`}
                    onClick={() => {
                      toggleFolder(folder.name);
                      handleFolderClick(folder.name);
                      chatIds[folder.name].length
                        ? ""
                        : (clearCookie("chatId"), window.location.reload());
                    }}
                  >
                    {openFolders[folder.name] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                    <span className="ml-2 flex items-center">
                      {folder.name.toLowerCase() === "salesforce" ? (
                        <SalesforceSvg />
                      ) : (
                        <span>📂</span>
                      )}
                      {folder.name}
                      {folder.name.toLowerCase() === "salesforce" &&
                        isFetchingSalesforce && (
                          <Loader className="ml-2 h-4 w-4 animate-spin text-gray-400" />
                        )}
                    </span>
                  </div>
                  {openFolders[folder.name] && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {chatIds &&
                      chatIds[folder.name] &&
                      chatIds[folder.name]?.length > 0
                        ? chatIds[folder.name].map((chat) => (
                            <li
                              onClick={() => {
                                setCookie("chatId", chat.chatId, 7);
                                handleFolderClick(folder.name);
                                window.location.reload();
                              }}
                              key={chat.chatId}
                              className="text-sm hover:bg-gray-700 p-2 rounded cursor-pointer text-gray-300"
                            >
                              {chat?.lastMessage?.length > 15
                                ? chat?.lastMessage
                                    ?.substring(0, 15)
                                    .replace(/\b\w/g, (c) => c.toUpperCase()) +
                                  "..."
                                : chat?.lastMessage.replace(/\b\w/g, (c) =>
                                    c.toUpperCase()
                                  )}
                            </li>
                          ))
                        : null}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div>
              {[...Array(5).keys()].map((el, index) => (
                <FolderSkeleton key={index} />
              ))}
            </div>
          )}
        </div>
      )}
      {/* Chat Section */}
      <div className="flex-1 flex flex-col items-center justify-between">
        <div className="flex-1 text-black bg-[#151221] justify-between flex flex-col lg:max-w-3xl xl:max-w-4xl max-h-full">
          {messages.length ? (
            <div
              onClick={() => {
                // handleFolderClick(folder.name);
                clearCookie("chatId");
                window.location.reload();
              }}
              className="text-xs bg-purple-600 flex items-center justify-center w-16 hover:bg-purple-700 px-2 py-1.5 rounded cursor-pointer text-gray-300"
            >
              <Plus size={15} />
            </div>
          ) : null}
          <Messages
            messages={messages}
            isLoading={isLoading}
            onShareClick={handleShareClick}
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

      {/* Right Formatting Panel (Visible when Share is clicked) */}

      <AnimatePresence>
        {isFormattingPanelOpen && (
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 150 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 1, 0.5, 1], // Smooth cubic bezier easing
            }}
            className="lg:flex flex-col w-3/4  bg-[#1E1E2D] p-4 text-white border-l border-zinc-700"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                className="text-white"
                onClick={() => setIsFormattingPanelOpen(false)}
              >
                ✕
              </button>

              <button
                className="text-white bg-purple-600 flex items-center py-2 rounded-md relative group overflow-hidden"
                onClick={() => exportContentAsPdf(formattedContent)}
              >
                {/* Always visible Icon */}
                <motion.div
                  initial={{ width: "40px" }}
                  whileHover={{ width: "150px" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex items-center justify-start px-3"
                >
                  <FileUp
                    size={18}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  />

                  {/* Hidden text that appears on hover */}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="opacity-0 group-hover:opacity-100 text-sm whitespace-nowrap ml-2"
                  >
                    Export as PDF
                  </motion.span>
                </motion.div>
              </button>
            </div>

            {/* 🖋 Tiptap Editor - Ensure it has a fixed height */}
            <div className="h-3/4 overflow-y-auto scroll-bar">
              <TiptapEditor
                content={formattedContent}
                setContent={setFormattedContent}
              />
            </div>

            {/* 📢 Share Buttons */}
            <div className="flex space-x-2 mt-4 p-2 border-t border-gray-600">
              <a
                onClick={() => {
                  copyFormattedText();
                  window.open("https://www.linkedin.com/post/new", "_blank");
                }}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-white bg-[#0077B5] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55  mb-2 cursor-pointer"
                title="Share on LinkedIn + Ctrl V"
              >
                <Linkedin size={18} />
              </a>

              <a
                onClick={() => {
                  copyPlainText();
                  window.open(
                    "https://www.facebook.com/sharer/sharer.php",
                    "_blank"
                  );
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55  mb-2 cursor-pointer"
                title="Share on Facebook + Ctrl V"
              >
                <Facebook size={18} />
              </a>

              <a
                href={`https://discord.com/channels/@me`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#7289DA] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55  mb-2 cursor-pointer"
                title="Share on Discord + Ctrl V"
                onClick={copyPlainText}
              >
                <MessageCircle size={18} />
              </a>

              <a
                onClick={() => {
                  copyPlainText();
                  window.location.href = "mailto:?subject=Formatted Content";
                }}
                className="text-white bg-[#D44638] hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-red-700  mb-2 cursor-pointer"
                title="Mail the formatted content"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

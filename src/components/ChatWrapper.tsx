"use client";

import { Message, useChat } from "ai/react";
import { Menu } from "lucide-react";
import Messages from "./Messages";
import { ChatInput } from "./ChatInput";
import { useState } from "react";


export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const { messages, handleInputChange, handleSubmit, input, setInput } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormattingPanelOpen, setIsFormattingPanelOpen] = useState(false);
  const [formattedContent, setFormattedContent] = useState("");

  // Function to apply formatting
  const applyFormatting = (tag: string) => {
    setFormattedContent((prev) => prev + ` <${tag}></${tag}> `);
  };

  // Handle sharing - Open formatting panel, close sidebar
  const handleShareClick = (content: string) => {
    setFormattedContent(content);
    setIsFormattingPanelOpen(true);
    setIsSidebarOpen(false); // Hide sidebar
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
          className={`fixed inset-y-0 left-0 w-[250px] bg-[#1E1E2D] p-4 text-white transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 md:block`}
        >
          {/* Close Button (Only on Mobile) */}
          <button
            className="absolute top-4 right-4 text-white md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>

          <h3 className="text-xl font-semibold">Sidebar</h3>
          <ul>
            <li className="mt-4">Option 1</li>
            <li className="mt-2">Option 2</li>
            <li className="mt-2">Option 3</li>
          </ul>
        </div>
      )}
      {/* Chat Section */}
      <div className="flex-1 flex flex-col items-center justify-between">
        <div className="flex-1 text-black bg-[#151221] justify-between flex flex-col lg:max-w-3xl xl:max-w-4xl max-h-[74vh]">
          <Messages messages={messages} onShareClick={handleShareClick} />
        </div>

        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
        />
      </div>


      {/* Right Formatting Panel (Visible when Share is clicked) */}
      {isFormattingPanelOpen && (
        <div className="hidden lg:flex flex-col w-[300px] bg-[#1E1E2D] p-4 text-white border-l border-zinc-700">
          <h3 className="text-xl font-semibold mb-4">Format Content</h3>

          {/* Formatting Buttons */}
          <div className="flex gap-2 mb-4">
            <button onClick={() => applyFormatting("b")} className="px-3 py-1 bg-gray-700 rounded">Bold</button>
            <button onClick={() => applyFormatting("i")} className="px-3 py-1 bg-gray-700 rounded">Italic</button>
            <button onClick={() => applyFormatting("u")} className="px-3 py-1 bg-gray-700 rounded">Underline</button>
          </div>

          {/* Content Input */}
          <textarea
            className="w-full h-32 bg-[#2A2A3D] p-2 text-white rounded"
            value={formattedContent}
            onChange={(e) => setFormattedContent(e.target.value)}
            placeholder="Type or paste your content here..."
          />

          {/* Share Button */}
          <button className="mt-4 bg-blue-500 text-white py-2 rounded w-full">
            Share
          </button>
        </div>
      )}
    </div>
  );
};

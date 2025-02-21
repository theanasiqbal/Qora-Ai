"use client";

import { Message, useChat } from "ai/react";
import { Menu } from "lucide-react";
import { Messages } from "./Messages";
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

  // console.log('messagesmessages', messages)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative h-[96vh] bg-[#151221] flex divide-x divide-zinc-700">

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="absolute top-4 left-4 text-white md:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[250px] bg-[#1E1E2D] p-4 text-white transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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

      {/* Chat Section */}
      <div className="flex-1 flex flex-col divide-y divide-zinc-700">
        <div className="flex-1 text-black bg-[#151221] justify-between flex flex-col">
          <Messages messages={messages} />
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

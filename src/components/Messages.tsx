import { type Message as TMessage } from "ai/react";
import { Message } from "./Message";
import { MessageSquare } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface MessagesProps {
  messages: TMessage[];
  isLoading: boolean;
}

export const Messages = ({ messages, isLoading }: MessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Smooth scrolling function
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isLoading]); // Re-scroll when new messages or loader appears

  return (
    <div className="flex flex-1 flex-col overflow-y-auto max-h-[calc(100vh-3.5rem-7rem)] px-4">
      {messages.length ? (
        messages.map((message, i) => (
          <Message key={i} content={message.content} isUserMessage={message.role === "user"} />
        ))
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <MessageSquare className="size-8 text-blue-500" />
          <h3 className="font-semibold text-xl text-white">You&apos;re all set!</h3>
          <p className="text-zinc-500 text-sm">Ask your first question to get started.</p>
        </div>
      )}

      {/* Loader as a new message box */}
      {isLoading && (
        <div className="flex items-center mb-2 self-start bg-gray-700 text-white px-4 py-2 rounded-lg max-w-xs mt-2">
          <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span>Thinking...</span>
        </div>
      )}

      {/* Invisible div for scrolling to the latest message */}
      <div ref={messagesEndRef} className="h-1" />
    </div>
  );
};

import { useChat, type Message as TMessage } from "ai/react";
import { Message } from "./Message";
import { BarChart, Lightbulb, Mail, MessageSquare, Share2 } from "lucide-react";
import React, { useEffect, useRef } from "react";

type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface MessagesProps {
  messages: TMessage[];
  isLoading: boolean;
  onShareClick: any;
  handlePromptButton: any
}
// wrap inside React.Memo
export const Messages = React.memo(
  ({
    messages,
    isLoading,
    onShareClick,
    handlePromptButton
  }: MessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);



    // Smooth scrolling function
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, [messages, isLoading]); // Re-scroll when new messages or loader appears

    return (
      <div className="flex flex-1 flex-col overflow-y-auto scroll-bar max-h-[calc(100vh-3.5rem-7rem)] px-4">
        {messages.length ? (
          messages.map((message, i) => (
            <Message
              key={i}
              content={message.content}
              isUserMessage={message.role === "user"}
              onShareClick={onShareClick}
            />
          ))
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <MessageSquare className="size-8 text-blue-500" />
            <h3 className="font-semibold text-xl text-white">
              You&apos;re all set!
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl px-4">
              <button
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-violet-800/20 text-violet-200 rounded-lg border border-violet-700/50 transition-colors text-sm text-left"
                onClick={() => {
                  handlePromptButton(
                    "Write a persuasive cold email using Sales document."
                  );
                }}
              >
                <Mail size={30} className="mr-2 text-violet-400" />
                <span>Write a persuasive cold email using Sales document.</span>
              </button>

              <button
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-violet-800/50 text-violet-200 rounded-lg border border-violet-700/50 transition-colors text-sm text-left"
                onClick={() => {
                  handlePromptButton(
                    "Create an engaging social media post for our products."
                  );
                }}
              >
                <Share2 size={30} className="mr-2 text-violet-400" />
                <span>
                  Create an engaging social media post for our products.
                </span>
              </button>

              <button
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-violet-800/50 text-violet-200 rounded-lg border border-violet-700/50 transition-colors text-sm text-left"
                onClick={() => {
                  handlePromptButton(
                    "Compare this product/service with competitors."
                  );
                }}
              >
                <BarChart size={30} className="mr-2 text-violet-400" />
                <span>Compare this product/service with competitors.</span>
              </button>

              <button
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-violet-800/50 text-violet-200 rounded-lg border border-violet-700/50 transition-colors text-sm text-left"
                onClick={() => {
                  handlePromptButton("Explain features of Karya.io.");
                }}
              >
                <Lightbulb size={22} className="mr-2 text-violet-400" />
                <span>Explain features of Karya.io.</span>
              </button>
            </div>

            <p className="text-zinc-500 text-sm">
              Ask your first question to get started.
            </p>
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
  }
);

// Give Messages a display name for better debugging
Messages.displayName = "Messages";

export default Messages;

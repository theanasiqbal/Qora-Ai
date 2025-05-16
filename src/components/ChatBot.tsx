"use client";
import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import { ChatInput } from "./ChatInput";
import { Message, useChat } from "ai/react";
import LeadModal from "./modals/LeadModal";
import FormatterModal from "./modals/FormatterModal";

const ChatBot = ({
  sessionId,
  initialMessages,
  feedId = null,
  userId,
}: {
  sessionId: string;
  initialMessages?: Message[];
  feedId?: string | null;
  userId?: string;
}) => {
  const {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    setInput,
    isLoading,
  } = useChat({
    api: "/api/customer",
    body: { sessionId },
    initialMessages,
  });

  const [feed, setFeed] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [hasSubmittedPrompt, setHasSubmittedPrompt] = useState(false);
  const [isFormattingPanelOpen, setIsFormattingPanelOpen] = useState(false);
  const [content, setContent] = useState('')

  const fetchFeed = async () => {
    try {
      const res = await fetch(`/api/feed/${feedId}`);
      if (!res.ok) throw new Error("Failed to fetch feed data");
      const feedData = await res.json();
      setFeed(feedData);
    } catch (error) {
      console.error("Error fetching feed data:", error);
    }
  };

  const onChatBotShare = (content: any) => {
    setContent(content)
    setIsFormattingPanelOpen(true)
  };

  useEffect(() => {
    if (feedId !== null) {
      fetchFeed();
    }
  }, [feedId]);

  return (
    <div className="flex flex-col h-full w-full bg-[#1a1725] rounded-lg shadow-md">
      {/* Make Messages take full space dynamically */}
      <div
        className={`flex flex-col transition-all overflow-y-auto scroll-bar p-4 duration-300 ${
          hasSubmittedPrompt ? "flex-1" : "h-[85%]"
        }`}
      >
        <Messages
          onChatBotShare={onChatBotShare}
          messages={messages}
          isLoading={isLoading}
          salesMagnet={true}
        />
      </div>

      {/* Hide ChatInput when hasSubmittedPrompt is true */}
      {!hasSubmittedPrompt && (
        <div className="p-2 bg-[#151221] rounded-lg">
          <ChatInput
            hasSubmittedPrompt={hasSubmittedPrompt}
            setHasSubmittedPrompt={setHasSubmittedPrompt}
            isDetailsSubmitted={isDetailsSubmitted}
            setShowPopup={setShowPopup}
            prompt={feed?.prompt}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setInput={setInput}
            salesMagnet={true}
          />
        </div>
      )}

      {showPopup && (
        <LeadModal
          feedId={feedId}
          userId={userId}
          handleSubmit={handleSubmit}
          setHasSubmittedPrompt={setHasSubmittedPrompt}
          setShowPopup={setShowPopup}
          setIsDetailsSubmitted={setIsDetailsSubmitted}
        />
      )}

      <FormatterModal
        isOpen={isFormattingPanelOpen}
        onClose={() => setIsFormattingPanelOpen(false)}
        initialContent={content}
      />
    </div>
  );
};

export default ChatBot;

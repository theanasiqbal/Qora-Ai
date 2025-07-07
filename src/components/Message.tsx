import { cn } from "@/lib/utils";
import { Bot, User, Copy, CopyCheck, Share2, Mail } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { marked } from "marked";
import { useState } from "react";
import "./Message.css";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
  onShareClick: any;
  onMailClick: any;
  salesMagnet?: boolean;
  onChatBotShare?: any;
}

export const Message = ({
  content,
  isUserMessage,
  onShareClick,
  onMailClick,
  salesMagnet,
  onChatBotShare,
}: MessageProps) => {
  const [copied, setCopied] = useState(false);
  // const [feedback, setFeedback] = useState<string | null>(null);

  marked.setOptions({
    breaks: true, // Ensures line breaks are respected
    gfm: true,
  });

  function extractReasoningAndResponse(content: string) {
    const match = content.match(/<think>([\s\S]*?)<\/think>([\s\S]*)/);
    if (!match)
      return { reasoning: null, response: marked.parse(content).trim() };

    return {
      reasoning: match[1].trim(),
      response: marked.parse(match[2].trim()).trim(),
    };
  }

  const { reasoning, response } = extractReasoningAndResponse(content);

  const formattedContent = response
    ? `<div>${response}</div>` // Wrap content to preserve spacing
    : null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div
      className={cn("w-full flex", {
        "justify-end": isUserMessage,
        "justify-start": !isUserMessage,
      })}
    >
      {/* USER MESSAGE */}
      {isUserMessage ? (
        <div className="max-w-[75%] bg-gray-800 text-white rounded-lg p-4 shadow-md">
          {/* <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gray-700">
              <User className="size-5 text-white" />
            </div>
            <span className="text-sm font-semibold">You</span>
          </div> */}
          <div
            className="text-sm mt-2 leading-loose"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>
      ) : (
        // AI RESPONSE
        <div className="w-full px-4 py-2 text-white bg-transparent">
          <div className="flex items-center gap-2 mb-3 sm:ml-2">
            <Bot className="size-6 text-white" />

            <span className="text-sm font-semibold">Oliver</span>
          </div>

          {reasoning && (
            <Accordion
              type="single"
              collapsible
              className="ml-8 mb-4 rounded-lg"
            >
              <AccordionItem value="reasoning">
                <AccordionTrigger className="px-4 py-2 text-left font-medium bg-gray-800 hover:bg-gray-700 rounded-t-lg">
                  🧠 Reasoning
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2 bg-gray-900 text-sm whitespace-pre-line border-t">
                  {reasoning}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {/* Formatted Markdown Output */}
          <div
            className="text-base leading-relaxed ml-8"
            dangerouslySetInnerHTML={{ __html: response }}
          />

          {/* Message Actions */}

          <div className="message-actions flex items-center mt-3 space-x-3 mt-5 mb-5 ml-8">
            {/* Copy Button */}
            {!copied ? (
              <button
                title="Copy"
                onClick={copyToClipboard}
                className="text-gray-400 hover:text-white flex items-center gap-1 text-sm"
              >
                <Copy className="size-4" />
              </button>
            ) : (
              <button
                onClick={() => setCopied(false)}
                className="text-gray-400 hover:text-white flex items-center gap-1 text-sm"
                title="Copied"
              >
                <CopyCheck className="size-4" />
              </button>
            )}

            {/* Feedback - ChatGPT style SVG Icons */}
            {/* <button
              onClick={() => setFeedback("up")}
              className={`text-gray-400 hover:text-white ${feedback === "up" ? "text-green-500" : ""}`}
              title="Like"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L7 14H17L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setFeedback("down")}
              className={`text-gray-400 hover:text-white ${feedback === "down" ? "text-red-500" : ""}`}
              title="Dislike"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L17 10H7L12 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button> */}
            {/* Share Button */}
            <Share2
              className="text-gray-400 size-4 cursor-pointer hover:text-white"
              onClick={() => {
                if (salesMagnet) {
                  onChatBotShare(response);
                } else {
                  onShareClick(response);
                }
              }}
            />
            {!salesMagnet && (
              <Mail
                className="text-gray-400 size-4 cursor-pointer hover:text-white"
                onClick={() => onMailClick(response)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import { cn } from "@/lib/utils";
import { Bot, User, Copy } from "lucide-react";
import { marked } from "marked";
import { useState } from "react";
import "./Message.css";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  marked.setOptions({
    breaks: true,
  });

  // Format Markdown & Improve Headings
  const formattedContent = content
    ? marked(
      content
        .replace(/^# (.*$)/gm, "<h1 class='text-2xl font-bold'>$1</h1>")
        .replace(/^## (.*$)/gm, "<h2 class='text-xl font-bold mt-4'>$1</h2>")
        .replace(/^### (.*$)/gm, "<h3 class='text-lg font-semibold mt-3'>$1</h3>")
        .replace(/^- (.*$)/gm, "<li class='ml-6 list-disc'>$1</li>")
    )
    : null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("w-full flex", { "justify-end": isUserMessage, "justify-start": !isUserMessage })}>
      {/* USER MESSAGE */}
      {isUserMessage ? (
        <div className="max-w-[75%] bg-gray-800 text-white rounded-lg p-4 shadow-md">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gray-700">
              <User className="size-5 text-white" />
            </div>
            <span className="text-sm font-semibold">You</span>
          </div>
          <div className="text-sm mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedContent }} />
        </div>
      ) : (
        // AI RESPONSE
        <div className="w-full px-4 py-2 text-white bg-transparent">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-full bg-gray-700">
              <Bot className="size-5 text-white" />
            </div>
            <span className="text-sm font-semibold">Qora</span>
          </div>

          {/* Formatted Markdown Output */}
          <div className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedContent }} />

          {/* Message Actions */}
          <div className="flex items-center mt-3 space-x-3">
            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white flex items-center gap-1 text-sm"
            >
              <Copy className="size-4" />
              {/* {copied ? "Copied" : "Copy"} */}
            </button>

            {/* Feedback - ChatGPT style SVG Icons */}
            <button
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
            </button>
            {/* Social Icons */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(content)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              title="Share on LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="2" />
                <path d="M8 10V16" stroke="currentColor" strokeWidth="2" />
                <path d="M8 8C8.55228 8 9 7.55228 9 7C9 6.44772 8.55228 6 8 6C7.44772 6 7 6.44772 7 7C7 7.55228 7.44772 8 8 8Z" fill="currentColor" />
                <path d="M12 10V16M12 10H16V16" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(content)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              title="Share on Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 8H11V6C11 4.9 11.9 4 13 4H15V8H13V10H15L14 14H13V22H9V14H7V10H9V8Z" fill="currentColor" />
              </svg>
            </a>

            <a
              href={`https://discord.com/channels/@me`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              title="Share on Discord"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19ZM16 7H8C6.34315 7 5 8.34315 5 10V14C5 15.6569 6.34315 17 8 17H16C17.6569 17 19 15.6569 19 14V10C19 8.34315 17.6569 7 16 7ZM10 13C10.8284 13 11.5 12.3284 11.5 11.5C11.5 10.6716 10.8284 10 10 10C9.17157 10 8.5 10.6716 8.5 11.5C8.5 12.3284 9.17157 13 10 13ZM14 13C14.8284 13 15.5 12.3284 15.5 11.5C15.5 10.6716 14.8284 10 14 10C13.1716 10 12.5 10.6716 12.5 11.5C12.5 12.3284 13.1716 13 14 13Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

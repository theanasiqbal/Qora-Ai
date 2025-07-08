"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Bot, User, Copy, CopyCheck, Share2, Mail } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { marked } from "marked";
import "./Message.css";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
  onShareClick: (content: string) => void;
  onMailClick: (content: string) => void;
  salesMagnet?: boolean;
  onChatBotShare?: (content: string) => void;
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
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    const parseContent = async () => {
      const match = content.match(/<think>([\s\S]*?)<\/think>([\s\S]*)/);

      if (!match) {
        const parsed = await marked.parse(content);
        setReasoning(null);
        setResponse(parsed.trim());
      } else {
        const parsedResponse = await marked.parse(match[2].trim());
        setReasoning(match[1].trim());
        setResponse(parsedResponse.trim());
      }
    };

    parseContent();
  }, [content]);

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
      {isUserMessage ? (
        <div className="max-w-[75%] bg-gray-800 text-white rounded-lg p-4 shadow-md">
          <div
            className="text-sm mt-2 leading-loose"
            dangerouslySetInnerHTML={{ __html: `<div>${response}</div>` }}
          />
        </div>
      ) : (
        <div className="w-full px-4 py-2 text-white bg-transparent">
          <div className="flex items-center gap-2 mb-3 sm:ml-2">
            <Bot className="size-6 text-white" />
            <span className="text-sm font-semibold">Oliver</span>
          </div>

          {reasoning && (
            <Accordion type="single" collapsible className="ml-8 mb-4 rounded-lg">
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

          <div
            className="text-base leading-relaxed ml-8"
            dangerouslySetInnerHTML={{ __html: response }}
          />

          <div className="message-actions flex items-center space-x-3 mt-5 mb-5 ml-8">
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

            <Share2
              className="text-gray-400 size-4 cursor-pointer hover:text-white"
              onClick={() => {
                salesMagnet ? onChatBotShare?.(response) : onShareClick(response);
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

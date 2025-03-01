"use client";

import { Button, Textarea } from "@nextui-org/react";
import { Send } from "lucide-react";
import { type useChat } from "ai/react";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
}

export const ChatInput = ({ handleInputChange, handleSubmit, input, setInput }: ChatInputProps) => {
  return (
    <div className="z-10 bg-[#151221] bottom-0 left-0 w-full border p-4">
      <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
        <Textarea
          minRows={4}
          autoFocus
          onChange={handleInputChange}
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
              setInput("");
            }
          }}
          placeholder="Message Oliver..."
          className="resize-none bg-zinc-800 hover:bg-zinc-900 rounded-xl text-base w-full"
        />
        <Button
          size="sm"
          type="submit"
          className="absolute z-10 border border-border bg-[#151221] right-2 bottom-2"
        >
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
};
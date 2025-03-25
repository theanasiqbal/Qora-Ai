import { customerRagChat } from "@/lib/customer-rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextResponse } from "next/server";

export const POST = async(req) => {
    let { messages, sessionId } = await req.json();
  const lastMessage = messages[messages.length - 1].content;


      // Get AI response (streaming)
  const response = await customerRagChat.chat(lastMessage, {
    streaming: true,
    sessionId,
  });

  const stream = aiUseChatAdapter(response);

  const res = new NextResponse(stream.body, {
    status: 200,
    headers: stream.headers,
  });

  return res
}
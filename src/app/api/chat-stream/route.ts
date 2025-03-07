import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  let { messages, sessionId } = await req.json();

  const chatId = crypto.randomUUID()
  const parts = sessionId.split("-"); 
  const folderName = parts[1];
  const extractedId = parts.slice(2).join("-"); 
  sessionId = sessionId.split("-")[2] === "Unknown" ? sessionId.replace("Unknown", chatId) : sessionId 
  const lastMessage = messages[messages.length - 1].content;
  const chatList = await redis.zrange(`${folderName}:chats`, 0, -1); 

  // Parse the stored data to check if chatId exists
  const chatExists = chatList.some((chat: any) => {
    return chat.chatId === extractedId;
  });
  
  if (!chatExists) {
    const timestamp = Date.now();
    const chatData = JSON.stringify({ chatId, lastMessage });
  
    await redis.zadd(`${folderName}:chats`, {
      score: timestamp,
      member: chatData, 
    });
  
    console.log("Chat added to Redis.");
  } else {
    console.log("Chat already exists in Redis.");
  }
  


  // Get AI response (streaming)
  const response = await ragChat.chat(lastMessage, {
    streaming: true,
    sessionId,
  });

  // Convert the streaming response into a NextResponse
  const stream = aiUseChatAdapter(response);

  // ✅ Wrap it inside a NextResponse to set cookies
  const res = new NextResponse(stream.body, {
    status: 200,
    headers: stream.headers, // Preserve streaming headers
  });

  res.cookies.set("chatId", chatId, { path: "/", maxAge: 86400 });

  return res;
};

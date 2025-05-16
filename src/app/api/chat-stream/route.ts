import { redis } from "@/lib/redis";
import { searchSimilarDocs } from "@/lib/vector-context";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { ragChat } from "@/lib/rag-chat";

// export const POST = async (req: NextRequest) => {
//   const { userId } = await auth();
//   if (!userId) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   const { messages, sessionId } = await req.json();
//   const chatId = sessionId.split("-")[1];
//   const finalChatId =
//     !chatId || chatId === "Unknown" ? crypto.randomUUID() : chatId;

//   const companyName = sessionId.split("-")[0];

//   // Replace Unknown in sessionId with new chatId if needed
//   const finalSessionId = sessionId.includes("Unknown")
//     ? sessionId.replace("Unknown", finalChatId)
//     : sessionId;

//   const lastMessage = messages[messages.length - 1]?.content || "";

//   const redisKey = `${userId}:chats`;
//   const existingChats = await redis.zrange(redisKey, 0, -1);
//   const chatExists = existingChats.some((chat: any) => {
//     try {
//       const parsed = JSON.parse(chat);
//       return parsed.chatId === chatId && parsed.companyName === companyName;
//     } catch {
//       return false;
//     }
//   });

//   if (!chatExists) {
//     const chatData = {
//       chatId: finalChatId,
//       companyName,
//       lastMessage,
//       createdAt: Date.now(),
//     };

//     await redis.zadd(redisKey, {
//       score: chatData.createdAt,
//       member: JSON.stringify(chatData),
//     });

//     console.log("New chat added to Redis.");
//   } else {
//     console.log("Chat already exists in Redis.");
//   }

//   // Get AI response (streaming)
//   const response = await ragChat.chat(lastMessage, {
//     streaming: true,
//     sessionId: finalSessionId,
//   });

//   const stream = aiUseChatAdapter(response);

//   const res = new NextResponse(stream.body, {
//     status: 200,
//     headers: stream.headers,
//   });

//   res.cookies.set("chatId", chatId, { path: "/", maxAge: 86400 });

//   return res;
// };

const together = createOpenAI({
  apiKey: process.env.TOGETHER_API_KEY ?? "",
  baseURL: "https://api.together.xyz/v1",
});

export const POST = async (req: NextRequest) => {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { messages, sessionId } = await req.json();

  const chatId = sessionId.substring(sessionId.indexOf("-") + 1);

  const finalChatId =
    !chatId || chatId === "Unknown" ? crypto.randomUUID() : chatId;

  const companyName = sessionId.split("-")[0];

  // Replace Unknown in sessionId with new chatId if needed
  const finalSessionId = sessionId.includes("Unknown")
    ? sessionId.replace("Unknown", finalChatId)
    : sessionId;

  console.log("finalSessionId", finalSessionId);

  const lastMessage = messages[messages.length - 1]?.content || "";

  await ragChat.history.addMessage({
    sessionId: finalSessionId,
    message: {
      role: "user",
      content: lastMessage,
      id: Date.now().toString(),
    },
  });

  const redisKey = `${userId}:chats`;
  const existingChats = await redis.zrange(redisKey, 0, -1);
  const chatExists = existingChats.some((chat: any) => {
    try {
      return chat.chatId === finalChatId && chat.companyName === companyName;
    } catch {
      return false;
    }
  });

  if (!chatExists) {
    const chatData = {
      chatId: finalChatId,
      companyName,
      lastMessage,
      createdAt: Date.now(),
    };

    await redis.zadd(redisKey, {
      score: chatData.createdAt,
      member: JSON.stringify(chatData),
    });

    console.log("New chat added to Redis.");
  } else {
    console.log("Chat already exists in Redis.");
  }

  const context = await searchSimilarDocs(lastMessage, 5);

  const serverMessages = messages
    .filter((msg) => msg.role !== "error")
    .map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

  const system = `
      You are Oliver, an AI Sales & Marketing Expert.
      Core Rule: Answer SOLELY using the provided context from the user's selected document. Never invent features, steps, or capabilities.

      Context from Document: ${context}
      User Request: ${lastMessage}

      Response Workflow:
      1. **Check for Context**:
         - If no context: "I don't have enough information from the selected document to answer that."
         - If context exists: Proceed below.
      2. **Determine Request Type**:
         - **Email Request**: Generate a persuasive cold outreach email using ONLY product/service details, target audience, and value propositions from the context.
         - **Social Media Request**: Design an engaging post for the specified platform using key messaging and brand voice from the context.
         - **Competitor Analysis**: Compare ONLY competitors/strategies named in the context, highlighting documented strengths/weaknesses.
         - **General/Document Questions**: Provide a step-by-step explanation ONLY if the context describes feature functionality, setup, or configuration. If not: "This isn't covered in the selected document."
      3. **Universal Rules**:
         - Never assume undocumented features or provide generic instructions (e.g., "log in").
         - Structure responses with headers (e.g., **Cold Email**, **Step 1**).
         - Keep answers under 150 words unless technical depth is required.
    `;

  const result = await streamText({
    model: together("deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free"),
    system,
    messages: serverMessages,
    async onFinish({ text }) {
      await ragChat.history.addMessage({
        sessionId: finalSessionId,
        message: {
          role: "assistant",
          content: text,
          id: Date.now().toString(),
        },
      });
    },
  });

  const stream = result.toAIStreamResponse(); // Use Vercel AI SDK stream

  const res = new NextResponse(stream.body, {
    status: 200,
    headers: stream.headers,
  });

  res.cookies.set("chatId", finalChatId, {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return res;

  // const response = await generateResponse(lastMessage,context)

  // return NextResponse.json({ response });
};

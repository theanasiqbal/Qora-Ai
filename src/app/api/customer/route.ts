import { customerRagChat } from "@/lib/customer-rag-chat";
import { searchSimilarDocs } from "@/lib/vector-context";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";

const together = createOpenAI({
  apiKey: process.env.TOGETHER_API_KEY ?? "",
  baseURL: "https://api.together.xyz/v1",
});

export const POST = async (req) => {
  let { messages, sessionId } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

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
  });

  const stream = result.toAIStreamResponse(); // Use Vercel AI SDK stream

  const res = new NextResponse(stream.body, {
    status: 200,
    headers: stream.headers,
  });

  return res;
};

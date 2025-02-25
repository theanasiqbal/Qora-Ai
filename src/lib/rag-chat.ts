import { PromptParameters, RAGChat, upstash, openai } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  model: upstash("mistralai/Mistral-7B-Instruct-v0.2", {
    maxTokens: 512, // Reduce max tokens
    temperature: 0.7,
    topP: 0.9,
  }),
  redis: redis,
  promptFn: ({ question, context }: PromptParameters) => {
    // Limit context size to reduce tokens
    const trimmedContext = typeof context === "string"
      ? context.split(" ").slice(0, 100).join(" ") // Fewer words = fewer tokens
      : "";

    // Limit user question length (avoid unnecessary tokens)
    const trimmedQuestion = question.split(" ").slice(0, 50).join(" "); // Limit input size

    // Dynamic context inclusion
    const contextSection = trimmedContext ? `Context: ${trimmedContext}\n` : "";

    return `
      You are Oliver, an AI Sales & Marketing Expert.
      ${contextSection}
      User Request: ${trimmedQuestion}
  
      Respond based on the request type:
      - **Email**: Generate a persuasive **cold outreach email**.
      - **Social Media**: Create an engaging **post** for LinkedIn, Facebook, Twitter(X), or Discord.
      - **Competitor Analysis**: Analyze **competitors, their strengths/weaknesses, and positioning**.

      If the request is **not related** to the above categories, assume it's a **document-related question** about the product.
      In this case:
      - Provide a **clear, step-by-step product guide**.
      - Ensure the instructions are **concise, easy to follow, and user-friendly**.
      Keep responses brief, structured, and sales-focused.
    `;
  }

  // debug: true
});

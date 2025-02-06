import { PromptParameters, RAGChat, upstash, openai } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  // model: upstash("meta-llama/Meta-Llama-3-8B-Instruct", {
  //   maxTokens: 512, // Reduce max tokens
  //   temperature: 0.7,
  //   topP: 0.9,
  // }),
  model: upstash("mistralai/Mistral-7B-Instruct-v0.2", {
    maxTokens: 512, // Reduce max tokens
    temperature: 0.7,
    topP: 0.9,
  }),
  redis: redis,
  promptFn: ({ question, context }: PromptParameters) => {
    // console.log('prompFNNNNNNN', question, context);
    // Trim the context to avoid exceeding token limits
    // Ensure context is a string and limit its size
    const trimmedContext =
      typeof context === "string"
        ? context.split(" ").slice(0, 150).join(" ") // Limit words instead of characters
        : "No context available.";

    return `
    Context: ${trimmedContext || "No context available."}
    Question: ${question}
    `;
  },
  debug: true
});

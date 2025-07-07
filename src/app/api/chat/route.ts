import { chatWithContext } from "@/lib/qora-rag/chat";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  return await chatWithContext(prompt);
}

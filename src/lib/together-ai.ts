import Together from "together-ai";

const together = new Together();

export async function generateResponse(query: string, context: any) {
  const contextText = context
    .map((chunk, i) => {
      const { data, metadata } = chunk;
      return `Chunk ${i + 1} (Source: ${metadata.source}, Page: ${metadata.pageNumber}):\n${data}`;
    })
    .join("\n\n");

  const systemPrompt = `
You are a helpful AI assistant. Use the following context extracted from a PDF to answer the user’s question.
Only use the provided context. If the context does not contain the answer, say you don't know.

Context: ${contextText}
`;

  try {
    const response = await together.chat.completions.create({
      model: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
      messages: [
        {
          role: "user",
          content: `${systemPrompt}\n\nQuestion: ${query}`,
        },
      ],
    });

    const choice = response.choices[0]?.message;
    if (choice) {
      return choice.content;
    } else {
      return "No message in the response choice.";
    }
  } catch (error) {
    console.error("Error generating response:", error);
    return "An error occurred while generating the response.";
  }
}

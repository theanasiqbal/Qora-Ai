import { Index } from "@upstash/vector"

const vectorIndex = new Index()

export const searchSimilarDocs = async (data: string, topK: number) => {
    const results = await vectorIndex.query({
      data,
      topK: topK ? topK : 5,
      includeMetadata: true,
      includeData: true,
    });
    const context = results.map(doc => doc.data).join("\n")
    return context
  }
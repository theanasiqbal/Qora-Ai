import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

import path from 'path'

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) => decodeURIComponent(component));

  return decodedComponents.join("/");
}

const Page = async ({ params }: PageProps) => {
  const sessionCookie = cookies().get("sessionId")?.value;
  // const reconstructedUrl = reconstructUrl({ url: params.url as string[] });

  // Get the local file path to the PDF
  const pdfPath = path.join(process.cwd(), 'public', 'data', 'EMS.pdf');

  const sessionId = (pdfPath + "--" + sessionCookie).replace(/\//g, "");

  const isAlreadyIndexed = await redis.sismember("indexed-documents", pdfPath);

  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId });

  if (!isAlreadyIndexed) {
    //vector database - embeddings will be added
    await ragChat.context.add({
      type: "pdf",
      fileSource: pdfPath,
    });

    // await ragChat.context.add({
    //   type: "html",
    //   source: reconstructedUrl,
    //   config: { chunkOverlap: 50, chunkSize: 200 },
    // });

    await redis.sadd("indexed-documents", pdfPath);
  }

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;

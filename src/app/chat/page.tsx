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
  const company = cookies().get("company")?.value;
  const selectedItem = cookies().get("selectedItem")?.value;
  
   // Parse the JSON if it exists
   let companyName = "Unknown";
  let folderName = "Unknown";
  let fileName = "Unknown";

  try {
    if (company) {
      const companyData = JSON.parse(company);
      companyName = companyData.name || "Unknown";
    }

    if (selectedItem) {
      const selectedItemData = JSON.parse(selectedItem);
      folderName = selectedItemData.folder || "Unknown";
      fileName = selectedItemData.file || "Unknown";
    }
  } catch (error) {
    console.error("Error parsing cookies:", error);
  }

  // const reconstructedUrl = reconstructUrl({ url: params.url as string[] });

  // Get the local file path to the PDF
  const pdfPath = path.join(process.cwd(), "public", "data", companyName, folderName, fileName);

  const sessionId = `${companyName}-${folderName}-${fileName}-${sessionCookie}`.replace(/\//g, "")

  const isAlreadyIndexed = await redis.sismember(companyName, pdfPath);

  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId });

  if (!isAlreadyIndexed) {

  //   // await ragChat.context.add({
  //   //   type: "text",
  //   //   data: `You are a concise Sales AI assistant named Cooper.
  //   //   Answer the user's question **directly**. **Do not** include phrases like "Based on the context" or "According to the given information"
  //   //   `,
  //   // });

    await ragChat.context.add({
      type: "pdf",
      fileSource: pdfPath,
    });

  //   // await ragChat.context.add({
  //   //   type: "html",
  //   //   source: reconstructedUrl,
  //   //   config: { chunkOverlap: 50, chunkSize: 200 },
  //   // });

    await redis.sadd(companyName, pdfPath);
  }

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;

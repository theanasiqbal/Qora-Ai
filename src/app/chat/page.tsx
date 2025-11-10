import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { currentUser } from "@clerk/nextjs/server";
import { downloadBlobToBuffer, listPDFFiles } from "@/lib/azure";

interface PageProps {
  params: { url: string | string[] | undefined };
}

const Page = async ({ params }: PageProps) => {
  const user = await currentUser();

  let companyName = user?.id;

  // if (user?.firstName && user?.lastName) {
  //   companyName = `${user.firstName} ${user.lastName}`;
  // } else if (user?.firstName) {
  //   companyName = user.firstName;
  // } else if (user?.lastName) {
  //   companyName = user.lastName;
  // } else {
  //   companyName = "Unknown User";
  // }

  async function processAllFiles() {
  const prefix = `${companyName}`;

  try {
    const files = await listPDFFiles(prefix);
    for (const { name, url } of files) {
      const redisKey = companyName || "Unknown";
      const isAlreadyIndexed = await redis.sismember(redisKey, name);
      if (isAlreadyIndexed) {
        console.log(`⏩ Skipping already indexed file: ${name}`);
        continue;
      }

      // Download blob to buffer
      const fileBuffer = await downloadBlobToBuffer(name);

      // Write buffer to temporary file
      const tempFilePath = path.join(os.tmpdir(), path.basename(name)); 
      await fs.writeFile(tempFilePath, fileBuffer);

      // Add context from file path
      await ragChat.context.add({
        type: "pdf",
        fileSource: tempFilePath, 
      });

      await redis.sadd(redisKey, name);
      console.log(`✅ Indexed (pdf): ${name}`);

      // Optionally clean up temp file
      await fs.unlink(tempFilePath);
    }
  } catch (err) {
    console.error("❌ Error processing Azure files:", err);
  }
}

  await processAllFiles();

  let chatId = cookies().get("chatId")?.value || "Unknown";
  const sessionId = `${companyName}-${chatId}`.replace(/\//g, "");
  const initialMessages = []

  return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
  );
};

export default Page;

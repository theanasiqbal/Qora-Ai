import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs/promises";
import { currentUser } from "@clerk/nextjs/server";

interface PageProps {
  params: { url: string | string[] | undefined };
}

const Page = async ({ params }: PageProps) => {
  const user = await currentUser();

  let companyName = "";

  if (user?.firstName && user?.lastName) {
    companyName = `${user.firstName} ${user.lastName}`;
  } else if (user?.firstName) {
    companyName = user.firstName;
  } else if (user?.lastName) {
    companyName = user.lastName;
  } else {
    companyName = "Unknown User";
  }
  const companyDirPath = path.join(
    process.cwd(),
    "public",
    "data",
    companyName || "Unknown",
    "documents"
  );

  async function processAllFiles() {
    const exists = await fs
      .stat(companyDirPath)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      console.warn("⚠️ 'documents' folder does not exist:", companyDirPath);
      return;
    }

    try {
      const files = await fs.readdir(companyDirPath);

      for (const file of files) {
        const filePath = path.join(companyDirPath, file);
        const fileStat = await fs.stat(filePath);

        // Process only if it's a file (not a folder)
        if (fileStat.isFile() && file.toLowerCase().endsWith(".pdf")) {
          // Check if the file has already been indexed
          const isAlreadyIndexed = await redis.sismember(
            companyName || "Unknown",
            filePath
          );
          if (isAlreadyIndexed) {
            console.log(`⏩ Skipping already indexed file: ${filePath}`);
            continue;
          }

          // Add context for the PDF file
          await ragChat.context.add({
            type: "pdf",
            fileSource: filePath,
          });

          await redis.sadd(companyName || "Unknown", filePath);
          console.log(`✅ Indexed (pdf): ${filePath}`);
        }
      }
    } catch (error) {
      console.error("❌ Error processing files:", error);
    }
  }

  await processAllFiles();

  let chatId = cookies().get("chatId")?.value || "Unknown";
  const sessionId = `${companyName}-${chatId}`.replace(/\//g, "");
  console.log("sessionId", sessionId)
  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
  );
};

export default Page;

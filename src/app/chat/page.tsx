import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import path from 'path';
import fs from 'fs/promises';

interface PageProps {
  params: { url: string | string[] | undefined; };
}

const Page = async ({ params }: PageProps) => {
  const company = cookies().get("company")?.value;

  // Parse the JSON if it exists
  let companyEmail = "Unknown";
  let companyName = "Unknown";

  try {
    if (company) {
      const companyData = JSON.parse(company);
      companyName = companyData.name || "Unknown";
      companyEmail = companyData.email || "Unknown";
    }
  } catch (error) {
    console.error("Error parsing cookies:", error);
  }

  // Get the base directory for the company's data
  const companyDirPath = path.join(process.cwd(), "public", "data", companyName);

  // Create a function to recursively process all files in the company directory
  async function processAllFiles() {
    try {
      // Read all folders in the company directory
      const folders = await fs.readdir(companyDirPath);

      for (const folder of folders) {
        const folderPath = path.join(companyDirPath, folder);
        const folderStat = await fs.stat(folderPath);

        // Skip if not a directory
        if (!folderStat.isDirectory()) continue;

        // Read all files in the folder
        const files = await fs.readdir(folderPath);

        for (const file of files) {
          // Only process PDF files
          if (!file.toLowerCase().endsWith('.pdf')) continue;

          const filePath = path.join(folderPath, file);

          // Check if already indexed
          const isAlreadyIndexed = await redis.sismember(companyName, filePath);

          if (!isAlreadyIndexed) {
            // Add the PDF context
            await ragChat.context.add({
              type: "pdf",
              fileSource: filePath,
            });

            // Mark as indexed in Redis
            await redis.sadd(companyName, filePath);
            console.log(`Indexed: ${filePath}`);
          }
        }
      }
    } catch (error) {
      console.error("Error processing files:", error);
    }
  }

  // Process all files when the page loads
  await processAllFiles();

  // For the current selected item (still keeping this for the chat session)
  const selectedItem = cookies().get("selectedItem")?.value;
  let folderName = "Unknown";

  try {
    if (selectedItem) {
      const selectedItemData = JSON.parse(selectedItem);
      folderName = selectedItemData.folder || "Unknown";
    }
  } catch (error) {
    console.error("Error parsing selected item:", error);
  }
  let chatId = cookies().get('chatId')?.value; // Retrieve chatId from cookie

  if (!chatId) {
    chatId = "Unknown"
  }

  const sessionId = `${companyName}-${folderName}-${chatId}`.replace(/\//g, "");
  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;
// import path from "path";
// import fs, { mkdir, readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { redis } from "@/lib/redis";
import { ragChat } from "@/lib/rag-chat";
// import { crawlWebsiteToPDF } from "@/lib/crawl-web";

export async function GET() {
  try {
    // Get the currently authenticated user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Redis key for the user's websites
    const redisKey = `${userId}:websites`;

    // Get all websites from Redis Set
    const websites = await redis.smembers(redisKey);

    return NextResponse.json({ websites }, { status: 200 });
  } catch (error) {
    console.error("Error fetching websites from Redis:", error);
    return NextResponse.json(
      { error: "Failed to fetch websites" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const data = await req.formData();
    const newWebsitesString = data.get("websites") as string;

    let websitesSet = new Set<string>();

    const redisKey = `${userId}:websites`;
    const existingWebsites = await redis.smembers(redisKey);

    existingWebsites.forEach((site) => {
      websitesSet.add(site);
    });

    const newWebsites = newWebsitesString
      .split(",")
      .map((site) => site.trim())
      .filter(Boolean);

    const websitesToAdd = newWebsites.filter((site) => !websitesSet.has(site));
    const incompatibleWebsites: string[] = [];

    if (websitesToAdd.length > 0) {
      await Promise.all(
        websitesToAdd.map(async (website) => {
          const decodedWebsite = decodeURIComponent(website);

          try {
            // Check if already indexed for user
            const isAlreadyIndexed = await redis.sismember(
              redisKey,
              decodedWebsite
            );
            if (isAlreadyIndexed) {
              console.log(`⏩ Already indexed for user: ${decodedWebsite}`);
              return;
            }

            // ❗ Try to add context first
            await ragChat.context.add({
              type: "html",
              source: decodedWebsite,
            });

            // ✅ Only after successful context add, update Redis
            await redis.sadd(redisKey, decodedWebsite);
            console.log(`✅ Successfully indexed and added: ${decodedWebsite}`);
          } catch (err) {
            console.error(
              `❌ Failed to index ${decodedWebsite}`,
              err?.message || err
            );
            incompatibleWebsites.push(decodedWebsite);
          }
        })
      );
    }

    return NextResponse.json({
      message: "Website processing complete",
      incompatibleWebsites,
    });

    return NextResponse.json(
      {
        message: "Websites saved and indexed successfully!",
        incompatibleWebsites,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving websites:", error);
    return NextResponse.json(
      { error: "Website saving failed!" },
      { status: 500 }
    );
  }
}

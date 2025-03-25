import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { auth } from "@clerk/nextjs/server";
import clerkClient from "@clerk/clerk-sdk-node";

export async function POST(req) {
  try {
    const { userId } = await auth();

    const { folderName } = await req.json();
    if (!folderName) {
      return NextResponse.json(
        { error: "Folder name is required!" },
        { status: 400 }
      );
    }

    // Fetch all chat records from Redis sorted set
    const chatList = await redis.zrange(`${userId} - ${folderName}:chats`, 0, -1);

    // Try parsing each record safely
    const parsedChats = chatList.map((chat) => {
      try {
        return JSON.parse(chat); // Attempt to parse if it's a JSON string
      } catch {
        return chat; // If it's not JSON, return as is
      }
    });

    return NextResponse.json({ success: true, parsedChats });
  } catch (error) {
    console.error("Error fetching chat IDs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

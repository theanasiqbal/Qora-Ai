import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Redis key format: `${userId}:chats`
    const redisKey = `${userId}:chats`;

    const chatList = await redis.zrange(redisKey, 0, -1);
    return NextResponse.json({ success: true, chats: chatList });
  } catch (error) {
    console.error("Error fetching chat IDs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

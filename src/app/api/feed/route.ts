import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const feedId = searchParams.get("feedId");

    if (!feedId) {
      return NextResponse.json({ error: "Missing feedId" }, { status: 400 });
    }

    // Find user in the database
    const feed = await prisma.feed.findUnique({
      where: { id: feedId },
    });

    if (!feed) {
      return NextResponse.json({ error: "Feed not found" }, { status: 404 });
    }

    return NextResponse.json(feed);
  } catch (error) {
    console.error("Fetch Feed Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON body
    const { userId, content, prompt } = body;

    if (!userId || !content || !prompt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create a new draft
    const feed = await prisma.feed.create({
      data: {
        userId,
        content,
        prompt,
      },
    });

    return NextResponse.json(
      { message: "Feed created successfully", feed },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating feed:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

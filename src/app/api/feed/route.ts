import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "";
    const search = searchParams.get("search") || "";

    const where: any = {};

    // Filter by status if provided
    if (status) {
      where.status = status;
    }

    // Add search logic
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    // Fetch paginated & filtered feeds
    const [totalFeeds, feeds] = await Promise.all([
      prisma.feed.count({ where }),
       prisma.feed.findMany({
        where,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      success: true,
      time: new Date().toISOString(),
      message: "Fetched feeds successfully",
      total_feeds: totalFeeds,
      feeds,
    });
  } catch (error) {
    console.error("Fetch Feed Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, content, prompt, scheduledOn, campaign } = body;
    if (!userId || !content || !prompt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let parsedDate: Date | undefined;
    if (scheduledOn) {
      parsedDate = new Date(scheduledOn);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
      }
    }

    // Build data object conditionally
    const data: any = {
      userId,
      content,
      prompt,
      campaign,
    };

    if (parsedDate) {
      data.scheduledOn = parsedDate;
    }

    const feed = await prisma.feed.create({ data });

    return NextResponse.json(
      { message: "Feed created successfully", feed },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating feed:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


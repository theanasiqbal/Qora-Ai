import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

interface Params {
  params: { feedId: string };
}

export async function GET(req: Request, { params }: Params) {
  const { feedId } = params;

  if (!feedId) {
    return NextResponse.json({ error: "Missing feedId" }, { status: 400 });
  }

  try {
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

export async function PATCH(req: Request, { params }: Params) {
  const { feedId } = params;

  if (!feedId) {
    return NextResponse.json({ error: 'Missing feedId' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { scheduledOn } = body;

    if (!scheduledOn) {
      return NextResponse.json({ error: 'Missing scheduledOn field' }, { status: 400 });
    }

    const parsedDate = new Date(scheduledOn);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    const updatedFeed = await prisma.feed.update({
      where: { id: feedId },
      data: {
        scheduledOn: parsedDate,
      },
    });

    return NextResponse.json(updatedFeed);
  } catch (error) {
    console.error('Update Feed Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


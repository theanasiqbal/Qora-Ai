import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "";
    const search = searchParams.get("search") || "";
    const feedId = searchParams.get("feedId") || "";

    const where: any = {};

    // Filter by status if provided
    if (status) {
      where.status = status;
    }

    // Add search logic
    if (search) {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }];
    }

    if (feedId) {
      where.feedId = feedId;
    }

    // Fetch paginated & filtered feeds
    const leads = await prisma.lead.findMany({
      where,
    });

    // Ensure consistent response with 'total_leads' and 'leads'
    return NextResponse.json({
      success: true,
      time: new Date().toISOString(),
      message: "Fetched leads successfully",
      total_feeds: leads.length, // Using 'total_leads' key
      feeds: leads, // Using 'leads' key
      page,
      limit,
    });
  } catch (error) {
    console.error("Fetch Feed Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON body
    const { userId, feedId, name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new draft
    const lead = await prisma.lead.create({
      data: {
        userId,
        feedId,
        name,
        email,
        status: "Pending",
      },
    });

    await prisma.feed.update({
          where: { id: feedId },
          data: {
            leads: {
              increment: 1,
            },
          },
        });

    return NextResponse.json(
      { message: "Lead created successfully", lead },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON body
    const { userId, feedId, name, email } = body;

    if (!name || !email ) {
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

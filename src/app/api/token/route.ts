import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tokens = await prisma.token.findMany();

    if (!tokens || tokens.length === 0) {
      return NextResponse.json({ token: null });
    }

    // Assuming you want the first token
    const token = tokens[0];

    return NextResponse.json({
      accessToken: token.accessToken,
      pageId: token.pageId,
      expiresAt: token.expiresAt,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error fetching token.",
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {appName, pageId: string, accessToken } = body;

    const pageId = parseInt(string)

    const now = new Date();
    const expiresInSeconds = 60 * 24 * 60 * 60; // 60 days
    const expiresAt = new Date(now.getTime() + expiresInSeconds * 1000);

    const token = await prisma.token.upsert({
      where: { pageId }, // ensure there's a unique constraint on pageId
      update: { appName, accessToken, expiresAt },
      create: { appName, pageId, accessToken, expiresAt },
    });

    return NextResponse.json(
      { message: "Token saved", token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving token:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

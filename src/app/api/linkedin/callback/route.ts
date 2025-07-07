import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");


  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3001/api/linkedin/callback",
    client_id: process.env.LINKEDIN_CLIENT_ID!,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
  });

  try {
    const { data } = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      params,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log("data", data)
    const accessToken = data.access_token;

    await prisma.token.create({
      data: {
        appName:"LinkedIn",
        accessToken,
        pageId: 12345678, // Make sure this is an `Int` if your Prisma schema expects it
      },
    });

    return NextResponse.redirect("http://localhost:3001/chat");
  } catch (err) {
    console.error("LinkedIn token exchange failed:", err);
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const content = body.content;

    const token = await prisma.token.findFirst({
        where:{
            appName: "LinkedIn"
        }
    });


    const linkedinToken = token?.accessToken
    if (!linkedinToken) {
      return NextResponse.json({ error: "LinkedIn token not found" }, { status: 401 });
    }

    // Get user's LinkedIn profile to fetch their URN
    const profileRes = await axios.get("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${linkedinToken}`,
      },
    });


    const urn = profileRes.data.id;

    // Prepare LinkedIn post payload
    const postData = {
      author: `urn:li:person:${urn}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: content },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    // Make the LinkedIn post
    await axios.post("https://api.linkedin.com/v2/ugcPosts", postData, {
      headers: {
        Authorization: `Bearer ${linkedinToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ message: "Post shared on LinkedIn" }, { status: 200 });
  } catch (err: any) {
    console.error("LinkedIn post failed:", err.response?.data || err.message);
    return NextResponse.json({ error: "LinkedIn post failed" }, { status: 500 });
  }
}

// app/api/facebook/post/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const details = await prisma.token.findFirst({
    where: {
      appName: "facebook",
    },
  });

  const pageAccessToken = details?.accessToken;
  const pageId = details?.pageId;

  const { message, feedId } = await req.json();

  try {
    // Post to Facebook
    const { data } = await axios.post(
      `https://graph.facebook.com/${pageId}/feed`,
      {
        message,
        access_token: pageAccessToken,
      }
    );

    // // Only update the feed if the Facebook post is successful
    // if (data?.id) {
    //   await prisma.feed.update({
    //     where: {
    //       id: feedId,
    //     },
    //     data: {
    //       published: true,
    //     },
    //   });

    //   return NextResponse.json({ success: true, postId: data.id });
    // }

    return NextResponse.json({ success: true, postId: data.id });
  } catch (error: any) {
    console.error(
      "Facebook post error:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Facebook post failed" },
      { status: 500 }
    );
  }
}

// app/api/facebook/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const token = await prisma.token.findFirst({
        where:{
            appName:"facebook"
        }
    })

    const fb_token = token?.accessToken

    

  const code = req.nextUrl.searchParams.get("code");
  const CLIENT_ID = process.env.FACEBOOK_CLIENT_ID!;
  const CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET!;
  const REDIRECT_URI = "http://localhost:3001/api/facebook/callback";

  const { data } = await axios.get(
    `https://graph.facebook.com/v22.0/oauth/access_token`,
    {
      params: {
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        client_secret: CLIENT_SECRET,
        code,
      },
    }
  );

  const userAccessToken = data.access_token;

  // Optionally store token in DB or session

  return NextResponse.redirect(`/dashboard?fb_token=${userAccessToken}`);
}

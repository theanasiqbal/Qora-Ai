
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId");
  
      if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
      }
  
      // Find user in the database
      const user = await prisma.user.findUnique({
        where: { userId },
      });
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json(user);
    } catch (error) {
      console.error("Fetch User Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

export async function POST(req: Request) {
  try {
    const { userId, name, email, location, type, website, sources, profileUrl } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    // Ensure all required fields are present
    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { userId } });

    if (existingUser) {
      return NextResponse.json({ error: "User already onboarded" }, { status: 400 });
    }

    // Save user data in the database
    const newUser = await prisma.user.create({
      data: {
        userId,
        name,
        email,
        location,
        type,
        website,
        sources: sources || [],
        subscriptionStatus: "trial", // Default subscription status
        profileUrl,
      },
    });

    return NextResponse.json({ message: "User onboarded successfully", user: newUser });
  } catch (error) {
    console.error("Onboarding Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function PATCH(req: Request) {
    try {
      const { userId, ...updateData } = await req.json();
  
      if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
      }
  
      // Check if user exists
      const existingUser = await prisma.user.findUnique({ where: { userId } });
  
      if (!existingUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      // Update user details
      const updatedUser = await prisma.user.update({
        where: { userId },
        data: updateData,
      });
  
      return NextResponse.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Update User Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
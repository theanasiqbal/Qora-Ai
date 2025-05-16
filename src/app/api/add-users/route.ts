import { clerkClient } from "@clerk/clerk-sdk-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const users = await clerkClient.users.getUserList();
    const filtered = users.filter(
      (user) => user.publicMetadata?.role === "agent" && user.publicMetadata?.adminId === userId
    );

    return NextResponse.json({ users: filtered });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  const { userId } = await auth(); 
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { email, name } = body;

  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;

  try {
    const newUser = await clerkClient.users.createUser({
      firstName,
      ...(lastName ? { lastName } : {}),
      emailAddress: [email],
      publicMetadata: {
        role: "agent",
        adminId: userId,
      },
      skipPasswordRequirement: true,
    });

    await clerkClient.invitations.createInvitation({ emailAddress: email });

    return NextResponse.json({ user: newUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create user", err }, { status: 500 });
  }
}

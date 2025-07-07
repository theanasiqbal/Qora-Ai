import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();

    const allowedFields = ["name", "description", "active", "template"];
    const dataToUpdate: Record<string, any> = {};

    for (const field of allowedFields) {
      if (field in body) {
        dataToUpdate[field] = body[field];
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const updated = await prisma.campaign.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("PATCH /campaign/[id] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

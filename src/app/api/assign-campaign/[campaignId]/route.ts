import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function PATCH(req: NextRequest, { params }: { params: { campaignId: string } }) {
  const { campaignId } = params;

  if (!campaignId) {
    return NextResponse.json({ error: "Missing campaignId in params" }, { status: 400 });
  }

  try {
    const unassignedLeads = await prisma.lead.findMany({
      where: {
        type: "salesforce",
        campaignAssigned: false,
      },
    });

    if (unassignedLeads.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No unassigned salesforce leads found.",
      });
    }

    const updatePromises = unassignedLeads.map((lead) =>
      prisma.lead.update({
        where: { id: lead.id },
        data: {
          campaignId,
          campaignAssigned: true,
        },
      })
    );

    const updatedLeads = await Promise.all(updatePromises);

    console.log(`Updated ${updatedLeads.length} leads with campaign ID ${campaignId}`);

    return NextResponse.json({
      success: true,
      message: `Assigned campaign to ${updatedLeads.length} salesforce leads.`,
      updatedLeads,
    });
  } catch (error) {
    console.error("Error assigning campaign:", error);
    return NextResponse.json(
      { error: "Failed to assign campaign to leads" },
      { status: 500 }
    );
  }
}

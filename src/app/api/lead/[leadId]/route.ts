import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming you have Prisma set up

export async function GET(req: Request, { params }: { params: { leadId: string } }) {
  try {
    const { leadId } = params;  

    const lead = await prisma.lead.findUnique({
      where: {
        id: leadId, 
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { leadId: string } }) {
  try {
    const { leadId } = params; 
    const body = await req.json(); 

    if (!leadId) {
      return NextResponse.json({ error: 'leadId is required' }, { status: 400 });
    }

    const existingLead = await prisma.lead.findUnique({
      where: {
        id: leadId, 
      },
    });

    if (!existingLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id: leadId }, 
      data: {
        name: body.name,
        status: body.status, 
        email: body.email,
        notes: body.notes, 
        assignedAgentId: body.assignedAgentId
      },
    });

    // Return the updated lead data
    return NextResponse.json({ lead: updatedLead });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


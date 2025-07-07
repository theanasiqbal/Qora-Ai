import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { prisma } from '@/lib/prisma';
import Link from 'next/link'; // Importing Link from next/link

export async function RecentSales() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Leads</CardTitle>
        <CardDescription>You've received {leads.length} new leads.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {leads.map((lead) => {
            const initials = lead.name
              .split(' ')
              .map((part) => part[0])
              .join('')
              .toUpperCase();

            return (
              <Link key={lead.id} href={`/dashboard/lead/${lead.id}`} passHref>
                {/* Wrapping the whole div with Link */}
                <div className='flex items-center hover:bg-purple-600/50 hover:cursor-pointer p-2 rounded-md'>
                  <Avatar className='h-9 w-9'>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className='ml-4 space-y-1'>
                    <p className='text-sm font-medium leading-none'>{lead.name}</p>
                    <p className='text-sm text-muted-foreground'>{lead.email}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

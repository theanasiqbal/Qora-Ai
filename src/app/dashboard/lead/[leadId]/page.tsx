import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import LeadViewPage from '@/features/leads/components/lead-view-page';

export const metadata = {
  title: 'Dashboard : Lead View'
};

type PageProps = { params: Promise<{ leadId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
                  <LeadViewPage leadId={params.leadId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}

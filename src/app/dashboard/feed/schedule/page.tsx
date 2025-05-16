import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ScheduleViewPage from '@/features/schedule/schedule-view';

export const metadata = {
  title: 'Dashboard : Lead View'
};

type PageProps = {
  searchParams: { feedId?: string }; // feedId is optional, type it safely
};

export default function Page({ searchParams }: PageProps) {
  const feedId = searchParams.feedId;

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          {feedId ? (
            <ScheduleViewPage feedId={feedId} />
          ) : (
            <p>Feed ID not found in query parameters.</p>
          )}
        </Suspense>
      </div>
    </PageContainer>
  );
}

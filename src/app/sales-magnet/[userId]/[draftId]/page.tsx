import { Suspense } from "react";
import dynamic from "next/dynamic";
import { prisma } from "@/lib/prisma";

const SalesMagnetComponent = dynamic(
  () => import("@/components/sales-magnet"),
  {
    suspense: true,
  }
);

const SalesMagnetPage = async({
  params,
}: {
  params: { userId?: string; draftId?: string };
}) => {
  const { userId, draftId } = params;
  if (!userId || !draftId) {
  return <div>Invalid or missing route parameters.</div>;
}

   if (draftId) {
    await prisma.feed.update({
      where: { id: draftId },
      data: {
        impressions: {
          increment: 1,
        },
      },
    });
  }
  return (
    <Suspense fallback={<div>Loading Sales Magnet...</div>}>
      <SalesMagnetComponent userId={userId} feedId={draftId} />
    </Suspense>
  );
};

export default SalesMagnetPage;

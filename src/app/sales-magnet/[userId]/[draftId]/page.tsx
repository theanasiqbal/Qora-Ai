import { Suspense } from "react";
import dynamic from "next/dynamic";

const SalesMagnetComponent = dynamic(
  () => import("@/components/sales-magnet"),
  {
    suspense: true,
  }
);

const SalesMagnetPage = ({
  params,
}: {
  params: { userId?: string; draftId?: string };
}) => {
  const { userId, draftId } = params;
  return (
    <Suspense fallback={<div>Loading Sales Magnet...</div>}>
      <SalesMagnetComponent userId={userId} feedId={draftId} />
    </Suspense>
  );
};

export default SalesMagnetPage;

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const SalesMagnetComponent = dynamic(() => import('@/components/sales-magnet'), {
  suspense: true,
});

const SalesMagnetPage = () => {
  return (
    <Suspense fallback={<div>Loading Sales Magnet...</div>}>
      <SalesMagnetComponent />
    </Suspense>
  );
};

export default SalesMagnetPage;

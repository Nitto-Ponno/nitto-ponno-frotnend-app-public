import LaundryRoot from '@/components/pages/services/laundry/components/laundry-root';
import { Suspense } from 'react';

function LaundryPage() {
  return (
    <div className="my-container">
      <Suspense fallback={null}>
        <LaundryRoot />
      </Suspense>
    </div>
  );
}

export default LaundryPage;

import React, { Suspense } from 'react';
import VerifyComponent from '@/components/pages/auth/verify/verify-component';

const VerifyPage = () => {
  return (
    <div className="mx-auto w-lg">
      <Suspense fallback={null}>
        <VerifyComponent />
      </Suspense>
    </div>
  );
};

export default VerifyPage;

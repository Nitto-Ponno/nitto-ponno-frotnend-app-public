import ForgetPasswordForm from '@/components/pages/auth/forget-password/forget-password-form';
import React, { Suspense } from 'react';

const ForgetPassword = () => {
  return (
    <div className="mx-auto w-lg">
      <Suspense fallback={null}>
        <ForgetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ForgetPassword;

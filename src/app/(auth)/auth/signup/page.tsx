import React, { Suspense } from 'react';
import SignupForm from '@/components/pages/auth/signup/signup-form';

const Signup = () => {
  return (
    <div className="mx-auto w-lg">
      <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
    </div>
  );
};

export default Signup;

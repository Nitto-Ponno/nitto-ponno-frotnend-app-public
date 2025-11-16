import LoginForm from '@/components/pages/auth/login/login-form';
import React, { Suspense } from 'react';

const Login = () => {
  return (
    <div className="mx-auto w-lg">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Login;

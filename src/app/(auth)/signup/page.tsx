import React from 'react';

import { z } from 'zod';
import SignupForm from '@/components/pages/auth/signup/signup-form';

const Signup = () => {
  return (
    <div className="mx-auto w-lg">
      <SignupForm />
    </div>
  );
};

export default Signup;

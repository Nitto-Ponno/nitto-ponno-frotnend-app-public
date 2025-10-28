import React from 'react';
import Navbar from '@/components/shared/nav/nav-bar';
import TopBar from '@/components/shared/nav/top-bar';

interface Props {
  children: React.ReactNode;
}

function layout({ children }: Props) {
  return (
    <div>
      <TopBar />
      <Navbar />
      {children}
    </div>
  );
}

export default layout;

import Navbar from '@/components/shared/nav/nav-bar';
import TopBar from '@/components/shared/nav/top-bar';
import React from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <TopBar />
      <Navbar />
      {children}
    </main>
  );
};

export default PublicLayout;

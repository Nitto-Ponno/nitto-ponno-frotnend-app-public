import Banner from '@/components/shared/banner/banner';
import Navbar from '@/components/shared/nav/nav-bar';
import TopBar from '@/components/shared/nav/top-bar';
import React from 'react';
import { banners } from '../(public)/layout';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <TopBar />
      <Navbar />
      <Banner banners={banners} />
      {children}
    </main>
  );
}

export default layout;

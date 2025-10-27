import OurServices from '@/components/pages/home/our-services/our-services';
import Banner from '@/components/shared/banner/banner';
import Navbar from '@/components/shared/nav/nav-bar';
import TopBar from '@/components/shared/nav/top-bar';
import React from 'react';

export const banners = [
  {
    _id: '1',
    image: '/banner_images/image1.png',
  },
  {
    _id: '2',
    image: '/banner_images/image2.png',
  },
];

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <TopBar />
      <Navbar />
      <Banner banners={banners} />
      <OurServices />
      {children}
    </main>
  );
};

export default PublicLayout;

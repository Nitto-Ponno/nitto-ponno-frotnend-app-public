import OurServices from '@/components/pages/home/our-services/our-services';
import Banner from '@/components/shared/banner/banner';
import Navbar from '@/components/shared/nav/nav-bar';
import TopBar from '@/components/shared/nav/top-bar';
import React from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const banners = [
    {
      _id: '1',
      image:
        'https://www.lazzpharma.com/Content/ImageData/Banner/Orginal/00755636-97b8-41e7-be39-f594b4189189/banner.webp',
    },
    {
      _id: '2',
      image:
        'https://www.lazzpharma.com/Content/ImageData/Banner/Orginal/98ddfb02-62bc-4613-948a-60251d54b0d8/banner.webp',
    },
    {
      _id: '3',
      image:
        'https://www.lazzpharma.com/Content/ImageData/Banner/Orginal/fe4288bc-33e2-4327-a47e-fd796aadf454/banner.webp',
    },
  ];
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

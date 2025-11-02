import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';

const Banner = ({ banners }: { banners: { _id: string; image: string }[] }) => {
  return (
    <div className="flex  gap-4 px-2 py-3">
      <div className="w-full md:w-[75%]">
        <Carousel className="w-full max-w-full" autoPlay>
          <CarouselContent className="">
            {banners.map((banner, index) => (
              <CarouselItem key={banner?._id} className="rounded-sm">
                <div className="h-full rounded-none border md:h-[510px]">
                  <Image
                    src={banner?.image}
                    width={1920}
                    height={1080}
                    alt="Banner Image"
                    className="h-full w-full "
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="mx-auto w-[30%] hidden md:block">
        <Image
          src="/qrCode.png"
          width={1920}
          height={1080}
          alt="Safe Delivery Banner"
          className="h-full w-auto max-w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;

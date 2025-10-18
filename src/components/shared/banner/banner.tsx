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
    <div>
      <Carousel className="w-full max-w-full" autoPlay>
        <CarouselContent className="">
          {banners.map((banner, index) => (
            <CarouselItem key={banner?._id} className="">
              <div className="h-[300px] rounded-none border bg-red-300 md:h-[500px]">
                <Image
                  src={banner?.image}
                  width={1920}
                  height={1080}
                  alt="Banner Image"
                  className="h-full w-auto object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Banner;

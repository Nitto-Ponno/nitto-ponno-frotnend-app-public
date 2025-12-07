'use client';

import { useEffect, useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ILaundryProduct } from '@/types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

const LaundryCart = ({
  service,
  onAddToCart,
}: {
  service: ILaundryProduct;
  onAddToCart: (service: ILaundryProduct) => void;
}) => {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);
  const { name, image } = service;
  useEffect(() => {
    router.prefetch(`/services/laundry/${service._id}`);
  }, []);

  const handleRedirect = () => {
    router.push(`/services/laundry/${service._id}`);
  };

  return (
    <Card
      onClick={handleRedirect}
      className="w-full max-h-[400px] max-w-sm cursor-pointer overflow-hidden pt-0"
    >
      <div className="h-[250px] w-full bg-muted">
        <img
          src={image || '/products/shirt.png'}
          alt={name}
          className="h-full w-full object-center"
        />
      </div>
      <CardContent>
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="text-lg font-semibold truncate text-foreground">
              {name}
            </h3>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm text-white">{name}</p>
          </TooltipContent>
        </Tooltip>
      </CardContent>

      <CardFooter className="w-full flex gap-2 ">
        <Button
          variant="outline"
          size="icon"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
          className="shrink-0"
          aria-label="Add to favorites"
        >
          <Heart
            className="h-5 w-5"
            fill={isFavorited ? 'currentColor' : 'none'}
          />
        </Button>
        <Button
          className="flex-1"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onAddToCart(service);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add for service
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LaundryCart;

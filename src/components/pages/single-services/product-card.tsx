'use client';

import { useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  onAddToCart?: () => void;
}

export function ProductCard({ image, name, onAddToCart }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Card className="w-full max-h-[400px] max-w-sm overflow-hidden pt-0">
      <div className="max-h-[250px] bg-muted">
        <img
          src={image || '/placeholder.svg'}
          alt={name}
          className="h-full  w-full  object-center"
        />
      </div>
      <CardContent>
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
      </CardContent>

      <CardFooter className="w-full flex gap-2 ">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsFavorited(!isFavorited)}
          className="flex-shrink-0"
          aria-label="Add to favorites"
        >
          <Heart
            className="h-5 w-5"
            fill={isFavorited ? 'currentColor' : 'none'}
          />
        </Button>
        <Button className="flex-1" onClick={onAddToCart}>
          <Plus className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

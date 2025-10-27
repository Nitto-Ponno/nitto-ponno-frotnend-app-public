import React from 'react';
import LaundryIcon from '@/components/shared/svg/laundry-icon';
import { products } from '@/components/mock-data';
import { ProductCard } from '@/components/pages/single-services/product-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const productItems = {
  laundry: [
    {
      id: '1',
      name: 'Clothing Wash',
      icon: LaundryIcon,
    },
    {
      id: '2',
      name: 'Dry Cleaning',
      icon: LaundryIcon,
    },
    {
      id: '3',
      name: 'Ironing Service',
      icon: LaundryIcon,
    },
    {
      id: '4',
      name: 'Folded Clothes',
      icon: LaundryIcon,
    },
    {
      id: '5',
      name: 'Shoe Cleaning',
      icon: LaundryIcon,
    },
  ],
};

const seletedProductsBySection = products.filter(
  (product) => product.section === 'laundry',
);

const ServicePage = () => {
  return (
    <div className="my-container">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-5">
        {productItems.laundry.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer flex-col items-center gap-4 rounded-md border p-4 shadow-md transition hover:shadow-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <item.icon className="size-8" />
            </div>
            <p className="sub-heading text-center">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <div className="flex items-center gap-4 justify-between mb-6">
          <h2 className="heading text-left md:flex-grow  text-muted-foreground text-xl">
            Cloths for services
          </h2>
          <div className="md:flex-1">
            <Input
              placeholder="Search for products..."
              className="h-11 w-full bg-white"
              suffix={
                <Button className="cursor-pointer">
                  <Search className="text-white size-4" />
                </Button>
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-5">
          {seletedProductsBySection.map((product) => (
            <ProductCard
              image={`/products/${product.image}`}
              name={product.name}
              price={20}
              key={product._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;

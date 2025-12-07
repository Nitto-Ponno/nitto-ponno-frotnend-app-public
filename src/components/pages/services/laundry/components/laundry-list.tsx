'use client';

import { ILaundryProductList, ILaundryProduct } from '@/types';
import LaundryCart from './laundry-cart';

function LaundryList({ services }: { services: ILaundryProductList }) {
  const handleAddToCart = (service: ILaundryProduct) => {
    console.log(service);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-5">
      {services.map((service) => (
        <LaundryCart
          key={service._id}
          service={service}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default LaundryList;

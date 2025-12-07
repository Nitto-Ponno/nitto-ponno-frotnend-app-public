'use client';

import { useGetLaundryProductsQuery } from '@/redux/api/laundry/laundryApi';
import LaundryList from './laundry-list';
import useLaundryProductFilter from '../hook/laundry-product-filter';
import LaundryProductFilter from './laundry-product-filter';
import LoadingComp from '@/components/shared/loading/loading-comp';

function LaundryRoot() {
  const [filter, setFilter] = useLaundryProductFilter();
  const { data, isLoading, error } = useGetLaundryProductsQuery(filter);

  return (
    <div className="flex flex-col gap-6">
      <LaundryProductFilter />
      <div className="w-full">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <LoadingComp />
          </div>
        ) : (
          <LaundryList services={data?.data || []} />
        )}
      </div>
    </div>
  );
}

export default LaundryRoot;

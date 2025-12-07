'use client';

import { ILaundryService } from '@/types';

import { Input } from '@/components/ui/input';
import useLaundryProductFilter from '../hook/laundry-product-filter';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useGetLaundryServicesQuery } from '@/redux/api/laundry/laundryApi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LaundryProductFilter = () => {
  const [filter, setFilter] = useLaundryProductFilter();
  const [search, setSearch] = useState(filter?.search || '');
  const { data: servicesData } = useGetLaundryServicesQuery({});

  const debouncedSearch = debounce(
    (searchText: string) => setFilter({ ...filter, search: searchText }),
    300,
  );

  const handleServiceChange = (value: string) => {
    setFilter({ ...filter, serviceId: value === 'all' ? null : value });
  };

  return (
    <div className="flex items-center gap-2 ">
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
      </div>
      <Select
        value={filter.serviceId || 'all'}
        onValueChange={handleServiceChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Service" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Services</SelectItem>
          {servicesData?.data?.map((service: ILaundryService) => (
            <SelectItem key={service._id} value={service._id}>
              {service.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LaundryProductFilter;

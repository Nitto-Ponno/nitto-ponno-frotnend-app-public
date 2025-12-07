'use client';

import { useState } from 'react';

import LoadingComp from '@/components/shared/loading/loading-comp';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useGetALaundryProductByIdQuery } from '@/redux/api/laundry/laundryApi';
import { Plus } from 'lucide-react';
import Image from 'next/image';

const LaundryDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetALaundryProductByIdQuery(id);

  const loadyryProduct = data?.data;
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const variations = loadyryProduct?.variations || [];
  const isAllSelected =
    variations.length > 0 && selectedRows.length === variations.length;

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(variations.map((v) => v._id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  if (error) {
    return <div>Something went wrong</div>;
  }
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <LoadingComp />
        </div>
      ) : (
        <div className="flex justify-center gap-6">
          <div className="flex flex-col items-start gap-6">
            <Image
              src={data?.data?.image || '/products/shirt.png'}
              alt={data?.data?.name || ''}
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-medium">{data?.data?.name}</h2>
            </div>
            <Separator className="my-2 mb-4" />

            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={toggleAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadyryProduct?.variations?.map((variation) => (
                    <TableRow
                      className={cn(
                        'text-center',
                        variation.isAvailable ? 'bg-green-500' : 'bg-red-100',
                      )}
                      key={variation._id}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(variation._id)}
                          onCheckedChange={() => toggleRow(variation._id)}
                          aria-label="Select row"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {variation.serviceId?.name}
                      </TableCell>
                      <TableCell>{variation.price}</TableCell>
                      <TableCell>{variation.discount?.value}</TableCell>
                      <TableCell>{variation.sku}</TableCell>
                      <TableCell>
                        {variation.isAvailable ? 'Yes' : 'No'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Attributes */}
            <div>
              {loadyryProduct?.attributes?.map((attribute) => (
                <div key={attribute._id}>
                  <h3>{attribute.name}</h3>
                  <Separator className="mt-2 mb-4" />
                  <div>
                    <RadioGroup
                      className="flex"
                      defaultValue={attribute.options?.[0].value}
                    >
                      {attribute.options?.map((option) => (
                        <div
                          className="flex items-center gap-3"
                          key={option.id}
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                          />
                          <Label htmlFor={option.value}>{option.value}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              ))}
            </div>

            {/* Add to cart */}
            <div>
              <Button className="flex items-center gap-2">
                <Plus className="mr-2 h-4 w-4" />
                Add for service
              </Button>
            </div>
            <p className="text-lg">{data?.data?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaundryDetail;

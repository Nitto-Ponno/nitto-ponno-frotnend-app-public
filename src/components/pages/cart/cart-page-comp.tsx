'use client';

import {
  cartData,
  CartItem,
  servicesForIndividualItems,
} from '@/components/mock-data';
import { Button } from '@/components/ui/button';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Minus, Plus, Trash2 } from 'lucide-react';

function CartPageComp() {
  const [cartItems, setCartItems] = useState<
    (CartItem & {
      selectedService: { name: string; price: number; id: string };
      quantity: number;
    })[]
  >([]);

  useEffect(() => {
    const preparedItems = cartData.map((item) => {
      return {
        ...item,
        selectedService: {
          name: '',
          price: 0,
          id: '',
        },
      };
    });
    setCartItems(preparedItems);
  }, []);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleSelectService = (itemId: string, serviceName: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product._id === itemId) {
          const selectedService = servicesForIndividualItems.find(
            (service) =>
              service.productId === itemId &&
              service.service.name === serviceName,
          );

          return {
            ...item,
            selectedService: {
              name: selectedService?.service.name ?? '',
              price: selectedService?.price ?? 0,
              id: selectedService?._id ?? '',
            },
          };
        }
        return item;
      }),
    );
  };

  const { subtotal, deliveryFee, total } = useMemo(() => {
    const deliveryFee = 50;

    const subtotal = cartItems.reduce((acc, item) => {
      const itemTotal =
        (item?.selectedService?.price || 0) * (item.quantity || 0);
      return acc + itemTotal;
    }, 0);

    const total = subtotal + deliveryFee;

    return { subtotal, deliveryFee, total };
  }, [cartItems]);

  return (
    <div className="my-container">
      <div className="grid md:grid-cols-10 gap-4">
        <Card className="md:col-span-7  bg-white shadow-sm ">
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox id="items" />
              <Label className="uppercase" htmlFor="items">
                {`Select All (12, Items)`}
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="ml-auto">
                  <Trash2 className="text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove all selected items</TooltipContent>
            </Tooltip>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div
                  key={item.product?._id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <Checkbox id={item?.product?._id.toString()} />
                  <div className="flex gap-4 items-center flex-1">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        className="w-20 h-20 object-cover"
                        src={`/products/${item.product?.image}`}
                        alt={item.product?.name}
                      />
                      <h3 className="font-semibold">{item.product?.name}</h3>
                    </div>

                    <div>
                      <p>
                        {item.selectedService?.name ||
                          'Please select a service'}
                      </p>
                      <p>
                        ৳ {item.selectedService?.price * (item.quantity || 0)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Select
                      onValueChange={(value) =>
                        handleSelectService(item.product._id, value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Services</SelectLabel>
                          {servicesForIndividualItems
                            ?.filter(
                              (service) =>
                                service?.productId === item?.product?._id,
                            )
                            .map((service) => (
                              <SelectItem
                                key={service?._id}
                                value={service?.service?.name}
                              >
                                {service?.service?.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity + 1,
                        )
                      }
                      variant="outline"
                      size="sm"
                    >
                      <Plus />
                    </Button>

                    <Input
                      prefix={'Qty'}
                      className="max-w-24 text-center"
                      value={item?.quantity}
                    />

                    <Button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity - 1,
                        )
                      }
                      disabled={item.quantity === 1}
                      variant="outline"
                      size="sm"
                    >
                      <Minus />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="md:col-span-3">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <h2 className="text-2xl font-bold">Order Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳ {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>৳ {deliveryFee}</span>
                </div>
                <div className="flex justify-between items-center space-x-2">
                  <Input placeholder="Enter promo code" />
                  <Button type="button" className="cursor-pointer">
                    Apply
                  </Button>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>৳ {total}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full">Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CartPageComp;

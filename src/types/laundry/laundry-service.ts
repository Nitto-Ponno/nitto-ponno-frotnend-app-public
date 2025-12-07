export interface ILaundryService {
  _id: string;
  name: string;
  slug: string;
  icon?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  warnings?: string | null;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDiscount {
  type: 'percent' | 'flat';
  value: number;
}

export interface IService {
  _id: string;
  name: string;
}

export interface IAttributeOption {
  value: string;
  id: string;
}

export interface IAttribute {
  _id: string;
  name: string;
  options: IAttributeOption[];
}

export interface IVariationAttributeValue {
  attributeId: string;
  value: string;
}

export interface IVariation {
  _id: string;
  serviceId: {
    _id: string;
    name: string;
    id: string;
  };
  price: number;
  discount: IDiscount;
  sku: string;
  isAvailable: boolean;
  attributeValues?: IVariationAttributeValue[];
  createdAt: string;
  updatedAt: string;
}

export interface ILaundryProduct {
  _id: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  discount: IDiscount;
  services: IService[];
  attributes: IAttribute[];
  variations: IVariation[];
  createdAt: string;
  updatedAt: string;
  finalPrice: number;
  id: string;
  image: string;
}

export interface ILaundryProductList extends Array<ILaundryProduct> {}

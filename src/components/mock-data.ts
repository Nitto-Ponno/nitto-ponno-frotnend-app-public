import { nanoid } from 'zod';

export const categories = [
  { _id: 'mens', name: "Men's Wear" },
  { _id: 'women', name: "Women's Wear" },
  { _id: 'kids', name: 'Kids Wear' },
  { _id: 'winter', name: 'Winter Wear' },
  { _id: 'home', name: 'Home Textile' },
  { _id: 'other', name: 'Other' },
];

export const services = [
  {
    _id: 'wash_fold',
    name: 'Wash & Fold',
    priceType: 'fixed',
  },
  {
    _id: 'wash_iron',
    name: 'Wash & Iron',
    priceType: 'fixed',
  },
  {
    _id: 'iron_only',
    name: 'Iron Only',
    priceType: 'fixed',
  },
  {
    _id: 'dry_clean',
    name: 'Dry Cleaning',
    priceType: 'fixed',
  },
  {
    _id: 'steam_press',
    name: 'Steam Press',
    priceType: 'fixed',
  },
  {
    _id: 'spot_clean',
    name: 'Spot Cleaning',
    priceType: 'fixed',
  },

  {
    _id: 'delicate',
    name: 'Delicate Handling',
    priceType: 'fixed',
  },
];

export const packages = [
  {
    _id: 'express',
    name: 'Express Delivery',
    priceType: 'percentage',
    percentageValue: 20,
  },
  {
    _id: 'premium_pack',
    name: 'Premium Packaging',
    priceType: 'fixed',
  },
  {
    _id: 'subscription',
    name: 'Subscription Service',
    priceType: 'fixed',
  },
];

export const pricing = [
  {
    productId: 'shirt',
    serviceId: 'wash_fold',
    price: 30,
    currency: 'BDT',
  },
  {
    productId: 'shirt',
    serviceId: 'wash_iron',
    price: 45,
    currency: 'BDT',
  },
  {
    productId: 'shirt',
    serviceId: 'iron_only',
    price: 20,
    currency: 'BDT',
  },
  {
    productId: 'shirt',
    serviceId: 'dry_clean',
    price: 100,
    currency: 'BDT',
  },

  {
    productId: 'tshirt',
    serviceId: 'wash_fold',
    price: 25,
    currency: 'BDT',
  },
  {
    productId: 'tshirt',
    serviceId: 'wash_iron',
    price: 35,
    currency: 'BDT',
  },
  {
    productId: 'tshirt',
    serviceId: 'iron_only',
    price: 15,
    currency: 'BDT',
  },
  {
    productId: 'tshirt',
    serviceId: 'dry_clean',
    price: 90,
    currency: 'BDT',
  },
];

export const timeSlots = [
  {
    _id: 'slot1',
    dayOfWeek: 0,
    startTime: '09:00',
    endTime: '11:00',
    type: 'pickup',
    isActive: true,
  },
  {
    _id: 'slot2',
    dayOfWeek: 0,
    startTime: '17:00',
    endTime: '19:00',
    type: 'delivery',
    isActive: true,
  },
  {
    _id: 'slot3',
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '11:00',
    type: 'pickup',
    isActive: true,
  },
  {
    _id: 'slot4',
    dayOfWeek: 1,
    startTime: '17:00',
    endTime: '19:00',
    type: 'delivery',
    isActive: true,
  },
];

export const sampleOrders = [
  {
    _id: 'order_001',
    userId: 'user_001',
    pickupSlotId: 'slot1',
    deliverySlotId: 'slot2',
    status: 'washing',
    paymentStatus: 'cod',
    totalPrice: 180,
    address: 'Dhaka, Bangladesh',
  },
];

export const sampleOrderItems = [
  {
    orderId: 'order_001',
    productId: 'shirt',
    serviceId: 'wash_iron',
    qty: 2,
    unitPrice: 45,
    qrTagCode: nanoid(),
  },
  {
    orderId: 'order_001',
    productId: 'pant',
    serviceId: 'wash_iron',
    qty: 1,
    unitPrice: 50,
    qrTagCode: nanoid(),
  },
];

export const sampleStatusLogs = [
  { orderId: 'order_001', status: 'picked', timestamp: new Date() },
  { orderId: 'order_001', status: 'washing', timestamp: new Date() },
];

export const products = [
  // Men
  {
    _id: 'shirt',
    name: 'Shirt',
    categoryId: 'men',
    unitType: 'piece',
    image: 'shirt.png',
    section: 'laundry',
  },
  {
    _id: 'tshirt',
    name: 'T-Shirt',
    categoryId: 'men',
    unitType: 'piece',
    image: `/t-shirt.png`,
    section: 'laundry',
  },
  {
    _id: 'punjabi',
    name: 'Panjabi',
    categoryId: 'men',
    unitType: 'piece',
    image: `/panjabi.png`,
    section: 'laundry',
  },
  {
    _id: 'fotuya',
    name: 'Fotuya',
    categoryId: 'men',
    section: 'laundry',
    unitType: 'piece',
    image: `/fotuya.png`,
  },
  {
    _id: 'kabli_set',
    section: 'laundry',
    name: 'Kabli Set',
    categoryId: 'men',
    unitType: 'piece',
    image: `/kabli-set.png`,
  },
  {
    _id: 'pant',
    section: 'laundry',
    name: 'Pant',
    categoryId: 'men',
    unitType: 'piece',
    image: `/pant.png`,
  },
  {
    _id: 'jeans',
    section: 'laundry',
    name: 'Jeans',
    categoryId: 'men',
    unitType: 'piece',
    image: `/jeans.png`,
  },

  // Women
  {
    _id: 'salwar_gorgeous',
    section: 'laundry',
    name: 'Salwar Kameez (Gorgeous)',
    categoryId: 'women',
    unitType: 'piece',
    image: `/salwar-gorgeous.png`,
  },
  {
    _id: 'salwar_normal',
    section: 'laundry',
    name: 'Salwar Kameez (Normal)',
    categoryId: 'women',
    unitType: 'piece',
    image: `/salwar-normal.jpg`,
  },
  {
    _id: 'three_piece_gorgeous',
    section: 'laundry',
    name: 'Three Piece (Gorgeous)',
    categoryId: 'women',
    unitType: 'piece',
    image: `/three-piece-gorgeous.jpg`,
  },
  {
    _id: 'three_piece_normal',
    section: 'laundry',
    name: 'Three Piece (Normal)',
    categoryId: 'women',
    unitType: 'piece',
    image: `/salwar-gorgeous.png`,
  },
  {
    _id: 'lehenga',
    section: 'laundry',
    name: 'Lehenga',
    categoryId: 'women',
    unitType: 'piece',
    image: `/lehenga.jpg`,
  },
  {
    _id: 'jamdani',
    section: 'laundry',
    name: 'Jamdani',
    categoryId: 'women',
    unitType: 'piece',
    image: `/Jamdani.jpg`,
  },
  {
    _id: 'silk_saree',
    section: 'laundry',
    name: 'Silk Saree',
    categoryId: 'women',
    unitType: 'piece',
    image: `/silk-saree.jpg`,
  },
  {
    _id: 'saree_gorgeous',
    section: 'laundry',
    name: 'Saree (Gorgeous)',
    categoryId: 'women',
    unitType: 'piece',
    image: `/Jamdani.jpg`,
  },
  //   {
  //     _id: 'saree_normal',
  //     section: 'laundry',
  //     name: 'Saree (Normal)',
  //     categoryId: 'women',
  //     unitType: 'piece',
  //     image: `/silk-saree.jpg`,
  //   },
  //   {
  //     _id: 'orna',
  //     section: 'laundry',
  //     name: 'Orna',
  //     categoryId: 'women',
  //     unitType: 'piece',
  //     image: `women/orna.jpg`,
  //   },
  //   {
  //     _id: 'shawl',
  //     section: 'laundry',
  //     name: 'Shawl',
  //     categoryId: 'women',
  //     unitType: 'piece',
  //     image: `women/shawl.jpg`,
  //   },
  //   {
  //     _id: 'burkha',
  //     section: 'laundry',
  //     name: 'Burkha',
  //     categoryId: 'women',
  //     unitType: 'piece',
  //     image: `women/burkha.jpg`,
  //   },
  //   {
  //     _id: 'hijab',
  //     section: 'laundry',
  //     name: 'Hijab',
  //     categoryId: 'women',
  //     unitType: 'piece',
  //     image: `women/hijab.jpg`,
  //   },
  //   {
  //     _id: 'blouse',
  //     section: 'laundry',
  //     name: 'Blouse',
  //     categoryId: 'women',
  //     unitType: 'piece',
  //     image: `women/blouse.jpg`,
  //   },
  //   {
  //     _id: 'tops',
  //     section: 'laundry',
  //     name: 'Tops',
  //     categoryId: 'women',
  //     unitType: 'piece',
  //     image: `women/tops.jpg`,
  //   },
  //   {
  //     _id: 'skirt',
  //     section: 'laundry',
  //     name: 'Skirt',
  //     categoryId: 'women',
  //     unitType: 'piece',
  //     image: `women/skirt.jpg`,
  //   },

  //   // Kids
  //   {
  //     _id: 'baby_dress',
  //     section: 'laundry',
  //     name: 'Baby Dress',
  //     categoryId: 'kids',
  //     unitType: 'piece',
  //     image: `kids/baby-dress.jpg`,
  //   },

  //   // Winter
  //   {
  //     _id: 'jacket',
  //     section: 'laundry',
  //     name: 'Jacket',
  //     categoryId: 'winter',
  //     unitType: 'piece',
  //     image: `winter/jacket.jpg`,
  //   },
  //   {
  //     _id: 'sweater',
  //     section: 'laundry',
  //     name: 'Sweater',
  //     categoryId: 'winter',
  //     unitType: 'piece',
  //     image: `winter/sweater.jpg`,
  //   },
  //   {
  //     _id: 'coat',
  //     section: 'laundry',
  //     name: 'Coat',
  //     categoryId: 'winter',
  //     unitType: 'piece',
  //     image: `winter/coat.jpg`,
  //   },
  //   {
  //     _id: 'complete_suit',
  //     section: 'laundry',
  //     name: 'Complete Suit',
  //     categoryId: 'winter',
  //     unitType: 'piece',
  //     image: `winter/complete-suit.jpg`,
  //   },

  //   // Home
  //   {
  //     _id: 'bed_sheet',
  //     section: 'laundry',
  //     name: 'Bed Sheet',
  //     categoryId: 'home',
  //     unitType: 'piece',
  //     image: `home/bed-sheet.jpg`,
  //   },
  //   {
  //     _id: 'pillow_cover',
  //     section: 'laundry',
  //     name: 'Pillow Cover',
  //     categoryId: 'home',
  //     unitType: 'piece',
  //     image: `home/pillow-cover.jpg`,
  //   },
  //   {
  //     _id: 'blanket',
  //     section: 'laundry',
  //     name: 'Blanket',
  //     categoryId: 'home',
  //     unitType: 'piece',
  //     image: `home/blanket.jpg`,
  //   },
  //   {
  //     _id: 'comforter',
  //     section: 'laundry',
  //     name: 'Comforter',
  //     categoryId: 'home',
  //     unitType: 'piece',
  //     image: `home/comforter.jpg`,
  //   },
  //   {
  //     _id: 'sofa_cover',
  //     section: 'laundry',
  //     name: 'Sofa Cover',
  //     categoryId: 'home',
  //     unitType: 'piece',
  //     image: `home/sofa-cover.jpg`,
  //   },
  //   {
  //     _id: 'curtain',
  //     section: 'laundry',
  //     name: 'Curtains',
  //     categoryId: 'home',
  //     unitType: 'piece',
  //     image: `home/curtain.jpg`,
  //   },
  //   {
  //     _id: 'towel',
  //     section: 'laundry',
  //     name: 'Towel',
  //     categoryId: 'home',
  //     unitType: 'piece',
  //     image: `home/towel.jpg`,
  //   },
  //   {
  //     _id: 'napkin',
  //     section: 'laundry',
  //     name: 'Napkin',
  //     categoryId: 'home',
  //     unitType: 'piece',
  //     image: `home/napkin.jpg`,
  //   },

  //   // Other
  //   {
  //     _id: 'socks',
  //     section: 'laundry',
  //     name: 'Socks',
  //     categoryId: 'other',
  //     unitType: 'pair',
  //     image: `other/socks.jpg`,
  //   },
  //   {
  //     _id: 'underwear',
  //     section: 'laundry',
  //     name: 'Underwear',
  //     categoryId: 'other',
  //     unitType: 'piece',
  //     image: `other/underwear.jpg`,
  //   },
  //   {
  //     _id: 'uniform',
  //     section: 'laundry',
  //     name: 'Uniform',
  //     categoryId: 'other',
  //     unitType: 'piece',
  //     image: `other/uniform.jpg`,
  //   },
];

interface ServiceForIndividualItem {
  _id: string;
  service: {
    id: string;
    name: string;
    priceType: string;
    productType: string;
  };
  description: string;
  price: number;
  duration: number;
  productId: string;
  serviceId: string;
}

export const servicesForIndividualItems: ServiceForIndividualItem[] = [
  {
    _id: '1',
    service: {
      id: 'wash_iron',
      name: 'Iron and Fold',
      priceType: 'fixed',
      productType: 'pcs',
    },
    description: 'Wash and iron your clothes',
    price: 30,
    duration: 30,
    productId: 'shirt',
    serviceId: 'wash_iron',
  },
  {
    _id: '2',
    service: {
      id: 'dry_clean',
      name: 'Dry Clean',
      priceType: 'fixed',
      productType: 'pcs',
    },
    description: 'Dry clean your clothes',
    price: 100,
    duration: 48,
    productId: 'shirt',
    serviceId: 'dry_clean',
  },
  {
    _id: '3',
    service: {
      id: 'iron_only',
      name: 'Iron Only',
      priceType: 'fixed',
      productType: 'pcs',
    },
    description: 'Iron only your clothes',
    price: 20,
    duration: 20,
    productId: 'shirt',
    serviceId: 'iron_only',
  },
  {
    _id: '4',
    service: {
      id: 'wash_iron',
      name: 'Iron and Fold',
      priceType: 'fixed',
      productType: 'pcs',
    },
    description: 'Wash and iron your clothes',
    price: 40,
    duration: 30,
    productId: 'pant',
    serviceId: 'wash_iron',
  },
];

export interface CartItem {
  product: {
    _id: string;
    name: string;
    image: string;
  };
  serviceId: string;
  quantity: number;
  unitPrice: number;
  currency: string;
}

export const cartData: CartItem[] = [
  {
    product: {
      _id: 'shirt',
      name: 'Shirt',
      image: 'shirt.png',
    },
    serviceId: 'wash_iron',
    quantity: 2,
    unitPrice: 45,
    currency: 'BDT',
  },
  {
    product: {
      _id: 'pant',
      name: 'Pant',
      image: 'pant.png',
    },
    serviceId: 'wash_iron',
    quantity: 1,
    unitPrice: 50,
    currency: 'BDT',
  },
];

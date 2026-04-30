const marbleSamplesImage = 'https://images.unsplash.com/photo-1749212387838-c4c4e6e58348?auto=format&fit=crop&w=1200&q=80';
const marbleTextureImage = 'https://images.unsplash.com/photo-1584294273740-0ecc6df9f9f0?auto=format&fit=crop&w=1200&q=80';

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  color: string;
  size: string;
  finish: string;
  price: number;
  priceUnit: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'oq-marmar-plitka',
    name: 'Oq marmar plitka',
    category: 'Marmar',
    color: 'Oq',
    size: '60x60x2 sm',
    finish: 'Jilolangan',
    price: 45,
    priceUnit: 'm2',
    description: "Yuqori sifatli oq marmar plitka. Interyer va fasad ishlari uchun mos.",
    features: ['Jilolangan sirt', 'Yengil tozalanadi', 'Interyer uchun mos'],
    image: marbleSamplesImage,
    imageAlt: 'Marmar va tabiiy tosh namunalari',
  },
  {
    id: 2,
    slug: 'pushti-marmar-plitka',
    name: 'Pushti marmar plitka',
    category: 'Marmar',
    color: 'Pushti',
    size: '60x60x2 sm',
    finish: 'Jilolangan',
    price: 55,
    priceUnit: 'm2',
    description: "Noyob pushti rangdagi marmar plitka. Mehmonxona, lobby va premium interyerlar uchun.",
    features: ['Noyob rang', "Premium ko'rinish", 'Dekorativ ishlarga mos'],
    image: marbleSamplesImage,
    imageAlt: 'Rangli marmar namunalari',
  },
  {
    id: 3,
    slug: 'kulrang-granit-plitka',
    name: 'Kulrang granit plitka',
    category: 'Granit',
    color: 'Kulrang',
    size: '60x60x3 sm',
    finish: 'Kuydirilgan',
    price: 65,
    priceUnit: 'm2',
    description: 'Chidamli kulrang granit plitka. Tashqi maydonlar, zinapoya va fasad uchun mos.',
    features: ['Chidamli', 'Sovuqqa chidamli', 'Tashqi ishlar uchun'],
    image: marbleTextureImage,
    imageAlt: 'Kulrang tabiiy tosh teksturasi',
  },
  {
    id: 4,
    slug: 'qora-granit-blok',
    name: 'Qora granit blok',
    category: 'Granit',
    color: 'Qora',
    size: '3x2x1.5 m',
    finish: 'Xom blok',
    price: 2500,
    priceUnit: 'm3',
    description: 'Qora granit blok. Monumental qurilish va yodgorlik ishlari uchun.',
    features: ['Monumental ishlarga mos', 'Vaqtga chidamli', 'Xom ashyo sifatida sotiladi'],
    image: marbleTextureImage,
    imageAlt: 'Qoramtir tabiiy tosh yuzasi',
  },
  {
    id: 5,
    slug: 'oltin-marmar-plitka',
    name: 'Oltin tusli marmar plitka',
    category: 'Marmar',
    color: 'Oltin',
    size: '60x60x2 sm',
    finish: 'Jilolangan',
    price: 75,
    priceUnit: 'm2',
    description: 'Oltin tusli marmar plitka. Hashamatli interyer va dekorativ bezaklar uchun.',
    features: ['Issiq rang', "Hashamatli ko'rinish", 'Premium segment'],
    image: marbleSamplesImage,
    imageAlt: 'Marmar va granit namunalar vitrini',
  },
  {
    id: 6,
    slug: 'qizil-granit-plitka',
    name: 'Qizil granit plitka',
    category: 'Granit',
    color: 'Qizil',
    size: '60x60x3 sm',
    finish: 'Jilolangan',
    price: 85,
    priceUnit: 'm2',
    description: 'Qizil granit plitka. Bezak, landshaft va aksent zonalar uchun.',
    features: ['Aksent rang', 'Bezak uchun mos', 'Yuqori chidamlilik'],
    image: marbleTextureImage,
    imageAlt: 'Tabiiy granit teksturasi',
  },
];

export const productCategories = ['Marmar', 'Granit'];
export const productColors = ['Oq', 'Pushti', 'Kulrang', 'Qora', 'Qizil', 'Oltin'];
export const productFinishes = ['Jilolangan', 'Kuydirilgan', 'Xom blok'];

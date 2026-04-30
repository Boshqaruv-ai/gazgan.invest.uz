export interface InvestmentItem {
  id: string;
  name: string;
  amount: number;
  roi: number;
  payback: number;
  description: string;
  category: string;
}

export const investments: InvestmentItem[] = [
  {
    id: 'granit-processing',
    name: 'Granit qayta ishlash kompleksi',
    amount: 5000000,
    roi: 25,
    payback: 4,
    category: 'Processing',
    description: 'Granit plitka va bloklarni eksportga tayyor formatda qayta ishlash loyihasi.',
  },
  {
    id: 'marble-processing',
    name: 'Marmar ishlab chiqarish liniyasi',
    amount: 4000000,
    roi: 22,
    payback: 5,
    category: 'Manufacturing',
    description: 'Marmar plitka, slab va dekorativ mahsulotlar uchun ishlab chiqarish liniyasi.',
  },
  {
    id: 'quarry-development',
    name: 'Kon rivojlantirish loyihasi',
    amount: 8000000,
    roi: 30,
    payback: 3,
    category: 'Quarry',
    description: "Yangi kon yo‘nalishini texnika, qazib olish va logistika infratuzilmasi bilan rivojlantirish.",
  },
  {
    id: 'souvenir-factory',
    name: 'Dekorativ mahsulotlar fabrikasi',
    amount: 1500000,
    roi: 30,
    payback: 3,
    category: 'Consumer goods',
    description: 'Marmar va granitdan suvenir, interyer aksenti va kichik formatli mahsulotlar ishlab chiqarish.',
  },
];

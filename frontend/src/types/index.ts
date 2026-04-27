export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  role: 'admin' | 'investor';
}

export interface Quarry {
  id: number;
  slug: string;
  name: string;
  type: 'marble' | 'granite';
  colors: string[];
  location: string;
  region: string;
  reserves: number;
  density: number;
  description: string;
  images: string[];
  isActive: boolean;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: 'marble' | 'granite' | 'souvenir';
  quarryId?: number;
  colors: string[];
  dimensions: string;
  thickness: number;
  finishType: 'polished' | 'honed' | 'brushed' | 'flamed';
  pricePerUnit: number;
  unit: 'm2' | 'm3' | 'piece';
  description: string;
  images: string[];
  isActive: boolean;
}

export interface Workshop {
  id: number;
  name: string;
  type: string;
  annualCapacity: number;
  description: string;
  equipment: string[];
  isActive: boolean;
}

export interface Investment {
  id: number;
  slug: string;
  name: string;
  minAmount: number;
  expectedRoi: number;
  paybackYears: number;
  description: string;
  requirements: string;
  isActive: boolean;
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface InvestmentCalculation {
  investedAmount: number;
  annualReturnPercent: number;
  annualReturnAmount: number;
  paybackYears: number;
  totalReturn: number;
  roiPercentage: number;
}
'use client';

import { useMemo, useState } from 'react';

export interface InvestmentResult {
  annual_return_percent: number;
  payback_years: number;
  annual_return_amount: number;
  total_return: number;
  scenarios: {
    optimistic: { roi: number; annual_return: number; total_return: number };
    realistic: { roi: number; annual_return: number; total_return: number };
    pessimistic: { roi: number; annual_return: number; total_return: number };
  };
}

const ROI_DATA: Record<string, { roi: number; payback: number }> = {
  'granite-processing': { roi: 25, payback: 4 },
  'marble-processing': { roi: 22, payback: 5 },
  'quarry-development': { roi: 30, payback: 3 },
  'souvenir-factory': { roi: 30, payback: 3 },
};

export function useInvestmentCalc() {
  const [amount, setAmount] = useState(5000000);
  const [sector, setSector] = useState('marble-processing');
  const [period, setPeriod] = useState(5);

  const results = useMemo<InvestmentResult>(() => {
    const sectorData = ROI_DATA[sector] || ROI_DATA['marble-processing'];
    const annualAmount = amount * (sectorData.roi / 100);
    const optimisticRoi = sectorData.roi + 7;
    const pessimisticRoi = Math.max(sectorData.roi - 7, 5);

    return {
      annual_return_percent: sectorData.roi,
      payback_years: sectorData.payback,
      annual_return_amount: annualAmount,
      total_return: annualAmount * period,
      scenarios: {
        optimistic: {
          roi: optimisticRoi,
          annual_return: amount * (optimisticRoi / 100),
          total_return: amount * (optimisticRoi / 100) * period,
        },
        realistic: {
          roi: sectorData.roi,
          annual_return: annualAmount,
          total_return: annualAmount * period,
        },
        pessimistic: {
          roi: pessimisticRoi,
          annual_return: amount * (pessimisticRoi / 100),
          total_return: amount * (pessimisticRoi / 100) * period,
        },
      },
    };
  }, [amount, sector, period]);

  return {
    amount,
    setAmount,
    sector,
    setSector,
    period,
    setPeriod,
    results,
    loading: false,
    sectors: [
      { value: 'granite-processing', label: 'Granit qayta ishlash' },
      { value: 'marble-processing', label: 'Marmar qayta ishlash' },
      { value: 'quarry-development', label: 'Kon ochish' },
      { value: 'souvenir-factory', label: 'Suvenir ishlab chiqarish' },
    ],
  };
}

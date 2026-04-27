'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const investments = [
  {
    id: 'granit-processing',
    name: 'Granit qayta ishlash sexi',
    amount: 5000000,
    roi: 25,
    payback: 4,
    description: "Yangi granit qayta ishlash sexini qurish va jihozlash.",
  },
  {
    id: 'marble-processing',
    name: 'Marmar qayta ishlash sexi',
    amount: 4000000,
    roi: 22,
    payback: 5,
    description: "Zamonaviy marmar qayta ishlash liniyasini qurish.",
  },
  {
    id: 'quarry-development',
    name: 'Kon ochish',
    amount: 8000000,
    roi: 30,
    payback: 3,
    description: "Yangi marmar konini rivojlantirish va qazib olish uskunalarini sotib olish.",
  },
  {
    id: 'souvenir-factory',
    name: 'Suvenir fabrikasi',
    amount: 1500000,
    roi: 30,
    payback: 3,
    description: "Hunarmandchilik buyumlari va suvenirlar ishlab chiqarish fabrikasi.",
  },
];

export default function InvestmentPage() {
  const [amount, setAmount] = React.useState(5000000);
  const [sector, setSector] = React.useState('marble-processing');
  const [period, setPeriod] = React.useState(5);
  const [results, setResults] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const sectors = [
    { value: 'granite-processing', label: 'Granit qayta ishlash' },
    { value: 'marble-processing', label: 'Marmar qayta ishlash' },
    { value: 'quarry-development', label: 'Kon ochish' },
    { value: 'souvenir-factory', label: 'Suvenir ishlab chiqarish' },
  ];

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  React.useEffect(() => {
    async function calculate() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/investments/calculate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, project_type: sector, period }),
        });
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.log('Backend not available, using fallback data');
      } finally {
        setLoading(false);
      }
    }
    calculate();
  }, [amount, sector, period, API_URL]);

  const ROI_DATA: Record<string, { roi: number; payback: number }> = {
    'granite-processing': { roi: 25, payback: 4 },
    'marble-processing': { roi: 22, payback: 5 },
    'quarry-development': { roi: 30, payback: 3 },
    'souvenir-factory': { roi: 30, payback: 3 },
  };

  const getFallbackData = () => {
    const sectorData = ROI_DATA[sector] || ROI_DATA['marble-processing'];
    const annualAmount = amount * (sectorData.roi / 100);
    return {
      annual_return_percent: sectorData.roi,
      payback_years: sectorData.payback,
      annual_return_amount: annualAmount,
      total_return: annualAmount * period,
      scenarios: {
        optimistic: { roi: sectorData.roi + 7 },
        realistic: { roi: sectorData.roi },
        pessimistic: { roi: sectorData.roi - 7 },
      }
    };
  };

  const selectedData = results || getFallbackData();

  const annualReturn = results?.annual_return_amount || selectedData.annual_return_amount;
  const totalReturn = results?.total_return || selectedData.total_return;

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Investitsiya Imkoniyatlari</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            G&apos;ozg&apos;onga investitsiya qilish uchun eng qulay imkoniyatlar va loyihalar
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card hover>
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">EIZ Maqomi</h3>
              <p className="text-gray-400 text-sm">Erkin iqtisodiy zona rezidenti bo&apos;lish imkoniyati</p>
            </CardContent>
          </Card>
          <Card hover>
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Soliq Imtiyozlari</h3>
              <p className="text-gray-400 text-sm">Foyda solig&apos;i va bojxona to&apos;lovlaridan ozod qilish</p>
            </CardContent>
          </Card>
          <Card hover>
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLineJoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Yuqori ROI</h3>
              <p className="text-gray-400 text-sm">20-30% yillik daromadlilik va tezkor qoplash muddati</p>
            </CardContent>
          </Card>
        </div>

        {/* Investment Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Tayyor Investitsiya Loyihalari</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {investments.map((project) => (
              <Card key={project.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{project.name}</h3>
                    <span className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">
                      {project.roi}% ROI
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <div className="text-lg font-bold text-accent">${(project.amount / 1000000).toFixed(1)}M</div>
                      <div className="text-gray-500 text-xs">Investitsiya</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">{project.roi}%</div>
                      <div className="text-gray-500 text-xs">ROI</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-accent">{project.payback} yil</div>
                      <div className="text-gray-500 text-xs">Qoplash muddati</div>
                    </div>
                  </div>
                  <Link href={`/investment/${project.id}`}>
                    <Button className="w-full">Batafsil →</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Calculator */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Interaktiv Investitsiya Kalkulyatori</h2>
          <div className="bg-secondary/30 border border-accent/10 rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-6">Parametrlarni kiriting</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Investitsiya miqdori (USD)</label>
                    <input
                      type="range"
                      min="500000"
                      max="20000000"
                      value={amount}
                      step="500000"
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">$500K</span>
                      <span className="text-accent font-bold text-lg">${amount.toLocaleString()}</span>
                      <span className="text-gray-500">$20M</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Investitsiya sohasi</label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="input-field"
                    >
                      {sectors.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Investitsiya muddati (yil)</label>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={period}
                      onChange={(e) => setPeriod(Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">1 yil</span>
                      <span className="text-accent font-bold">{period} yil</span>
                      <span className="text-gray-500">15 yil</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-6">Natijalar</h3>
                <div className="space-y-4">
                  <div className="bg-dark/50 rounded-xl p-6 border border-accent/10">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Kutilayotgan ROI</div>
                        <div className="text-2xl font-bold text-green-400">{results?.annual_return_percent?.toFixed(0) || 22}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Qoplash muddati</div>
                        <div className="text-2xl font-bold text-accent">{results?.payback_years || 5} yil</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Yillik daromad</div>
                        <div className="text-2xl font-bold text-accent">${annualReturn.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Jami daromad</div>
                        <div className="text-2xl font-bold text-green-400">${totalReturn.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark/50 rounded-xl p-6 border border-accent/10">
                    <div className="text-gray-400 text-sm mb-4">Ssenariylar bo&apos;yicha taqqoslash</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-sm">😊 Optimistik</span>
                        <span className="text-green-400 font-bold">{results?.scenarios?.optimistic?.roi || 29}% ROI</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-accent text-sm">📊 Realistik</span>
                        <span className="text-accent font-bold">{results?.scenarios?.realistic?.roi || 22}% ROI</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-400 text-sm">😟 Pessimistik</span>
                        <span className="text-red-400 font-bold">{results?.scenarios?.pessimistic?.roi || 15}% ROI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
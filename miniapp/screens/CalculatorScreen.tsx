'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { LeadModal } from '@/components/leads/LeadModal';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { ErrorState, LoadingState } from '@/components/ui/ScreenState';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import { formatCurrencyCompact } from '@/lib/utils';
import { fetchCalculatorProjects, type CalculatorProjectOption } from '@/services/projects';

const minAmount = 100000;
const maxAmount = 5000000;

export function CalculatorScreen() {
  useTelegramWebApp();
  const [options, setOptions] = useState<CalculatorProjectOption[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [amount, setAmount] = useState(1000000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leadOpen, setLeadOpen] = useState(false);

  async function loadOptions() {
    setLoading(true);
    setError(null);

    try {
      const projectOptions = await fetchCalculatorProjects();
      setOptions(projectOptions);
      setSelectedId((current) => current || projectOptions[0]?.id || '');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Kalkulyator maʼlumotlari yuklanmadi.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadOptions();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const selected = options.find((option) => option.id === selectedId) ?? options[0];
  const roi = selected?.expected_return ?? 0;
  const annualProfit = Math.round(amount * (roi / 100));
  const payback = selected?.payback_years ?? 0;
  const chartData = useMemo(() => [
    { name: 'Optimistik', value: roi + 4, color: '#0E7A3B' },
    { name: "O'rtacha", value: roi, color: '#C9A84C' },
    { name: 'Pessimistik', value: Math.max(1, roi - 6), color: '#9E2F2F' },
  ], [roi]);

  return (
    <div className="screen-shell">
      {loading ? (
        <section>
          <LoadingState title="Kalkulyator yuklanmoqda..." />
        </section>
      ) : error ? (
        <section>
          <ErrorState message={error} onRetry={() => void loadOptions()} />
        </section>
      ) : selected ? (
        <>
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[16px] border border-white/10 bg-card p-4 shadow-premium"
          >
            <label className="block">
              <span className="text-[13px] text-muted">Investitsiya summasi</span>
              <span className="mt-2 block text-[25px] font-extrabold text-copy">
                ${amount.toLocaleString('en-US')}
              </span>
              <input
                value={amount}
                min={minAmount}
                max={maxAmount}
                step={50000}
                type="range"
                onChange={(event) => setAmount(Number(event.target.value))}
                className="mt-4 w-full accent-gold"
              />
            </label>
            <div className="mt-1 flex items-center justify-between text-[11px] font-semibold text-muted">
              <span>$100K</span>
              <span>$5M</span>
            </div>

            <label className="mt-4 block">
              <span className="text-[13px] text-muted">Loyiha turi</span>
              <div className="relative mt-2">
                <select
                  value={selected.id}
                  onChange={(event) => setSelectedId(event.target.value)}
                  className="h-[48px] w-full appearance-none rounded-[12px] border border-white/10 bg-white/[0.03] px-4 pr-10 text-[14px] font-medium text-copy outline-none"
                >
                  {options.map((option) => (
                    <option key={option.id} value={option.id} className="bg-[#0B0F1A]">
                      {option.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              </div>
            </label>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="mt-4 rounded-[16px] border border-white/10 bg-card p-4 shadow-premium"
          >
            <h2 className="text-[14px] font-extrabold text-copy">Natija (o&apos;rtacha ssenariy)</h2>
            <div className="mt-5 grid grid-cols-[132px_1fr] items-center gap-4">
              <div className="relative grid h-[118px] w-[118px] place-items-center rounded-full bg-[conic-gradient(#C9A84C_calc(var(--value)*1%),rgba(201,168,76,0.16)_0)]" style={{ '--value': roi } as React.CSSProperties}>
                <div className="grid h-[86px] w-[86px] place-items-center rounded-full bg-card">
                  <div className="text-center">
                    <p className="text-[26px] font-extrabold text-copy">{roi}%</p>
                    <p className="text-[11px] text-muted">Yillik ROI</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Metric label="Yillik daromad" value={`$${annualProfit.toLocaleString('en-US')}`} />
                <Metric label="Payback muddati" value={`${payback} yil`} />
              </div>
            </div>
            <div className="mt-5 border-t border-white/10 pt-4">
              <h3 className="text-[13px] font-extrabold text-copy">Ssenariy bo&apos;yicha natijalar</h3>
              <div className="mt-3 h-[116px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 12, right: 4, left: -28, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 11 }} />
                    <YAxis hide domain={[0, 'dataMax + 8']} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={54}>
                      {chartData.map((item) => (
                        <Cell key={item.name} fill={item.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <PremiumButton
                onClick={() => setLeadOpen(true)}
                variant="outline"
                trailingIcon={Download}
                className="mt-3"
              >
                Batafsil tahlilni olish
              </PremiumButton>
            </div>
          </motion.section>
          <p className="mt-3 text-center text-[11px] text-muted">
            Hisob-kitob {selected.title} loyihasining Supabase ROI maʼlumotlari asosida.
          </p>
          <LeadModal
            open={leadOpen}
            onClose={() => setLeadOpen(false)}
            projectId={selected.id}
            projectTitle={`${selected.title} - ${formatCurrencyCompact(amount)} tahlil`}
            intent="invest"
          />
        </>
      ) : null}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[13px] text-muted">{label}</p>
      <p className="mt-1 text-[18px] font-extrabold text-copy">{value}</p>
    </div>
  );
}

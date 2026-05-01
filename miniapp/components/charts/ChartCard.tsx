'use client';

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ChartPoint {
  year: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  data: ChartPoint[];
}

export function ChartCard({ title, data }: ChartCardProps) {
  return (
    <section className="rounded-[20px] border border-white/10 bg-card p-4">
      <h2 className="text-[16px] font-semibold text-copy">{title}</h2>
      <div className="mt-4 h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: '#98A2B3', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#98A2B3', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip
              contentStyle={{
                background: '#111827',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14,
                color: '#F6F7FB',
              }}
            />
            <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={3} dot={{ r: 4, fill: '#D4AF37' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
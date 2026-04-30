'use client';

import * as React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const interests = [
  'Investitsiya loyihasi',
  'Mahsulot xaridi',
  'Bulk narx',
  'Hamkorlik',
  'Eksport',
];

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
  defaultInterest?: string;
  className?: string;
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  interest: 'Investitsiya loyihasi',
  message: '',
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function LeadForm({
  title = 'Investor bilan bog‘lanish',
  subtitle = 'Kontakt ma’lumotlaringizni qoldiring. Jamoa siz bilan loyiha tafsilotlarini aniqlashtiradi.',
  compact = false,
  defaultInterest,
  className,
}: LeadFormProps) {
  const [form, setForm] = React.useState<FormState>({
    ...initialState,
    interest: defaultInterest || initialState.interest,
  });
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success'>('idle');

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.name.trim().length < 2) {
      setError('Ism kamida 2 ta belgidan iborat bo‘lishi kerak.');
      return;
    }

    if (!isEmail(form.email.trim())) {
      setError('To‘g‘ri email manzil kiriting.');
      return;
    }

    if (form.phone.replace(/\D/g, '').length < 9) {
      setError('Telefon raqamini to‘liq kiriting.');
      return;
    }

    if (form.message.trim().length < 10) {
      setError('Xabaringizni qisqacha yozing.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setStatus('idle');
        setError('So‘rov yuborilmadi. Iltimos, qayta urinib ko‘ring.');
        return;
      }
    } catch {
      setStatus('idle');
      setError('So‘rov yuborilmadi. Iltimos, qayta urinib ko‘ring.');
      return;
    }

    setStatus('success');
    setForm({ ...initialState, interest: defaultInterest || initialState.interest });
  };

  if (status === 'success') {
    return (
      <div className={cn('glass-card rounded-2xl p-6 sm:p-8', className)}>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-2xl font-bold tracking-tight text-copy">So‘rov qabul qilindi</h3>
        <p className="mt-3 text-sm leading-6 text-muted">Jamoa siz bilan bog‘lanib, loyiha, mahsulot yoki hamkorlik tafsilotlarini aniqlashtiradi.</p>
        <Button className="mt-6" variant="outline" onClick={() => setStatus('idle')}>
          Yangi so‘rov yuborish
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn('glass-card rounded-2xl p-6 sm:p-8', className)}>
      <div className="mb-6">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">Investor inquiry</div>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-copy">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{subtitle}</p>
      </div>

      <div className={cn('grid gap-4', compact ? 'md:grid-cols-2' : '')}>
        <input className="input-field" placeholder="Ism" value={form.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" />
        <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} autoComplete="email" />
        <input className="input-field" placeholder="Telefon" value={form.phone} onChange={(event) => update('phone', event.target.value)} autoComplete="tel" />
        <select className="input-field" value={form.interest} onChange={(event) => update('interest', event.target.value)}>
          {interests.map((interest) => (
            <option key={interest} value={interest}>{interest}</option>
          ))}
        </select>
        <textarea
          className={cn('input-field min-h-32 resize-none', compact ? 'md:col-span-2' : '')}
          placeholder="Qiziqish, hajm yoki loyiha tafsilotlari"
          value={form.message}
          onChange={(event) => update('message', event.target.value)}
          maxLength={1000}
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

      <Button type="submit" className="mt-5 w-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        So‘rov yuborish
      </Button>
    </form>
  );
}

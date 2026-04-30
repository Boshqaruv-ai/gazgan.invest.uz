'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { LeadForm } from './LeadForm';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  showForm?: boolean;
}

export function CTASection({
  title = 'Investitsiya loyihasini muhokama qiling',
  subtitle = 'Mahsulot, kon yoki ishlab chiqarish yo‘nalishi bo‘yicha real talabingizni yuboring.',
  showForm = true,
}: CTASectionProps) {
  return (
    <section id="lead" className="section-shell py-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass-card rounded-2xl p-8 sm:p-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
            <ShieldCheck className="h-4 w-4" />
            Investor-ready platform
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-copy md:text-4xl">{title}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted">{subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/investment">
              <Button size="lg" className="w-full sm:w-auto">
                Loyihalarni ko‘rish
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Mahsulot katalogi
              </Button>
            </Link>
          </div>
        </motion.div>

        {showForm && <LeadForm compact />}
      </div>
    </section>
  );
}

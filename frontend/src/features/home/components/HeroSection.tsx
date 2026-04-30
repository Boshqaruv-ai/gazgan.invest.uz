'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Factory, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const heroImage = 'https://images.unsplash.com/photo-1573156667488-5c0cec674762?auto=format&fit=crop&w=2200&q=85';

const trustBadges = [
  { icon: ShieldCheck, label: '20+ yil tajriba' },
  { icon: MapPin, label: '6 ta faol kon' },
  { icon: Factory, label: '2M+ m² ishlab chiqarish' },
  { icon: Building2, label: 'Navoiy logistika markazi' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-24">
      <Image
        src={heroImage}
        alt="Gozgon marble and granite quarry"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,15,26,0.96)_0%,rgba(11,15,26,0.78)_46%,rgba(11,15,26,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(245,192,68,0.22),transparent_34%),linear-gradient(180deg,transparent_58%,#0B0F1A_100%)]" />

      <div className="section-shell relative z-10 flex min-h-[calc(92vh-6rem)] items-center py-16">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            Premium marble & granite investment platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-5xl font-bold tracking-tight text-copy md:text-6xl"
          >
            O‘zbekistonning marmar va granit investitsiya loyihalari
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-muted"
          >
            Tayyor konlar, ishlab chiqarish va ROI ssenariylari — investorlar uchun.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/investment">
              <Button size="lg" className="w-full sm:w-auto">
                Investitsiya loyihalarini ko‘rish
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#lead">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Investor bilan bog‘lanish
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {trustBadges.map((badge) => (
              <div key={badge.label} className="glass-card rounded-2xl p-4">
                <badge.icon className="mb-3 h-5 w-5 text-accent" />
                <div className="text-sm font-semibold text-copy">{badge.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

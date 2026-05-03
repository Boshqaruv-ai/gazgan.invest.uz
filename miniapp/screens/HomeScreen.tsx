'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Boxes,
  BriefcaseBusiness,
  ChevronRight,
  Clock3,
  Coins,
  Diamond,
  Grid2X2,
  Landmark,
  MapPin,
  PieChart,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { useAppTelegramUser } from '@/components/layout/TelegramUserProvider';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';
import { useProjects } from '@/hooks/useProjects';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import { formatProductPrice, productCategoryLabel, type FeaturedProduct } from '@/lib/products';
import { formatCurrencyCompact } from '@/lib/utils';

const heroImage = 'https://images.unsplash.com/photo-1573156667488-5c0cec674762?auto=format&fit=crop&w=1100&q=85';

export function HomeScreen() {
  useTelegramWebApp();
  const { user } = useAppTelegramUser();
  const { stats } = useProjects();
  const { products } = useFeaturedProducts();

  const statCards = [
    { label: 'Faol loyihalar', value: String(stats?.activeProjects ?? 12), detail: 'ta loyiha', icon: BriefcaseBusiness },
    { label: 'Indikativ ROI', value: stats?.roiRange ?? '22-30%', detail: 'yillik ssenariy', icon: PieChart },
    { label: 'Payback muddati', value: stats?.paybackRange ?? '3-5 yil', detail: "o'rtacha", icon: Clock3 },
    { label: 'Jami investitsiya', value: formatCurrencyCompact(stats?.totalInvestment || 25400000), detail: 'jalb qilingan', icon: Coins },
  ];

  return (
    <div className="screen-shell px-0 pt-3">
      <section className="px-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative min-h-[280px] overflow-hidden rounded-[22px] border border-white/10 bg-card shadow-premium"
        >
          <Image
            src={heroImage}
            alt="G'ozg'on marmar koni"
            fill
            priority
            sizes="390px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07111A]/96 via-[#07111A]/74 to-[#07111A]/8" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07111A] via-[#07111A]/70 to-transparent" />

          <div className="relative z-10 flex min-h-[310px] flex-col justify-end p-5">
            <div className="mb-7 inline-flex w-fit max-w-full items-center gap-2 rounded-[14px] border border-white/10 bg-white/[0.12] px-3 py-2 text-[12px] font-bold text-white shadow-premium backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 shrink-0 text-gold" />
              <span className="truncate">O&apos;zbekistonning ishonchli investitsion platformasi</span>
            </div>

            <h1 className="max-w-[315px] text-[36px] font-black leading-[1.08] tracking-tight text-white">
              G&apos;ozg&apos;on - O&apos;zbekistonning marmar va granit <span className="text-gold">yuragi</span>
            </h1>
            <p className="mt-4 max-w-[285px] text-[18px] font-medium leading-[1.55] text-white/78">
              Yuqori daromadli investitsiya imkoniyatlari sizni kutmoqda
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <PremiumButton href="/projects" className="h-[58px] min-h-[58px] text-[15px]">
                Investitsiya qilish
              </PremiumButton>
              <PremiumButton href="#products" variant="outline" trailingIcon={Grid2X2} className="h-[58px] min-h-[58px] text-[15px]">
                Katalogni ko&apos;rish
              </PremiumButton>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mt-6 px-5">
        <SectionHeader title="Asosiy ko'rsatkichlar" href="/projects" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <CompactStat {...stat} />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="products" className="mt-7 px-5">
        <SectionHeader title="Mahsulotlar katalogi" href="/products" />
        {products.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-[18px] border border-white/10 bg-card p-4">
            <div className="flex items-center gap-3">
              <Boxes className="h-5 w-5 text-gold" />
              <div>
                <p className="text-[15px] font-black text-copy">Mahsulotlar tayyorlanmoqda</p>
                <p className="mt-1 text-[13px] leading-[1.45] text-muted">
                  Marmar plitalar, granit slab va suvenirlar Supabase katalogi yangilangandan keyin narxlari bilan chiqadi.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mt-5 px-5">
        <Link
          href="/chat"
          className="group flex min-h-[80px] items-center gap-3 rounded-[18px] border border-white/10 bg-card/95 p-3 shadow-premium transition duration-300 active:scale-[0.99]"
        >
          <div className="relative grid h-[56px] w-[56px] shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#FFF4B1,#C9A84C_38%,#1B1405_78%)] shadow-[0_0_24px_rgba(201,168,76,0.3)]">
            <div className="grid h-[40px] w-[40px] place-items-center rounded-full bg-[#0B0F1A]">
              <div className="relative h-[20px] w-[26px] rounded-full bg-[#111827]">
                <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[16px] font-black text-copy">AI Konsultant</h2>
            <p className="mt-1 text-[13px] leading-[1.4] text-muted line-clamp-2">
              Savollaringizga 24/7 javob beradi
            </p>
          </div>
          <span className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-gold transition group-active:scale-95">
            <ArrowRight className="h-5 w-5" />
          </span>
        </Link>
      </section>

      <section className="mt-7 px-5">
        <SectionHeader title="Nega G'ozg'on?" href="/projects" />
        <div className="mt-4 space-y-3">
          <Benefit icon={Diamond} title="Noyob sifat" text="Dunyoda noyob marmar va granit turlari" />
          <Benefit icon={Landmark} title="Shaffof imtiyozlar" text="Soliq va bojxona shartlari hujjat bilan" />
          <Benefit icon={MapPin} title="Qulay logistika" text="Yevropa va Osiyo bozorlariga yaqinlik" />
        </div>
      </section>

      {user?.first_name ? (
        <p className="mt-6 text-center text-[11px] text-muted">Telegram investor: {user.first_name}</p>
      ) : null}
    </div>
  );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-[20px] font-black tracking-tight text-copy">{title}</h2>
      <Link href={href} className="inline-flex items-center gap-1 text-[15px] font-black text-gold">
        Barchasi
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}

function CompactStat({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: LucideIcon }) {
  return (
    <article className="min-h-[100px] rounded-[16px] border border-white/10 bg-card p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="grid h-[28px] w-[28px] place-items-center rounded-[10px] bg-gold/10 text-gold">
        <Icon className="h-[14px] w-[14px]" />
      </div>
      <p className="mt-2 text-[10px] font-medium leading-[1.2] text-muted">{label}</p>
      <p className="mt-1 whitespace-nowrap text-[16px] font-black leading-none text-copy">{value}</p>
      <p className="mt-1 text-[10px] leading-[1.2] text-muted">{detail}</p>
    </article>
  );
}

function Benefit({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="flex items-start gap-3 rounded-[14px] border border-white/10 bg-card/50 p-3">
      <Icon className="h-6 w-6 shrink-0 text-gold" />
      <div>
        <h3 className="text-[14px] font-black leading-[1.2] text-copy">{title}</h3>
        <p className="mt-1 text-[12px] leading-[1.4] text-muted">{text}</p>
      </div>
    </article>
  );
}

function ProductCard({ product }: { product: FeaturedProduct }) {
  const [imgError, setImgError] = React.useState(false);
  
  return (
    <Link href="/products" className="block overflow-hidden rounded-[18px] border border-white/10 bg-card shadow-premium">
      <div className="relative h-[90px]">
        {!imgError ? (
          <Image 
            src={product.image} 
            alt={product.title} 
            fill 
            sizes="200px" 
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-card flex items-center justify-center">
            <Boxes className="h-8 w-8 text-muted" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/82 via-transparent to-transparent" />
        <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[9px] font-black text-[#0B0F1A]">
          {productCategoryLabel(product.category)}
        </span>
      </div>
      <div className="p-2.5">
        <h3 className="line-clamp-2 text-[12px] font-black leading-[1.25] text-copy">{product.title}</h3>
        <p className="mt-1 text-[13px] font-black text-gold">{formatProductPrice(product)}</p>
      </div>
    </Link>
  );
}

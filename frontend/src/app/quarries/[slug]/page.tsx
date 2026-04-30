'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { quarries, colors } from '@/lib/quarries';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function QuarryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const quarry = quarries.find((item) => item.slug === slug);

  if (!quarry) {
    return (
      <div className="min-h-screen pt-24 pb-20 hero-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Kon topilmadi</h1>
          <Link href="/quarries">
            <Button>Orqaga qaytish</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/quarries" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent mb-6">
          <span aria-hidden="true">&lt;</span>
          Konlar ro&apos;yxatiga qaytish
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="relative rounded-2xl h-[350px] lg:h-[450px] bg-dark overflow-hidden">
              <Image
                src={quarry.image}
                alt={quarry.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-accent text-primary text-sm font-bold px-3 py-1 rounded-full">
                {quarry.type}
              </span>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${colors[quarry.color]}`}>
                {quarry.color}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{quarry.name}</h1>
            <p className="text-gray-400 text-lg mb-6">{quarry.description}</p>
            <p className="text-gray-300 mb-8">{quarry.fullDescription}</p>

            <Card className="bg-secondary/30 border-accent/10 mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-accent">{quarry.reserves}</div>
                    <div className="text-gray-500 text-sm mt-1">Indikativ zaxira</div>
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-white">{quarry.density}</div>
                    <div className="text-gray-500 text-sm mt-1">Zichlik</div>
                  </div>
                  <div>
                    <div className="text-lg lg:text-xl font-bold text-white">{quarry.location.split(', ')[1] || quarry.location}</div>
                    <div className="text-gray-500 text-sm mt-1">Joylashuv</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Xususiyatlar</h3>
              <div className="flex flex-wrap gap-2">
                {quarry.features.map((feature) => (
                  <span key={feature} className="bg-secondary/50 text-gray-300 text-sm px-3 py-2 rounded-lg">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Qo&apos;llanilishi</h3>
              <div className="flex flex-wrap gap-2">
                {quarry.uses.map((use) => (
                  <span key={use} className="bg-accent/10 text-accent text-sm px-3 py-2 rounded-lg">
                    {use}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/about#contact" className="flex-1">
                <Button size="lg" className="w-full">Aloqa qilish -&gt;</Button>
              </Link>
              <Link href="/products" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">Mahsulotlarni ko&apos;rish -&gt;</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

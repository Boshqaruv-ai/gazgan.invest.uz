'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const categoryColors: Record<string, string> = {
  Marmar: 'bg-blue-500',
  Granit: 'bg-red-500',
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-20 hero-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Mahsulot topilmadi</h1>
          <Link href="/products">
            <Button>Orqaga qaytish</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent mb-6">
          <span aria-hidden="true">&lt;</span>
          Mahsulotlar ro&apos;yxatiga qaytish
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="relative rounded-2xl h-[350px] lg:h-[450px] bg-dark overflow-hidden">
              <Image
                src={product.image}
                alt={product.imageAlt}
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
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${categoryColors[product.category]} text-white`}>
                {product.category}
              </span>
              <span className="text-sm text-gray-400">{product.color}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-gray-400 text-lg mb-6">{product.description}</p>

            <Card className="bg-secondary/30 border-accent/10 mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-xl lg:text-2xl font-bold text-white">{product.size}</div>
                    <div className="text-gray-500 text-sm mt-1">O&apos;lcham</div>
                  </div>
                  <div>
                    <div className="text-xl lg:text-2xl font-bold text-white">{product.finish}</div>
                    <div className="text-gray-500 text-sm mt-1">Ishlov</div>
                  </div>
                  <div>
                    <div className="text-xl lg:text-2xl font-bold text-accent">~${product.price}</div>
                    <div className="text-gray-500 text-sm mt-1">Taxm. narx/{product.priceUnit}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Xususiyatlar</h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span key={feature} className="bg-secondary/50 text-gray-300 text-sm px-3 py-2 rounded-lg">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/about#contact" className="flex-1">
                <Button size="lg" className="w-full">Buyurtma so&apos;rovi -&gt;</Button>
              </Link>
              <Link href="/quarries" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">Konni ko&apos;rish -&gt;</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

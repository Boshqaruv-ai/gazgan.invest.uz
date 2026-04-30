import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="border border-accent/20 rounded-2xl p-12 bg-secondary/30">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Investitsiya qilishga tayyormisiz?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">MVP bosqichida so&apos;rovlar kontakt formasi orqali qabul qilinadi va keyin qo&apos;lda ko&apos;rib chiqiladi.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/investment">
              <Button size="lg">Loyihalarni ko&apos;rish</Button>
            </Link>
            <Link href="/about#contact">
              <Button variant="outline" size="lg">Bog&apos;lanish</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

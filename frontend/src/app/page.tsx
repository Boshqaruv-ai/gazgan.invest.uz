import { HeroSection } from '@/features/home/components/HeroSection';
import { StatsSection } from '@/features/home/components/StatsSection';
import { AdvantagesSection } from '@/features/home/components/AdvantagesSection';
import { MapSection } from '@/features/home/components/MapSection';
import { CTASection } from '@/features/home/components/CTASection';
import { getPrimaryHeroImage } from '@/lib/server/hero';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const heroImage = await getPrimaryHeroImage();

  return (
    <main className="bg-dark">
      <HeroSection heroImageUrl={heroImage?.image_url} heroImageAlt={heroImage?.title} />
      <StatsSection />
      <AdvantagesSection />
      <MapSection />
      <CTASection />
    </main>
  );
}

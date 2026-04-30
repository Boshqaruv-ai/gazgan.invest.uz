import { HeroSection } from '@/features/home/components/HeroSection';
import { StatsSection } from '@/features/home/components/StatsSection';
import { AdvantagesSection } from '@/features/home/components/AdvantagesSection';
import { MapSection } from '@/features/home/components/MapSection';
import { CTASection } from '@/features/home/components/CTASection';

export default function HomePage() {
  return (
    <main className="bg-dark">
      <HeroSection />
      <StatsSection />
      <AdvantagesSection />
      <MapSection />
      <CTASection />
    </main>
  );
}

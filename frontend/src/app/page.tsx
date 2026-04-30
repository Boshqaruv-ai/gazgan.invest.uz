import { HeroSection } from '@/features/home/components/HeroSection';
import { StatsSection } from '@/features/home/components/StatsSection';
import { AdvantagesSection } from '@/features/home/components/AdvantagesSection';
import { MapSection } from '@/features/home/components/MapSection';
import { CTASection } from '@/features/home/components/CTASection';

export default function HomePage() {
  return (
    <div className="stone-pattern pb-40">
      <HeroSection />
      <StatsSection />
      <AdvantagesSection />
      <MapSection />
      <CTASection />
    </div>
  );
}
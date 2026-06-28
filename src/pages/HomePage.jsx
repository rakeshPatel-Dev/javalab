import { useMemo } from 'react';
import { getUnits, getGlobalStats } from '../utils/dataHelper';
import { useTracking } from '../hooks/useTracking';
import { SEO } from '../components/common/SEO';

// Section components
import Hero from '../components/sections/home/Hero';
import StatsGrid from '../components/sections/home/StatsGrid';
import FeaturedUnits from '../components/sections/home/FeaturedUnits';
import CTABento from '../components/sections/home/CTABento';
import Features from '../components/sections/home/Features';

export default function HomePage() {
  const units = useMemo(() => getUnits(), []);
  const stats = useMemo(() => getGlobalStats(), []);
  const { getOverallProgress, getUnitProgress } = useTracking();
  const overallProgress = getOverallProgress();

  const featuredUnits = units.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <div aria-hidden="true" className="hero-grid" />

      {/* 1. Hero — full-width centered, mesh-gradient */}
      <Hero stats={stats} overallProgress={overallProgress} />

      {/* 2. Stats Bar — simple text stats on white bg with border-y */}
      <StatsGrid stats={stats} />

      {/* 3. Curriculum Units Grid — section heading + 3-col unit card grid */}
      <FeaturedUnits featuredUnits={featuredUnits} getUnitProgress={getUnitProgress} />

      {/* 6. Features — premium features section */}
      <Features />

       {/* 5. CTA Bento — dark wide panel + blue community panel (from design) */}
      <CTABento />

    </div>
  );
}

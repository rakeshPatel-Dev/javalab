import  { useMemo } from 'react';
import { getUnits, getGlobalStats } from '../utils/dataHelper';
import { useTracking } from '../hooks/useTracking';

// Import section components
import Hero from '../components/sections/home/Hero';

import Difficulty from '../components/sections/home/Difficulty';
import FeaturedUnits from '../components/sections/home/FeaturedUnits';
import Features from '../components/sections/home/Features';
import QuickAccess from '../components/sections/home/QuickAccess';
import StatsGrid from '../components/sections/home/StatsGrid';

export default function HomePage() {
  const units = useMemo(() => getUnits(), []);
  const stats = useMemo(() => getGlobalStats(), []);
  const { getOverallProgress, getUnitProgress } = useTracking();
  const overallProgress = getOverallProgress();

  const featuredUnits = units.slice(0, 3);

  return (
    <div className="min-h-screen max-w-6xl mx-auto bg-background">
       {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      <Hero 
        stats={stats}
        overallProgress={overallProgress}
      />
      
      <StatsGrid stats={stats} />
      
      <Difficulty stats={stats} />
      
      <FeaturedUnits 
        featuredUnits={featuredUnits}
        getUnitProgress={getUnitProgress}
      />
      
      <Features />
      
      <QuickAccess />
    </div>
  );
}
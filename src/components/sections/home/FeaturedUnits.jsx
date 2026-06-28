import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import UnitCard from '../../units/UnitCard';

export default function FeaturedUnits({ featuredUnits, getUnitProgress }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Curriculum Units
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Structured learning path from fundamentals to mastery.
            </p>
          </div>
          <Link
            to="/units"
            className="hidden sm:flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-200 group"
          >
            View Roadmap
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Unit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredUnits.map((unit, i) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="h-full"
            >
              <UnitCard unit={unit} progress={getUnitProgress(unit.id)} />
            </motion.div>
          ))}
        </div>

        {/* Mobile view-all link */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            to="/units"
            className="flex items-center gap-2 text-primary font-bold text-sm border border-primary/20 px-5 py-2.5 rounded-xl hover:bg-primary/5 transition-all"
          >
            View All Units
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
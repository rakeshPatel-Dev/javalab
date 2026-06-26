import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Diamond, ArrowRight } from 'lucide-react';
import UnitCard from '../../units/UnitCard';

export default function FeaturedUnits({ featuredUnits, getUnitProgress }) {
  return (
    <section className="py-16 bg-background">
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Diamond className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">
                Featured Content
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Core Units
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Curated learning paths for optimal progress
            </p>
          </div>
          <Link
            to="/units"
            className="group flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
          >
            <span className="text-sm font-medium text-foreground">View All</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredUnits.map((unit, i) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group"
            >
              <UnitCard unit={unit} progress={getUnitProgress(unit.id)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
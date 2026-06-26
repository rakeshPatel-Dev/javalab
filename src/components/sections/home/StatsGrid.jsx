import { motion } from 'framer-motion';
import { Layers, BookOpen, HelpCircle, Users } from 'lucide-react';

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }
});

const StatCard = ({ icon: Icon, value, label, color, trend }) => (
  <motion.div
    {...scaleIn(0.05)}
    className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300"
  >
    <div className="flex items-start justify-between">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-5 h-5" />
      </div>
      {trend && (
        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
          ↑ {trend}%
        </span>
      )}
    </div>
    <div className="mt-4">
      <span className="text-2xl font-bold text-card-foreground tracking-tight">{value}</span>
      <p className="text-sm text-muted-foreground mt-0.5 font-medium">{label}</p>
    </div>
  </motion.div>
);

export default function StatsGrid({ stats }) {
  return (
    <section className="relative -mt-8 z-10 px-4">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={Layers} 
            value={stats.totalUnits} 
            label="Units" 
            color="bg-blue-500/10 text-blue-500"
            trend={12}
          />
          <StatCard 
            icon={BookOpen} 
            value={stats.totalTopics} 
            label="Topics" 
            color="bg-cyan-500/10 text-cyan-500"
            trend={8}
          />
          <StatCard 
            icon={HelpCircle} 
            value={stats.totalQuestions} 
            label="Questions" 
            color="bg-emerald-500/10 text-emerald-500"
            trend={23}
          />
          <StatCard 
            icon={Users} 
            value="1.2k" 
            label="Active Students" 
            color="bg-amber-500/10 text-amber-500"
            trend={15}
          />
        </div>
      </div>
    </section>
  );
}
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bookmark, BarChart3, ArrowRight } from 'lucide-react';

export default function QuickAccess() {
  const links = [
    {
      to: '/search',
      icon: Search,
      label: 'Search Questions',
      desc: 'Find any question instantly',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      to: '/bookmarks',
      icon: Bookmark,
      label: 'My Bookmarks',
      desc: 'Review saved questions',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      to: '/units',
      icon: BarChart3,
      label: 'All Units',
      desc: 'Complete curriculum overview',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em]">
            Quick Navigation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {links.map(({ to, icon: Icon, label, desc, color }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                to={to}
                className="group flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color} group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
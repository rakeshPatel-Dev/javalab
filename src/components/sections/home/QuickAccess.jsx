import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Search, Bookmark, BarChart3, ArrowRight } from 'lucide-react';

export default function QuickAccess() {
  const links = [
    { 
      to: '/search', 
      icon: Search, 
      label: 'Search Questions',
      desc: 'Find any question instantly',
      color: 'bg-blue-500/10 text-blue-500'
    },
    { 
      to: '/bookmarks', 
      icon: Bookmark, 
      label: 'My Bookmarks',
      desc: 'Review saved questions',
      color: 'bg-amber-500/10 text-amber-500'
    },
    { 
      to: '/units', 
      icon: BarChart3, 
      label: 'All Units',
      desc: 'Complete curriculum overview',
      color: 'bg-emerald-500/10 text-emerald-500'
    }
  ];

  return (
    <section className="py-12 bg-muted/10">
      <div className="container">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em]">
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
                className="group flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
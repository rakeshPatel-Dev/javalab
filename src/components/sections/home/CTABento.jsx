import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Users, SearchCheck, AlarmClock } from 'lucide-react';

export default function CTABento() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Dark wide CTA Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 bg-foreground dark:bg-card rounded-2xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-center min-h-70 border border-border"
          >
            {/* Decorative background blobs */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-8 bottom-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-3 py-1 rounded-full">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
                  Trust Yourself
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-background dark:text-foreground mb-3 leading-snug max-w-md">
                Ready to accelerate your learning?
              </h3>
              <p className="text-background/60 dark:text-muted-foreground max-w-lg mb-7 text-sm leading-relaxed">
                Explore the complete Java OOP syllabus with structured questions, coding exercises, and exam-focused practice—all in one place.
              </p>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:brightness-105 shadow-lg shadow-primary/30 transition-all"
              >
                Search for topic
                <SearchCheck className="w-4 h-4 text-primary-foreground" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Community Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 bg-linear-to-br from-primary to-primary/70 rounded-2xl p-8 flex flex-col justify-center items-center text-center text-primary-foreground min-h-70"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted-foreground/40 flex items-center justify-center mb-5">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h4 className="text-xl font-black mb-2">Join the Community</h4>
            <p className="text-primary-foreground/70 text-sm mb-6 leading-relaxed">
              Discord, study groups, and community forums.
            </p>
            <button className="w-full py-3 bg-muted-foreground/30 hover:bg-muted-foreground/40 border border-border/20 rounded-xl transition-all font-bold text-sm cursor-pointer">
            <AlarmClock className="w-4 h-4 text-primary-foreground inline-block mr-2" />
              Comming Soon
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

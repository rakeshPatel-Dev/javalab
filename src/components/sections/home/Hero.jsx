import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Crown, Sparkles, Rocket, Search, 
  Database, Target, Clock,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }
});

export default function Hero({ stats, overallProgress }) {
  const completionRate = Math.round((overallProgress.completed / overallProgress.total) * 100);

  return (
    <section className="relative overflow-hidden pt-28 pb-24">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {/* <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.08)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,130,246,0.05)_0%,_transparent_70%)]" /> */}
        
       

      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Crown className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary/95 uppercase tracking-[0.15em]">
                BCA 2nd Semester · Premium
              </span>
              <Sparkles className="w-3 h-3 text-primary" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
              Master
              <span className="block text-transparent bg-clip-text bg-linear-to-r italic from-blue-400 via-cyan-400 to-blue-400 mt-2">
                Java OOP
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-lg">
              Comprehensive question bank with intelligent study tools, 
              progress tracking, and personalized learning paths.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/units"
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
              >
                <span className="flex items-center gap-2">
                  Start Learning
                  <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/search"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-slate-200 font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Questions
                </span>
              </Link>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: Database, label: '260+ Questions' },
                { icon: Target, label: '9 Units' },
                { icon: Clock, label: 'Smart Review' }
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-slate-400 text-sm">
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Premium stats grid */}
          <motion.div {...scaleIn(0.1)} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-white">{stats.totalUnits}</div>
                <div className="text-sm text-slate-400 mt-1">Units</div>
                <div className="mt-3 h-1 w-12 bg-blue-500 rounded-full" />
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-white">{stats.totalQuestions}</div>
                <div className="text-sm text-slate-400 mt-1">Questions</div>
                <div className="mt-3 h-1 w-12 bg-cyan-500 rounded-full" />
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-white">{stats.totalTopics}</div>
                <div className="text-sm text-slate-400 mt-1">Topics</div>
                <div className="mt-3 h-1 w-12 bg-emerald-500 rounded-full" />
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-white">1.2k</div>
                <div className="text-sm text-slate-400 mt-1">Students</div>
                <div className="mt-3 h-1 w-12 bg-amber-500 rounded-full" />
              </div>
            </div>

            {/* Progress ring */}
            {overallProgress.completed > 0 && (
              <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="white"
                        strokeWidth="4"
                        fill="none"
                        opacity="0.1"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="url(#progress)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={175.93}
                        strokeDashoffset={175.93 * (1 - completionRate / 100)}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="progress" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{completionRate}%</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Learning Progress</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {overallProgress.completed} of {overallProgress.total} mastered
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
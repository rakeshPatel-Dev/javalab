import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, BookOpen } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }
});

const float = (delay = 0, distance = 12, duration = 5) => ({
  initial: { y: 0 },
  animate: {
    y: [0, -distance, 0],
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
});

const DistributionCard = ({ label, value, total, color, ringColor, delay, distance, duration, position, className }) => (
  <motion.div
    {...float(delay, distance, duration)}
    className={`absolute ${position} z-20 hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl bg-background/55 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${className}`}
    style={{ WebkitBackdropFilter: 'blur(16px)' }}
  >
    <div className={`relative w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
      <svg className="absolute inset-0" viewBox="0 0 36 36">
        <circle
          cx="18" cy="18" r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-border/40"
        />
        <motion.circle
          cx="18" cy="18" r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${(value / total) * 94.25} 94.25`}
          transform="rotate(-90 18 18)"
          className={ringColor}
          initial={{ strokeDasharray: '0 94.25' }}
          animate={{ strokeDasharray: `${(value / total) * 94.25} 94.25` }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
        />
      </svg>
      <span className="relative text-xs font-black">{value}</span>
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
      <span className="text-sm font-black text-foreground leading-tight">{value} Qs</span>
    </div>
  </motion.div>
);

export default function Hero({ stats , overallProgress }) {
  const total = Math.max(stats.totalQuestions, 1);

  return (
    <section className="relative overflow-hidden py-24 lg:py-25 px-4 sm:px-6 lg:px-8">

      {/* Animated Background Elements */}
      <div className="absolute top-10 right-[10%] w-32 h-32 bg-primary/10 rounded-2xl floating-shape blur-xl pointer-events-none" />
      <div className="absolute bottom-10 left-[5%] w-48 h-48 bg-secondary/20 rounded-full floating-shape blur-2xl pointer-events-none" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-1/2 left-[20%] w-16 h-16 bg-accent/20 rounded-xl floating-shape blur-lg pointer-events-none" style={{ animationDelay: '-4s' }} />

      {/* Floating Question Distribution Cards */}
      <DistributionCard
        label="Easy"
        value={stats.difficulty.easy}
        total={total}
        color="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
        ringColor="text-emerald-500"
        delay={0.2}
        distance={10}
        duration={5}
        position="top-[18%] left-[10%] lg:left-[16%]"
        className="-rotate-10"

      />
      <DistributionCard
        label="Medium"
        value={stats.difficulty.medium}
        total={total}
        color="bg-amber-500/15 text-amber-600 dark:text-amber-400"
        ringColor="text-amber-500"
        delay={0.6}
        distance={14}
        duration={6}
        position="top-[28%] right-[5%] lg:right-[13%]"
        className="rotate-10"
      />
      <DistributionCard
        label="Hard"
        value={stats.difficulty.hard}
        total={total}
        color="bg-rose-500/15 text-rose-600 dark:text-rose-400"
        ringColor="text-rose-500"
        delay={1.0}
        distance={9}
        duration={4.5}
        position="bottom-[22%] left-[8%] lg:left-[16%]"
        className="rotate-10"
      />
      <DistributionCard
        label="Total"
        value={stats.totalQuestions}
        total={total}
        color="bg-primary/15 text-primary"
        ringColor="text-primary"
        delay={1.4}
        distance={11}
        duration={5.5}
        position="bottom-[20%] right-[6%] lg:right-[13%]"
        className="-rotate-10"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Pill Badge */}
        <motion.div {...fadeUp(0)} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary/20 px-4 py-1.5 rounded-full shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              BITM 2nd Semester · Java OOP
            </span>
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          {...fadeUp(0.08)}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-[1.1] tracking-tight mb-6"
        >
          Master{' '}
          <img
            src="/image/opps.png"
            alt="OOPs"
            className="inline-block h-10 sm:h-20 lg:h-40 opps-waggle w-auto object-contain align-middle -mt-1 sm:-mt-2"
          />{' '}
          W/ Java.{' '}
          <br />
          <span className="text-primary italic">One Question at a Time.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.16)}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Java OOP study companion: practice theory, coding, and interview questions with syllabus organization and revision tracking.

        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.22)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/units"
            className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:brightness-105 transition-all text-sm flex items-center justify-center gap-2"
          >
            Start Learning
            <Rocket className="w-4 h-4" />
          </Link>
          <Link
            to="/units"
            className="w-full sm:w-auto px-8 py-3.5 bg-background/90 text-primary border border-border rounded-xl font-bold hover:bg-secondary hover:border-primary/30 transition-all text-sm flex items-center justify-center gap-2 shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            {overallProgress.percentage > 0 ? 'Continue Learning' : 'Browse Units'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
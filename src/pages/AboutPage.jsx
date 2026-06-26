import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, HelpCircle, Bookmark, Search, Zap, Database, Globe } from 'lucide-react';
import Container from '../components/common/Container';
import { getGlobalStats } from '../utils/dataHelper';
import { Badge } from '../components/ui/badge';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: 'easeOut' },
});

const FeatureCard = ({ icon: Icon, title, desc, color }) => (
  <motion.div
    {...fadeUp(0.1)}
    className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm"
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h3 className="text-sm font-semibold text-card-foreground mb-0.5">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export default function AboutPage() {
  const stats = getGlobalStats();

  const features = [
    {
      icon: Layers,
      title: 'Unit-Based Organisation',
      desc: `${stats.totalUnits} units structured to mirror your BCA 2nd Semester Java OOP syllabus.`,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      icon: HelpCircle,
      title: `${stats.totalQuestions}+ Practice Questions`,
      desc: 'Questions categorised by difficulty (Easy, Medium, Hard) and question type.',
      color: 'bg-amber-500/10 text-amber-500',
    },
    {
      icon: Search,
      title: 'Full-Text Search',
      desc: 'Quickly find questions by keyword, tag, difficulty, or type across all units.',
      color: 'bg-violet-500/10 text-violet-500',
    },
    {
      icon: Bookmark,
      title: 'Bookmark & Track',
      desc: 'Bookmark important questions and mark them as completed. Progress is saved locally.',
      color: 'bg-emerald-500/10 text-emerald-500',
    },
    {
      icon: Database,
      title: 'No Backend Required',
      desc: 'Everything runs in your browser. Data is stored in JSON files — no server, no login.',
      color: 'bg-rose-500/10 text-rose-500',
    },
    {
      icon: Globe,
      title: 'Works Offline',
      desc: 'Since all data is local, this app works without an internet connection once loaded.',
      color: 'bg-sky-500/10 text-sky-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
        <Container className="relative text-center">
          <motion.div {...fadeUp(0)} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-5">
              <Code2 className="w-7 h-7 text-blue-400" />
            </div>
            <motion.div {...fadeUp(0.05)}>
              <Badge variant="outline" className="inline-flex items-center gap-1 mb-4 border-blue-500/30 bg-blue-500/10 text-blue-400 font-semibold uppercase tracking-wider">
                <Zap className="w-3 h-3" />
                About This App
              </Badge>
            </motion.div>
            <motion.h1
              {...fadeUp(0.1)}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4"
            >
              Java OOP Question Hub
            </motion.h1>
            <motion.p
              {...fadeUp(0.18)}
              className="text-slate-400 text-base leading-relaxed max-w-xl"
            >
              A personal study companion for BCA 2nd Semester students mastering Object-Oriented
              Programming with Java. Browse, search, and track your revision progress — all offline.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16">
        <Container>
          <motion.div {...fadeUp(0)} className="mb-8">
            <h2 className="text-xl font-bold text-foreground">Features</h2>
            <p className="text-sm text-muted-foreground mt-1">Everything you need for effective exam preparation.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <Container>
          <motion.div {...fadeUp(0)} className="mb-6">
            <h2 className="text-xl font-bold text-foreground">Built With</h2>
            <p className="text-sm text-muted-foreground mt-1">Modern, lightweight tools for a fast experience.</p>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {['React 19', 'Vite 8', 'Tailwind CSS v4', 'React Router v7', 'Framer Motion', 'Lucide Icons'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-medium text-card-foreground shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats summary */}
      <section className="py-12 border-t border-border">
        <Container>
          <motion.div {...fadeUp(0)} className="mb-6">
            <h2 className="text-xl font-bold text-foreground">Content Summary</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { value: stats.totalUnits, label: 'Units' },
              { value: stats.totalTopics, label: 'Topics' },
              { value: stats.totalQuestions, label: 'Questions' },
              { value: `${stats.difficulty.easy}/${stats.difficulty.medium}/${stats.difficulty.hard}`, label: 'Easy/Med/Hard' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="p-5 rounded-2xl bg-card border border-border shadow-sm"
              >
                <span className="text-2xl font-bold text-card-foreground tabular-nums block">{value}</span>
                <span className="text-xs text-muted-foreground mt-0.5 block">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

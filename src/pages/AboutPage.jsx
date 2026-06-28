import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code2, Layers, HelpCircle, Bookmark, Search, Database, Globe,
  Target, BookOpen, ArrowRight,ExternalLink, Heart,
} from 'lucide-react';
import { getGlobalStats } from '../utils/dataHelper';
import { SEO } from '../components/common/SEO';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function AboutPage() {
  const stats = getGlobalStats();

  /* ── Features list (kept from original) ─────────────────────── */
  const features = [
    {
      icon: Layers,
      title: 'Unit-Based Organisation',
      desc: `${stats.totalUnits} units structured to mirror your BITM 2nd Semester Java OOP syllabus.`,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      icon: HelpCircle,
      title: `${stats.totalQuestions}+ Practice Questions`,
      desc: 'Questions categorised by difficulty (Easy, Medium, Hard) and question type.',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      icon: Search,
      title: 'Full-Text Search',
      desc: 'Quickly find questions by keyword, tag, difficulty, or type across all units.',
      color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    },
    {
      icon: Bookmark,
      title: 'Bookmark & Track',
      desc: 'Bookmark important questions and mark them as completed. Progress is saved locally.',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: Database,
      title: 'No Backend Required',
      desc: 'Everything runs in your browser. Data is stored in JSON files — no server, no login.',
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    },
    {
      icon: Globe,
      title: 'Works Offline',
      desc: 'Since all data is local, this app works without an internet connection once loaded.',
      color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="About" description="Learn about JavaLab —  OOP with Java practice platform built for students." />

      {/* ════════════════════════════════════════════
          1. HERO — mesh gradient, centered, pill + heading + subtitle
      ════════════════════════════════════════════ */}
      <section className="mesh-gradient relative overflow-hidden py-28 lg:py-36 px-4 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="hero-grid" />
        {/* Decorative blobs */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5 relative z-10">
          <motion.span
            {...fadeUp(0)}
            className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-primary/20"
          >
            Our Mission
          </motion.span>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight tracking-tight"
          >
            Java OOP{' '}
            <span className="text-primary italic">Question Hub</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            A personal study companion for BITM 2nd Semester students mastering Object-Oriented
            Programming with Java. Browse, search, and track your revision progress — all offline.
          </motion.p>

          <motion.div {...fadeUp(0.22)}>
            <Link
              to="/units"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-105 hover:-translate-y-0.5 transition-all text-sm"
            >
              Explore the Curriculum
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. CORE VALUES — 3-col cards
      ════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Target,
                title: 'Precision in Learning',
                desc: `${stats.totalUnits} units engineered for maximum retention. We strip away the noise to focus on the core principles that define modern Java OOP.`,
              },
              {
                icon: Code2,
                title: 'Practice First',
                desc: `Theory is the map, but practice is the journey. ${stats.totalQuestions}+ questions ensure you spend more time solving problems than reading about them.`,
              },
              {
                icon: BookOpen,
                title: 'Structured Path',
                desc: `${stats.totalTopics} topics covering the complete BITM 2nd Semester syllabus from fundamentals to advanced OOP patterns.`,
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.1)}
                className="group p-7 bg-card border border-border rounded-2xl hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. THE STORY — 2-col: text + stats / code panel
      ════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text + stat bar */}
            <motion.div {...fadeUp(0)} className="flex flex-col gap-5">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Built for Exam Preparation
              </h2>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  JavaLab was born from a simple observation: students need structured, offline-first study
                  tools that mirror the actual exam syllabus. Neither generic coding platforms nor scattered
                  PDFs prepare you for the rigorous questions of BITM's Object-Oriented Programming exam.
                </p>
                <p>
                  Every question is categorised by difficulty (Easy, Medium, Hard), question type, and topic
                  — giving you full control over your revision strategy. With progress tracking saved to local
                  storage, you pick up exactly where you left off.
                </p>
                <p>
                  Today, JavaLab helps BITM 2nd Semester students go from "I know some Java" to "I can
                  answer any OOP question with confidence."
                </p>
              </div>

              {/* Inline stat bar */}
              <div className="flex items-center gap-5 mt-2 p-5 bg-card rounded-2xl border border-border flex-wrap">
                {[
                  { value: stats.totalUnits, label: 'Curriculum Units' },
                  { value: stats.totalTopics, label: 'Topics' },
                  { value: `${stats.totalQuestions}+`, label: 'Questions' },
                ].map(({ value, label }, i, arr) => (
                  <React.Fragment key={label}>
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-primary">{value}</span>
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">{label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-px h-10 bg-border hidden sm:block" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Right: Code / tech illustration panel */}
            <motion.div {...fadeUp(0.1)} className="relative group">
              <div className="absolute -inset-4 bg-primary/8 rounded-2xl blur-2xl group-hover:bg-primary/15 transition-all duration-500 pointer-events-none" />
              <div className="relative bg-foreground dark:bg-card rounded-2xl overflow-hidden shadow-2xl border border-border">
                {/* Terminal bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-foreground/90 dark:bg-muted border-b border-white/10 dark:border-border">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-[11px] text-white/40 dark:text-muted-foreground font-mono">JavaOOP.java</span>
                </div>
                {/* Code body */}
                <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed text-emerald-400 dark:text-emerald-300 bg-gray-950 dark:bg-gray-900">
                  <div><span className="text-blue-400">public class</span> <span className="text-yellow-300">JavaOOP</span> {'{'}</div>
                  <div className="pl-5 mt-1"><span className="text-blue-400">private</span> <span className="text-cyan-400">String</span> student;</div>
                  <div className="pl-5 mt-1"><span className="text-blue-400">private</span> <span className="text-cyan-400">int</span> progress;</div>
                  <div className="pl-5 mt-3">
                    <span className="text-blue-400">public void</span> <span className="text-yellow-300">study</span>() {'{'}
                  </div>
                  <div className="pl-10 text-slate-400">// {stats.totalQuestions}+ questions</div>
                  <div className="pl-10">
                    <span className="text-pink-400">this</span>.progress<span className="text-white">++</span>;
                  </div>
                  <div className="pl-5">{'}'}</div>
                  <div className="pl-5 mt-1">
                    <span className="text-blue-400">public</span> <span className="text-cyan-400">boolean</span> <span className="text-yellow-300">passExam</span>() {'{'}
                  </div>
                  <div className="pl-10">
                    <span className="text-blue-400">return</span> progress <span className="text-white">&gt;=</span> <span className="text-orange-400">100</span>;
                  </div>
                  <div className="pl-5">{'}'}</div>
                  <div>{'}'}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. FEATURES BENTO — 6-col grid
      ════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">Features</h2>
            <p className="text-sm text-muted-foreground mt-2">Everything you need for effective exam preparation.</p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Row 1 */}
            <motion.div
              {...fadeUp(0)}
              className="md:col-span-3 p-7 bg-secondary/60 border border-border rounded-2xl flex flex-col gap-3 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-black text-foreground text-base">Unit-Based Organisation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stats.totalUnits} units structured to mirror your BITM 2nd Semester Java OOP syllabus.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.05)}
              className="md:col-span-3 p-7 bg-muted/40 border border-border rounded-2xl flex flex-col gap-3 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-black text-foreground text-base">Full-Text Search</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quickly find questions by keyword, tag, difficulty, or type across all units.
              </p>
            </motion.div>

            {/* Row 2 */}
            <motion.div
              {...fadeUp(0.1)}
              className="md:col-span-2 p-7 bg-card border border-border rounded-2xl flex flex-col gap-3 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>
              <h4 className="font-black text-foreground text-base">Bookmark & Track</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bookmark important questions and mark them as completed. Progress is saved locally.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.15)}
              className="md:col-span-4 p-7 bg-primary rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden"
            >
              <div className="flex flex-col gap-2 relative z-10">
                <h4 className="font-black text-primary-foreground text-base">{stats.totalQuestions}+ Practice Questions</h4>
                <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-sm">
                  Questions categorised by difficulty (Easy, Medium, Hard) and question type — with detailed answers.
                </p>
              </div>
              <HelpCircle className="w-24 h-24 text-primary-foreground/10 absolute right-4 bottom-[-8px] flex-shrink-0" />
            </motion.div>

            {/* Row 3 */}
            <motion.div
              {...fadeUp(0.2)}
              className="md:col-span-3 p-7 bg-card border border-border rounded-2xl flex flex-col gap-3 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-black text-foreground text-base">No Backend Required</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Everything runs in your browser. Data is stored in JSON files — no server, no login.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.25)}
              className="md:col-span-3 p-7 bg-card border border-border rounded-2xl flex flex-col gap-3 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-black text-foreground text-base">Works Offline</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Since all data is local, this app works without an internet connection once loaded.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. TECH STACK — pill tags
      ════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-muted/20 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-black text-foreground tracking-tight">Built With</h2>
              <p className="text-xs text-muted-foreground mt-1">Modern, lightweight tools for a fast experience.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['React 19', 'Vite 8', 'Tailwind CSS v4', 'React Router v7', 'Framer Motion', 'Lucide Icons', 'shadcn/ui'].map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-semibold text-foreground shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. CONTENT SUMMARY — stat cards row
      ════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-black text-foreground tracking-tight mb-6">Content Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: stats.totalUnits, label: 'Units' },
              { value: stats.totalTopics, label: 'Topics' },
              { value: stats.totalQuestions, label: 'Questions' },
              { value: `${stats.difficulty.easy}/${stats.difficulty.medium}/${stats.difficulty.hard}`, label: 'Easy/Med/Hard' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="p-5 rounded-2xl bg-card border border-border text-center hover:border-primary/20 transition-all duration-300"
              >
                <span className="text-2xl font-black text-foreground font-mono block">{value}</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1.5 block">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          7. CTA — dark panel, dot-pattern bg, two buttons
      ════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div
            className="bg-foreground dark:bg-card rounded-2xl px-8 py-16 md:px-16 text-center flex flex-col items-center gap-6 relative overflow-hidden border border-border"
          >
            {/* Dot pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />
            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,55,176,0.3),transparent)] pointer-events-none" />

            <motion.h2
              {...fadeUp(0)}
              className="text-2xl sm:text-3xl font-black text-background dark:text-foreground relative z-10 max-w-xl leading-tight"
            >
              Ready to Start Your Revision?
            </motion.h2>
            <motion.p
              {...fadeUp(0.08)}
              className="text-sm text-background/60 dark:text-muted-foreground max-w-md relative z-10 leading-relaxed"
            >
              Join BITM 2nd Semester students mastering Java OOP.
              Your first unit is free. No account required.
            </motion.p>

            <motion.div
              {...fadeUp(0.15)}
              className="flex flex-col sm:flex-row items-center gap-3 relative z-10"
            >
              <Link
                to="/units"
                className="px-7 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:brightness-110 hover:scale-[1.02] transition-all shadow-xl shadow-primary/30 text-sm"
              >
                Start Learning Now
              </Link>
              <Link
                to="/units"
                className="px-7 py-3 bg-transparent border border-background/20 dark:border-border text-background dark:text-foreground rounded-xl font-bold hover:bg-background/5 transition-all text-sm"
              >
                View Curriculum
              </Link>
            </motion.div>

            {/* Developer credit */}
            <motion.div
              {...fadeUp(0.22)}
              className="relative z-10 mt-2 flex items-center gap-2 text-xs text-background/40 dark:text-muted-foreground"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
              Built by{' '}
              <a
                href="https://rakeshpatel.me"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-background/60 dark:text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Rakesh Patel
                <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}

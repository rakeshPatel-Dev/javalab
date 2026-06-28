import { motion } from 'framer-motion';
import { Sparkles, Brain, Compass, Cpu } from 'lucide-react';

export default function Features() {
 const features = [
  {
    icon: Brain,
    title: 'Organized by Syllabus',
    desc: 'Every question is categorized into units and topics, making revision simple and structured.',
    number: '01',
  },
  {
    icon: Compass,
    title: 'Built for Exam Success',
    desc: 'Practice theory, programming, viva, MCQs, debugging, and interview questions from one platform.',
    number: '02',
  },
  {
    icon: Cpu,
    title: 'Personal Study Workspace',
    desc: 'Bookmark important questions, track completed topics, and quickly revisit concepts anytime.',
    number: '03',
  },
];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 border-y border-border">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]">Built for Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Built for Learning Excellence
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Tools and features designed to accelerate your mastery of Java OOP
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, number }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-card border border-border rounded-2xl p-7 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Large background number */}
              <div className="absolute top-4 right-5 text-5xl font-black text-muted-foreground/10 group-hover:text-primary/10 transition-colors select-none">
                {number}
              </div>

              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="text-base font-black text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>

              <div className="mt-5 h-0.5 w-10 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
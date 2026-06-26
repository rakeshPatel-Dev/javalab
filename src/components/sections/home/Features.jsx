import { motion } from 'framer-motion';
import { Sparkles, Brain, Compass, Cpu } from 'lucide-react';
import { Badge } from '../../ui/badge';

export default function Features() {
  const features = [
    { 
      icon: Brain, 
      title: 'Intelligent Practice',
      desc: 'Adaptive recommendations based on your performance patterns',
      number: '01'
    },
    { 
      icon: Compass, 
      title: 'Guided Learning',
      desc: 'Structured paths from fundamentals to advanced concepts',
      number: '02'
    },
    { 
      icon: Cpu, 
      title: 'Smart Analytics',
      desc: 'Detailed insights into your strengths and improvement areas',
      number: '03'
    }
  ];

  return (
    <section className="py-20 bg-background border-y border-border">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="inline-flex items-center gap-2 mb-4 bg-primary/10 border-primary/20 text-primary font-semibold uppercase tracking-[0.15em]">
            <Sparkles className="w-3 h-3" />
            Premium Features
          </Badge>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Built for Learning Excellence
          </h2>
          <p className="text-muted-foreground mt-3">
            Tools and features designed to accelerate your mastery of Java OOP
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, number }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-4xl font-bold text-muted/40 group-hover:text-primary/20 transition-colors">
                {number}
              </div>
              
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>
              
              <div className="mt-4 h-0.5 w-12 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
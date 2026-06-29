import { motion } from 'framer-motion';
import { MessageSquareQuote, ExternalLink } from 'lucide-react';

const testimonials = [
  {
    name: 'Aayush Koirala',
    role: 'BITM Student',
    quote: 'JavaLab helped me go from struggling with OOP concepts to confidently answering viva questions. The unit-wise structure made revision so much easier before exams.',
    initials: 'AK',
    color: 'bg-blue-500',
    link: 'https://np.linkedin.com/in/aayush-koirala',
  },
  {
    name: 'Pratiksha Adhikari',
    role: 'BITM Student',
    quote: 'I used to find Java programming intimidating, but practicing here changed everything. The bookmark feature is a lifesaver for tracking difficult questions.',
    initials: 'PA',
    color: 'bg-rose-500',
    link: 'https://np.linkedin.com/in/pratiksha-adhikari',
  },
  {
    name: 'Sagar Poudel',
    role: 'BITM Student',
    quote: 'Having all past questions categorized by difficulty level saved me hours of searching. I completed the entire syllabus revision in just two weeks before finals.',
    initials: 'SP',
    color: 'bg-emerald-500',
    link: 'https://np.linkedin.com/in/sagar-poudel',
  },
  {
    name: 'Binita Thapa',
    role: 'BITM Student',
    quote: 'The coding examples with detailed explanations helped me understand Java OOP fundamentals deeply. I now feel confident tackling any programming question.',
    initials: 'BT',
    color: 'bg-violet-500',
    link: 'https://np.linkedin.com/in/binita-thapa',
  },
  {
    name: 'Roshan Gurung',
    role: 'BITM Student',
    quote: 'JavaLab is the perfect study companion for BITM students. The MCQ and theory question bank is exactly what we need for semester exams.',
    initials: 'RG',
    color: 'bg-amber-500',
    link: 'https://np.linkedin.com/in/roshan-gurung',
  },
  {
    name: 'Sneha Sharma',
    role: 'BITM Student',
    quote: 'I love how I can track my progress across units. It kept me motivated throughout the semester. Highly recommended for anyone taking Java OOP.',
    initials: 'SS',
    color: 'bg-cyan-500',
    link: 'https://np.linkedin.com/in/sneha-sharma',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full">
            <MessageSquareQuote className="w-3 h-3" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]">Student Voices</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Loved by BITM Students
          </h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-lg mx-auto">
            Hear from fellow students who transformed their Java OOP preparation with JavaLab
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map(({ name, role, quote, initials, color, link }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="absolute top-5 right-5 text-5xl font-black text-muted-foreground/5 select-none leading-none">
                &quot;
              </div>

              <div className="flex items-center gap-3 mb-4">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                  >
                    {initials}
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </div>
                </a>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{name}</p>
                  <p className="text-[11px] text-muted-foreground font-semibold">{role}</p>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>

              <div className="mt-5 h-px bg-border group-hover:bg-primary/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

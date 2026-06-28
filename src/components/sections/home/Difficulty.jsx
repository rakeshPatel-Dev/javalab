import { Grid3x3, ShieldCheck } from 'lucide-react';

export default function Difficulty({ stats }) {
  const difficulties = [
    { label: 'Easy', count: stats.difficulty.easy, dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/40' },
    { label: 'Medium', count: stats.difficulty.medium, dot: 'bg-amber-500', pill: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/40' },
    { label: 'Hard', count: stats.difficulty.hard, dot: 'bg-rose-500', pill: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/40' },
  ];

  return (
    <section className="py-6 border-y border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left: Label + tags */}
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Grid3x3 className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.12em]">
                Question Distribution
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {difficulties.map(({ label, count, dot, pill }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${pill}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  {count} {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Verified badge */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="font-semibold">Verified content</span>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Grid3x3, Shield } from 'lucide-react';

export default function Difficulty({ stats }) {
  return (
    <section className="py-12 border-y border-border bg-muted/10">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Grid3x3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em]">
                Question Distribution
              </span>
            </div>
            
            <div className="flex gap-3">
              {[
                { label: 'Easy', count: stats.difficulty.easy, color: 'bg-emerald-500' },
                { label: 'Medium', count: stats.difficulty.medium, color: 'bg-amber-500' },
                { label: 'Hard', count: stats.difficulty.hard, color: 'bg-rose-500' }
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-sm font-medium text-foreground">
                    {count} {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-medium">Verified content</span>
          </div>
        </div>
      </div>
    </section>
  );
}
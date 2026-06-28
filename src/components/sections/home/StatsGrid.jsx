export default function StatsGrid({ stats }) {
  const items = [
    { value: `${stats.totalUnits} Units`, label: 'Curated Path' },
    { value: `${stats.totalTopics}+ Topics`, label: 'Depth of Content' },
    { value: `${stats.totalQuestions}+`, label: 'Practice Questions' },
    { value: '1.2k+', label: 'Active Students' },
  ];

  return (
    <section className=" py-8 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {items.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-black text-primary leading-tight">
                {value}
              </span>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

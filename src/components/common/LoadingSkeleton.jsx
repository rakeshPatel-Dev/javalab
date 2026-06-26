import React from 'react';

const shimmer = 'animate-pulse bg-slate-200 dark:bg-slate-800 rounded';

export const LoadingSkeleton = ({ type = 'card', count = 6 }) => {
  if (type === 'question') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className={`h-4 w-2/3 ${shimmer}`} />
                <div className={`h-3 w-1/4 ${shimmer}`} />
                <div className="flex gap-2 mt-3">
                  <div className={`h-5 w-16 ${shimmer}`} />
                  <div className={`h-5 w-20 ${shimmer}`} />
                </div>
              </div>
              <div className={`w-8 h-8 ${shimmer}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: card grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-6 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 space-y-4">
          <div className={`h-10 w-10 ${shimmer}`} />
          <div className="space-y-2">
            <div className={`h-4 w-3/4 ${shimmer}`} />
            <div className={`h-3 w-full ${shimmer}`} />
            <div className={`h-3 w-2/3 ${shimmer}`} />
          </div>
          <div className="flex gap-2">
            <div className={`h-5 w-14 ${shimmer}`} />
            <div className={`h-5 w-18 ${shimmer}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

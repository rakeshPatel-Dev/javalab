import React from 'react';
import { Badge } from '../ui/badge';

export const DifficultyBadge = ({ difficulty, className = '' }) => {
  const getStyles = () => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-850/40 hover:bg-emerald-500/15';
      case 'medium':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-850/40 hover:bg-amber-500/15';
      case 'hard':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-850/40 hover:bg-rose-500/15';
      default:
        return 'bg-muted text-muted-foreground border-border hover:bg-muted/80';
    }
  };

  return (
    <Badge variant="outline" className={`font-semibold px-2 py-0.5 rounded-full ${getStyles()} ${className}`}>
      {difficulty}
    </Badge>
  );
};

export default DifficultyBadge;

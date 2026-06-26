import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const TYPES = ['Theory', 'Programming', 'MCQ', 'Interview', 'Viva', 'Debugging', 'Output', 'Lab', 'Assignment'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'alphabetical', label: 'A → Z' },
  { value: 'difficulty-asc', label: 'Easy First' },
  { value: 'difficulty-desc', label: 'Hard First' },
];

const difficultyStyles = {
  Easy:   'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
  Medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
  Hard:   'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400',
};

export const FilterBar = ({
  selectedDifficulties = [],
  onDifficultyChange,
  selectedTypes = [],
  onTypeChange,
  sortBy = 'default',
  onSortChange,
  onClear,
  className = ''
}) => {
  const hasFilters = selectedDifficulties.length > 0 || selectedTypes.length > 0 || sortBy !== 'default';

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Difficulty */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-full sm:w-auto">
          Difficulty
        </span>
        <div className="flex flex-wrap gap-1.5">
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              onClick={() => onDifficultyChange(d)}
              className="cursor-pointer"
            >
              <Badge
                variant={selectedDifficulties.includes(d) ? 'default' : 'outline'}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedDifficulties.includes(d)
                    ? 'shadow-sm'
                    : `${difficultyStyles[d]} hover:opacity-80`
                }`}
              >
                {d}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Type */}
      <div className="flex flex-wrap items-start gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-full sm:w-auto pt-1">
          Type
        </span>
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => onTypeChange(t)}
              className="cursor-pointer"
            >
              <Badge
                variant={selectedTypes.includes(t) ? 'default' : 'outline'}
                className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer hover:opacity-80"
              >
                {t}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sort */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Sort
        </span>
        <div className="flex gap-1.5 flex-wrap">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className="cursor-pointer"
            >
              <Badge
                variant={sortBy === opt.value ? 'default' : 'outline'}
                className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer hover:opacity-80"
              >
                {opt.label}
              </Badge>
            </button>
          ))}
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onClear}
            className="ml-auto text-muted-foreground hover:text-destructive gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;

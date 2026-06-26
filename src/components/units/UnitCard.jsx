import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, BarChart2, BookOpen } from 'lucide-react';
import Icon from '../common/Icon';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const difficultyVariant = {
  Beginner:     'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-400',
  Intermediate: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-950/20 dark:text-blue-400',
  Advanced:     'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-950/20 dark:text-rose-400',
};

export const UnitCard = ({ unit, progress }) => {
  const pct = progress?.percentage ?? 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group relative overflow-hidden border-border/60 hover:border-border hover:shadow-lg transition-all duration-300 gap-0 py-0">
        {/* Color accent strip */}
        <div
          className="h-0.5 w-full opacity-80 flex-shrink-0"
          style={{ background: unit.color }}
        />

        <CardContent className="p-6 pb-4">
          {/* Header: icon + unit number */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: `${unit.color}18` }}
            >
              <Icon name={unit.icon} className="w-5 h-5" style={{ color: unit.color }} />
            </div>
            <span className="text-xs text-muted-foreground font-mono font-semibold">
              Unit {unit.id}
            </span>
          </div>

          {/* Title + description */}
          <h2 className="text-base font-bold text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors duration-150">
            {unit.title}
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {unit.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {unit.topicsCount ?? unit.topics} topics
            </span>
            <span className="flex items-center gap-1">
              <BarChart2 className="w-3.5 h-3.5" />
              {unit.questionCount} questions
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              ~{unit.estimatedHours}h
            </span>
            <Badge
              variant="outline"
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${difficultyVariant[unit.difficulty] || ''}`}
            >
              {unit.difficulty}
            </Badge>
          </div>

          {/* Progress */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-medium text-muted-foreground">
              <span>Completed</span>
              <span className="font-mono">{pct}%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 py-3 bg-muted/30 border-t border-border/50">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full justify-between text-muted-foreground hover:text-primary hover:bg-primary/5 group/btn px-0"
          >
            <Link to={`/unit/${unit.slug || unit.id}`}>
              <span className="text-sm font-medium">Open Unit</span>
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-150" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default UnitCard;

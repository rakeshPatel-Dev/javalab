import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, BarChart2, BookOpen } from 'lucide-react';
import Icon from '../common/Icon';
import { Card, CardContent } from '../ui/card';
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="h-full"
    >
      <Card className="group relative overflow-hidden border border-border bg-card rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full gap-0 py-0">
        {/* Background Watermark Icon */}
        <div className="absolute top-0 right-0 p-6 opacity-[0.04] dark:opacity-[0.08] group-hover:scale-105 transition-transform duration-300 pointer-events-none">
          <Icon name={unit.icon} className="w-20 h-20 text-foreground" />
        </div>

        <CardContent className="p-6 flex flex-col flex-1">
          {/* Header Badge */}
          <div className="mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-xl uppercase">
              Unit {unit.id}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors duration-150">
            {unit.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-6 flex-grow">
            {unit.description}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {unit.topicsCount ?? unit.topics} topics
            </span>
            <span className="flex items-center gap-1">
              <BarChart2 className="w-3.5 h-3.5" />
              {unit.questionCount} Qs
            </span>
            <span className="flex items-center gap-1 mr-1">
              <Clock className="w-3.5 h-3.5" />
              ~{unit.estimatedHours}h
            </span>
            <Badge
              variant="outline"
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${difficultyVariant[unit.difficulty] || ''}`}
            >
              {unit.difficulty}
            </Badge>
          </div>

          {/* Progress Tracker */}
          <div className="space-y-1.5 mb-6">
            <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <span>Progress</span>
              <span className="font-mono text-primary text-sm">{pct}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <Button
            asChild
            variant="outline"
            className="w-full mt-auto py-2.5 bg-secondary text-primary hover:bg-primary hover:text-primary-foreground font-bold rounded-2xl border border-primary/10 transition-all text-xs flex items-center justify-center gap-1.5 h-10 cursor-pointer"
          >
            <Link to={`/unit/${unit.slug || unit.id}`}>
              {pct > 0 ? 'Continue Unit' : 'Start Unit'}
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UnitCard;

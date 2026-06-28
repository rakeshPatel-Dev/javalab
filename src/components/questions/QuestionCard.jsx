import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, ChevronRight } from 'lucide-react';
import DifficultyBadge from '../common/DifficultyBadge';
import Tag from '../common/Tag';
import BookmarkButton from '../common/BookmarkButton';
import CompletedButton from '../common/CompletedButton';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

const TYPE_COLORS = {
  Theory:      'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30',
  Programming: 'text-violet-600 bg-violet-50 border-violet-100 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-900/30',
  MCQ:         'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30',
  Interview:   'text-pink-600 bg-pink-50 border-pink-100 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-900/30',
  Viva:        'text-teal-600 bg-teal-50 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-900/30',
  Debugging:   'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-900/30',
  Output:      'text-cyan-600 bg-cyan-50 border-cyan-100 dark:bg-cyan-900/20 dark:text-cyan-400 dark:border-cyan-900/30',
  Lab:         'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30',
  Assignment:  'text-orange-600 bg-orange-50 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30',
};

export const QuestionCard = ({ 
  question, 
  isBookmarked, 
  onToggleBookmark, 
  isCompleted, 
  onToggleCompleted 
}) => {
  const typeClass = TYPE_COLORS[question.type] || 'text-slate-600 bg-slate-50 border-slate-100';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.22 }}
    >
      <Card
        className={`group relative overflow-hidden transition-all duration-300 rounded-2xl gap-0 py-0 ${
          isCompleted
            ? 'border-emerald-200/60 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-900/5 hover:shadow-md'
            : 'border-border/60 hover:border-primary/20 hover:shadow-md'
        }`}
      >
        {/* Completion strip */}
        {isCompleted && (
          <div className="h-0.5 w-full bg-emerald-500/50 flex-shrink-0" />
        )}

        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Type + Difficulty badges */}
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold px-2 py-0.5 rounded-md ${typeClass}`}
                >
                  {question.type}
                </Badge>
                <DifficultyBadge difficulty={question.difficulty} />
                {question.isImportant && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-500 bg-amber-50 border-amber-100/60 dark:bg-amber-900/20 dark:border-amber-900/30 px-1.5 py-0.5"
                  >
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    Important
                  </Badge>
                )}
                {question.marks && (
                  <span className="text-[11px] text-muted-foreground font-mono">{question.marks}M</span>
                )}
              </div>

              {/* Title */}
              <Link
                to={`/question/${question.slug || question.id}`}
                className="block text-sm font-semibold text-foreground leading-snug hover:text-primary transition-colors duration-150 mb-2"
              >
                {question.title}
              </Link>

              {/* Time + Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {question.estimatedTime && (
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {question.estimatedTime} min
                  </span>
                )}
                {question.tags?.slice(0, 3).map(tag => (
                  <Tag key={tag} name={tag} />
                ))}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <BookmarkButton isBookmarked={isBookmarked} onClick={onToggleBookmark} />
              <CompletedButton isCompleted={isCompleted} onClick={onToggleCompleted} />
            </div>
          </div>

          {/* Open Link */}
          <Separator className="mt-3 mb-2" />
          <div className="flex justify-end">
            <Button
              asChild
              variant="ghost"
              size="xs"
              className="text-primary hover:text-primary hover:bg-primary/10 gap-1"
            >
              <Link to={`/question/${question.slug || question.id}`}>
                View Question
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;

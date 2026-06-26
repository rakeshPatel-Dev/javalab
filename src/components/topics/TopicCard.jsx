import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export const TopicCard = ({ topic, progress }) => {
  const pct = progress?.percentage ?? 0;

  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.18 }}
    >
      <Card className="group overflow-hidden border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200 gap-0 py-0">
        <Link
          to={`/topic/${topic.slug || topic.id}`}
          className="block"
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-150 truncate">
                  {topic.title}
                </h3>

                {/* Difficulty breakdown */}
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" />
                    {topic.questionCount ?? topic.estimatedQuestions} Qs
                  </span>
                  {topic.stats && (
                    <>
                      <span className="text-emerald-500 font-medium">{topic.stats.easy} Easy</span>
                      <span className="text-amber-500 font-medium">{topic.stats.medium} Med</span>
                      <span className="text-rose-500 font-medium">{topic.stats.hard} Hard</span>
                    </>
                  )}
                </div>

                {/* Progress bar */}
                {pct > 0 && (
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">{pct}%</span>
                  </div>
                )}
              </div>

              <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors duration-150 flex-shrink-0 mt-0.5" />
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default TopicCard;

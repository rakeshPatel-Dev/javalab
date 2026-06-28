import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CheckCircle2, Circle, Layers, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const TopicCard = ({ topic, progress, isUpNext = false }) => {
  const pct = progress?.percentage ?? 0;

  let statusText = 'Not Started';
  let statusClass = 'bg-secondary text-muted-foreground border-border hover:bg-secondary';
  let StatusIcon = Circle;
  if (pct === 100) {
    statusText = 'Completed';
    statusClass = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/15 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-850/40';
    StatusIcon = CheckCircle2;
  } else if (pct > 0) {
    statusText = 'InProgress';
    statusClass = 'bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/15 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-850/40';
    StatusIcon = Layers;
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="h-full"
    >
      <Card
        className={`group relative overflow-visible bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full gap-0 py-0 ${
          isUpNext
            ? 'border-2 border-primary shadow-lg'
            : 'border border-border hover:border-primary/70'
        }`}
      >
        {isUpNext && (
          <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            Up Next
          </div>
        )}
        <CardContent className="p-6 flex flex-col flex-grow overflow-hidden rounded-2xl">
          <div className="flex justify-between items-start mb-5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
              isUpNext ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'
            }`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <Badge variant="outline" className={`text-[10px] font-bold px-2 py-1 rounded-lg gap-1 ${statusClass}`}>
              <StatusIcon className="w-3 h-3" />
              {statusText}
            </Badge>
          </div>

          <h3 className="text-xl font-black text-foreground leading-tight mb-3 group-hover:text-primary transition-colors duration-150 line-clamp-2">
            {topic.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
            Practice the core ideas from this topic with focused Java questions.
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 font-bold">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              {topic.questionCount ?? topic.estimatedQuestions} Questions
            </span>
            <span className="font-mono text-primary">{pct}%</span>
          </div>

          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mb-6">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                pct === 100 ? 'bg-emerald-500' : 'bg-primary'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Outline Action Button */}
          <Button
            asChild
            variant={isUpNext ? 'default' : 'outline'}
            className={`w-full mt-auto rounded-xl font-black transition-all text-sm flex items-center justify-center gap-2 cursor-pointer h-10 ${
              isUpNext
                ? 'bg-primary text-primary-foreground hover:opacity-95 shadow-sm'
                : 'border-2 border-border bg-card text-foreground hover:border-primary hover:text-primary hover:bg-card'
            }`}
          >
            <Link to={`/topic/${topic.slug || topic.id}`}>
              Open Topic
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TopicCard;

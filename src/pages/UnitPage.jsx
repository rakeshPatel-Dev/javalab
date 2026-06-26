import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BarChart2, BookOpen } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumb from '../components/common/Breadcrumb';
import TopicCard from '../components/topics/TopicCard';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import { getUnitById, getTopicsByUnitId } from '../utils/dataHelper';
import { useTracking } from '../hooks/useTracking';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const difficultyVariant = {
  Beginner:     'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-400',
  Intermediate: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-950/20 dark:text-blue-400',
  Advanced:     'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-950/20 dark:text-rose-400',
};

export default function UnitPage() {
  const { unitId } = useParams();
  const unit = useMemo(() => getUnitById(unitId), [unitId]);
  const topics = useMemo(() => getTopicsByUnitId(unitId), [unitId]);
  const { getUnitProgress, getTopicProgress } = useTracking();

  if (!unit) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <EmptyState icon={BookOpen} title="Unit not found" description="The unit you are looking for does not exist." />
      </div>
    );
  }

  const progress = getUnitProgress(unit.id);

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <Container className="py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Units', href: '/units' },
          { label: unit.title }
        ]} />

        {/* Unit Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6 mb-8"
        >
          <div className="flex items-start gap-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0"
              style={{ background: `${unit.color}20` }}
            >
              <Icon name={unit.icon} className="w-7 h-7" style={{ color: unit.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground font-mono font-semibold">Unit {unit.id}</span>
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyVariant[unit.difficulty] || ''}`}
                >
                  {unit.difficulty}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground leading-tight">{unit.title}</h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">{unit.description}</p>

              <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{topics.length} Topics</span>
                <span className="flex items-center gap-1"><BarChart2 className="w-3.5 h-3.5" />{unit.questionCount} Questions</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />~{unit.estimatedHours} hours</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <Card className="mt-6 gap-0 py-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="font-medium text-foreground">Unit Progress</span>
                <span className="text-muted-foreground font-mono text-xs">{progress.completed}/{progress.total}</span>
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{progress.percentage}% completed</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Easy', count: unit.stats?.easy ?? 0, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Medium', count: unit.stats?.medium ?? 0, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
            { label: 'Hard', count: unit.stats?.hard ?? 0, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10' },
          ].map(stat => (
            <Card key={stat.label} className="gap-0 py-0">
              <CardContent className="p-4 text-center">
                <p className={`text-xl font-bold tabular-nums ${stat.color}`}>{stat.count}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Topics list */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-4">
            Topics in this Unit
          </h2>
          {topics.length === 0 ? (
            <EmptyState icon={BookOpen} title="No topics found" description="This unit has no topics yet." />
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {topics.map(topic => (
                <motion.div
                  key={topic.id}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
                >
                  <TopicCard topic={topic} progress={getTopicProgress(topic.id)} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
}

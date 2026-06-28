import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Play, HelpCircle } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumb from '../components/common/Breadcrumb';
import TopicCard from '../components/topics/TopicCard';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import { getUnitById, getTopicsByUnitId } from '../utils/dataHelper';
import { useTracking } from '../hooks/useTracking';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { SEO } from '../components/common/SEO';

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
      <div className="pb-16 min-h-screen flex items-center justify-center">
        <EmptyState icon={BookOpen} title="Unit not found" description="The unit you are looking for does not exist." />
      </div>
    );
  }

  const progress = getUnitProgress(unit.id);
  const topicProgress = topics.map(topic => ({
    topic,
    progress: getTopicProgress(topic.id),
  }));
  const upNextTopicId = topicProgress.find(item => (item.progress?.percentage ?? 0) < 100)?.topic.id;

  return (
    <div className="pb-16 min-h-screen bg-background">
      <SEO title={unit.title} description={`${unit.title} — ${unit.description || `${topics.length} topics covering Java OOP concepts.`}`} />
      <Container className="py-8 lg:py-10">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[
            { label: 'Units', href: '/units' },
            { label: `Unit ${unit.id}` }
          ]} />
        </div>

        {/* Unit Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-10 flex flex-col lg:flex-row gap-6 items-stretch bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 -mr-24 -mt-24 opacity-5 dark:opacity-10 pointer-events-none bg-primary rounded-full blur-3xl"></div>

          <div className="flex-1 flex flex-col justify-center space-y-4 relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xs flex-shrink-0"
                style={{ background: `${unit.color}15` }}
              >
                <Icon name={unit.icon} className="w-6 h-6" style={{ color: unit.color }} />
              </div>
              <Badge
                variant="outline"
                className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${difficultyVariant[unit.difficulty] || ''}`}
              >
                {unit.difficulty} Level
              </Badge>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Unit {unit.id}</p>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">{unit.title}</h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">{unit.description}</p>
            </div>

            <div className="flex flex-wrap gap-5 sm:gap-7 pt-2 text-sm text-foreground font-bold">
              <span className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />{topics.length} Topics</span>
              <span className="flex items-center gap-2"><HelpCircle className="w-5 h-5 text-primary" />{unit.questionCount} Questions</span>
              <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" />~{unit.estimatedHours} Hours</span>
            </div>
          </div>

          <div className="w-full lg:w-80 p-5 sm:p-6 bg-secondary border border-border/80 rounded-xl flex flex-col justify-center space-y-4 shrink-0 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Your Progress</span>
              <span className="text-2xl font-black text-primary font-mono">{progress.percentage}%</span>
            </div>
            <div className="h-3 w-full bg-background rounded-full overflow-hidden border border-border/60">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground italic">
              {progress.completed} of {progress.total} topics completed
            </p>
            {topics.length > 0 && (
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 h-11 shadow-sm cursor-pointer"
              >
                <Link to={`/topic/${topicProgress.find(item => item.topic.id === upNextTopicId)?.topic.slug || topics[0].slug || topics[0].id}`}>
                  <Play className="w-3.5 h-3.5 fill-primary-foreground" />
                  Continue Learning
                </Link>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats breakdown cards retained from the current page */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Easy', count: unit.stats?.easy ?? 0, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            { label: 'Medium', count: unit.stats?.medium ?? 0, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
            { label: 'Hard', count: unit.stats?.hard ?? 0, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
          ].map(stat => (
            <Card key={stat.label} className={`border rounded-2xl shadow-sm gap-0 py-0 ${stat.bg}`}>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">Questions</p>
                </div>
                <p className={`text-3xl font-black font-mono ${stat.color}`}>{stat.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Topics list */}
        <div>
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Topic Grid</p>
              <h2 className="text-2xl font-black text-foreground tracking-tight">Topics in this Unit</h2>
            </div>
            <p className="hidden sm:block text-sm text-muted-foreground font-medium">{topics.length} lessons</p>
          </div>
          {topics.length === 0 ? (
            <EmptyState icon={BookOpen} title="No topics found" description="This unit has no topics yet." />
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {topicProgress.map(({ topic, progress: itemProgress }) => (
                <motion.div
                  key={topic.id}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
                >
                  <TopicCard topic={topic} progress={itemProgress} isUpNext={topic.id === upNextTopicId} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
}

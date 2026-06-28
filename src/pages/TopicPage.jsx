import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, BookOpen } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumb from '../components/common/Breadcrumb';
import PageHeader from '../components/common/PageHeader';
import FilterBar from '../components/common/FilterBar';
import QuestionCard from '../components/questions/QuestionCard';
import EmptyState from '../components/common/EmptyState';
import { getTopicById, getUnitById, getQuestionsByTopicId } from '../utils/dataHelper';
import { useTracking } from '../hooks/useTracking';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { SEO } from '../components/common/SEO';

function sortQuestions(questions, sortBy) {
  const order = { Easy: 0, Medium: 1, Hard: 2 };
  switch (sortBy) {
    case 'alphabetical':   return [...questions].sort((a, b) => a.title.localeCompare(b.title));
    case 'difficulty-asc': return [...questions].sort((a, b) => (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1));
    case 'difficulty-desc':return [...questions].sort((a, b) => (order[b.difficulty] ?? 1) - (order[a.difficulty] ?? 1));
    default: return questions;
  }
}

export default function TopicPage() {
  const { topicId } = useParams();
  const topic = useMemo(() => getTopicById(topicId), [topicId]);
  const allQuestions = useMemo(() => getQuestionsByTopicId(topicId), [topicId]);
  const unit = useMemo(() => topic ? getUnitById(topic.unitId) : null, [topic]);

  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { isBookmarked, toggleBookmark, isCompleted, toggleCompleted } = useTracking();

  const filtered = useMemo(() => {
    let qs = allQuestions;
    if (selectedDifficulties.length > 0) qs = qs.filter(q => selectedDifficulties.includes(q.difficulty));
    if (selectedTypes.length > 0) qs = qs.filter(q => selectedTypes.includes(q.type));
    return sortQuestions(qs, sortBy);
  }, [allQuestions, selectedDifficulties, selectedTypes, sortBy]);

  const toggleDifficulty = (d) =>
    setSelectedDifficulties(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  const toggleType = (t) =>
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const clearFilters = () => { setSelectedDifficulties([]); setSelectedTypes([]); setSortBy('default'); };

  if (!topic) {
    return (
      <div className="pb-16 min-h-screen flex items-center justify-center">
        <EmptyState icon={BookOpen} title="Topic not found" />
      </div>
    );
  }

  return (
    <div className="pb-16 min-h-screen">
      <SEO title={topic.title} description={`${topic.title} — practice questions for ${unit?.title || 'Java OOP'}.`} />
      <Container className="py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Units', href: '/units' },
          ...(unit ? [{ label: unit.title, href: `/unit/${unit.slug || unit.id}` }] : []),
          { label: topic.title }
        ]} />

        <div className="mt-6">
          <PageHeader
            title={topic.title}
            description={`${allQuestions.length} questions in this topic`}
          />

          {/* Filter toggle */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {allQuestions.length} questions
            </p>
            <Button
              variant={filtersOpen ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setFiltersOpen(v => !v)}
              className="gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <Card className="mb-5 gap-0 py-0 rounded-3xl border border-border bg-card shadow-xs">
                  <CardContent className="p-4">
                    <FilterBar
                      selectedDifficulties={selectedDifficulties}
                      onDifficultyChange={toggleDifficulty}
                      selectedTypes={selectedTypes}
                      onTypeChange={toggleType}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      onClear={clearFilters}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Questions */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={SlidersHorizontal}
              title="No questions match your filters"
              description="Try adjusting your difficulty or type filters."
            />
          ) : (
            <motion.div
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map(question => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    isBookmarked={isBookmarked(question.id)}
                    onToggleBookmark={() => toggleBookmark(question.id)}
                    isCompleted={isCompleted(question.id)}
                    onToggleCompleted={() => toggleCompleted(question.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
}

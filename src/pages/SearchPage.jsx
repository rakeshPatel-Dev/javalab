import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import Container from '../components/common/Container';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import QuestionCard from '../components/questions/QuestionCard';
import EmptyState from '../components/common/EmptyState';
import { getQuestions } from '../utils/dataHelper';
import { useTracking } from '../hooks/useTracking';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

function sortQuestions(questions, sortBy) {
  const order = { Easy: 0, Medium: 1, Hard: 2 };
  switch (sortBy) {
    case 'alphabetical':   return [...questions].sort((a, b) => a.title.localeCompare(b.title));
    case 'difficulty-asc': return [...questions].sort((a, b) => (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1));
    case 'difficulty-desc':return [...questions].sort((a, b) => (order[b.difficulty] ?? 1) - (order[a.difficulty] ?? 1));
    default: return questions;
  }
}

export default function SearchPage() {
  const allQuestions = useMemo(() => getQuestions(), []);
  const { isBookmarked, toggleBookmark, isCompleted, toggleCompleted } = useTracking();

  const [query, setQuery] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleDifficulty = (d) =>
    setSelectedDifficulties(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  const toggleType = (t) =>
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const clearFilters = () => { setSelectedDifficulties([]); setSelectedTypes([]); setSortBy('default'); };

  const filtered = useMemo(() => {
    let qs = allQuestions;

    if (query.trim()) {
      const q = query.toLowerCase();
      qs = qs.filter(item =>
        item.title?.toLowerCase().includes(q) ||
        item.question?.toLowerCase().includes(q) ||
        item.tags?.some(t => t.toLowerCase().includes(q)) ||
        item.type?.toLowerCase().includes(q) ||
        item.difficulty?.toLowerCase().includes(q) ||
        item.shortAnswer?.toLowerCase().includes(q)
      );
    }

    if (selectedDifficulties.length > 0) qs = qs.filter(q => selectedDifficulties.includes(q.difficulty));
    if (selectedTypes.length > 0) qs = qs.filter(q => selectedTypes.includes(q.type));

    return sortQuestions(qs, sortBy);
  }, [allQuestions, query, selectedDifficulties, selectedTypes, sortBy]);

  const hasSearch = query.trim() !== '';
  const hasFilters = selectedDifficulties.length > 0 || selectedTypes.length > 0 || sortBy !== 'default';

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8 text-center max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-2">Search Questions</h1>
          <p className="text-sm text-muted-foreground">
            Search across{' '}
            <Badge variant="secondary" className="font-semibold mx-0.5">
              {allQuestions.length}
            </Badge>{' '}
            Java OOP questions by title, keyword, tag, or type.
          </p>
        </div>

        {/* Search input */}
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by title, keyword, tag, or type..."
          autoFocus
          className="max-w-2xl mx-auto"
        />

        {/* Filter Toggle */}
        <div className="max-w-2xl mx-auto mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {hasSearch || hasFilters
              ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} found`
              : `${allQuestions.length} total questions`}
          </span>
          <Button
            variant={filtersOpen || hasFilters ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setFiltersOpen(v => !v)}
            className="gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {hasFilters ? 'Filters active' : 'Filters'}
            {hasFilters && (
              <span
                onClick={(e) => { e.stopPropagation(); clearFilters(); }}
                className="ml-0.5 hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </span>
            )}
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
              className="overflow-hidden max-w-2xl mx-auto"
            >
              <Card className="mt-3 gap-0 py-0">
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

        {/* Results */}
        <div className="mt-8 max-w-2xl mx-auto">
          {!hasSearch && !hasFilters ? (
            <div className="text-center py-16 text-muted-foreground">
              <SearchIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Type something to search questions</p>
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={SearchIcon}
              title="No questions found"
              description={`No results for "${query}". Try a different keyword or adjust your filters.`}
            />
          ) : (
            <motion.div className="space-y-3" layout>
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

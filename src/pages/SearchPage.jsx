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
    <div className="pb-16 min-h-screen">
      <SEO title="Search" description="Search questions across all OOP with Java units, topics, and difficulty levels." />
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8 text-center max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-2">Search Questions</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Search across{' '}
            <Badge variant="secondary" className="font-bold mx-0.5 rounded-lg px-2 bg-primary/10 text-primary">
              {allQuestions.length}
            </Badge>{' '}
            Java OOP questions by title, keyword, tag, or type.
          </p>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Sidebar Filters panel / Mobile Toggleable Filters Panel */}
          <aside className="md:col-span-4 lg:col-span-3 sticky top-24 space-y-4">
            {/* Filter Toggle for Mobile */}
            <div className="flex md:hidden items-center justify-between p-1 bg-secondary rounded-2xl border border-border">
              <span className="text-xs font-bold text-muted-foreground px-3">
                {filtered.length} results
              </span>
              <Button
                variant={filtersOpen || hasFilters ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setFiltersOpen(v => !v)}
                className="gap-1.5 rounded-xl cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {hasFilters ? 'Filters Active' : 'Filters'}
                {hasFilters && (
                  <span
                    onClick={(e) => { e.stopPropagation(); clearFilters(); }}
                    className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </span>
                )}
              </Button>
            </div>

            {/* Filters panel (Always visible on desktop, toggleable on mobile) */}
            <div className={`${filtersOpen ? 'block' : 'hidden md:block'} animate-in slide-in-from-top-4 duration-300`}>
              <Card className="rounded-2xl border border-border bg-card shadow-xs gap-0 py-0">
                <CardContent className="p-5">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                    Refine Search
                  </h3>
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
            </div>
          </aside>

          {/* Search Header + Results Column */}
          <section className="md:col-span-8 lg:col-span-9 space-y-6">
            {/* Search Input Box */}
            <div className="relative w-full shadow-xs rounded-2xl">
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search by title, keyword, tag, or type..."
                autoFocus
                className="w-full bg-card rounded-2xl"
              />
            </div>

            {/* Results Header Status */}
            <div className="hidden md:flex justify-between items-center px-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {hasSearch || hasFilters
                  ? `Found ${filtered.length} result${filtered.length !== 1 ? 's' : ''}`
                  : `Showing all ${allQuestions.length} questions`}
              </span>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-primary hover:text-destructive transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  Clear all filters
                </button>
              )}
            </div>

            {/* Results Grid / List */}
            <div className="space-y-4">
              {!hasSearch && !hasFilters ? (
                <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border p-6 shadow-xs">
                  <SearchIcon className="w-12 h-12 mx-auto mb-4 text-primary opacity-30 animate-pulse" />
                  <h3 className="text-sm font-bold text-foreground mb-1">Start Searching</h3>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    Type a keyword above or select filters on the left to browse the Java OOP question repository.
                  </p>
                </div>
              ) : filtered.length === 0 ? (
                <EmptyState
                  icon={SearchIcon}
                  title="No questions found"
                  description={`We couldn't find any results matching "${query}". Try adjusting your filters or spelling.`}
                />
              ) : (
                <motion.div className="space-y-4" layout>
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
          </section>

        </div>
      </Container>
    </div>
  );
}

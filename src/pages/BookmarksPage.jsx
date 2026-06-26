import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, ArrowRight } from 'lucide-react';
import Container from '../components/common/Container';
import PageHeader from '../components/common/PageHeader';
import QuestionCard from '../components/questions/QuestionCard';
import EmptyState from '../components/common/EmptyState';
import { useTracking } from '../hooks/useTracking';

export default function BookmarksPage() {
  const { getBookmarkedQuestions, isBookmarked, toggleBookmark, isCompleted, toggleCompleted } = useTracking();
  const bookmarked = useMemo(() => getBookmarkedQuestions(), [getBookmarkedQuestions]);

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <Container className="py-8">
        <PageHeader
          title="Bookmarks"
          badge="Saved"
          description={
            bookmarked.length > 0
              ? `You have ${bookmarked.length} bookmarked question${bookmarked.length !== 1 ? 's' : ''}.`
              : 'Questions you bookmark will appear here for quick review.'
          }
        />

        {bookmarked.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No bookmarks yet"
            description="Bookmark questions as you study to save them here for quick revision."
            action={
              <Link
                to="/units"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Browse Units
                <ArrowRight className="w-4 h-4" />
              </Link>
            }
          />
        ) : (
          <motion.div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {bookmarked.map(question => (
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
      </Container>
    </div>
  );
}

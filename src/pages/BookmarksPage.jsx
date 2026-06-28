import  { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, ArrowRight, BookmarkMinus, Clock, ArrowUpRight } from 'lucide-react';
import Container from '../components/common/Container';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { useTracking } from '../hooks/useTracking';
import { getUnitById } from '../utils/dataHelper';
import { Badge } from '../components/ui/badge';
import { SEO } from '../components/common/SEO';

export default function BookmarksPage() {
  const { getBookmarkedQuestions, toggleBookmark } = useTracking();
  const bookmarked = useMemo(() => getBookmarkedQuestions(), [getBookmarkedQuestions]);

  return (
    <div className="pb-16 min-h-screen">
      <SEO title="Bookmarks" description="View your bookmarked OOP with Java practice questions." />
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
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/95 transition-all shadow-xs"
              >
                Browse Units
                <ArrowRight className="w-4 h-4" />
              </Link>
            }
          />
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            <AnimatePresence mode="popLayout">
              {bookmarked.map(question => {
                const unit = getUnitById(question.unitId);
                return (
                  <motion.div
                    key={question.id}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                    }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="h-full"
                  >
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 relative group flex flex-col h-full">
                      {/* Top Row: Unit Badge and Remove Bookmark Button */}
                      <div className="flex justify-between items-start mb-4 gap-3">
                        <Badge variant="secondary" className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold truncate max-w-[80%]">
                          Unit {question.unitId}: {unit?.title || 'Java'}
                        </Badge>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleBookmark(question.id);
                          }}
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded-full transition-colors cursor-pointer shrink-0"
                          title="Remove Bookmark"
                        >
                          <BookmarkMinus className="w-4 h-4 fill-current" />
                        </button>
                      </div>

                      {/* Question category/tag */}
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5 block">
                        {question.type} · {question.difficulty}
                      </span>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-150 line-clamp-2">
                        {question.title}
                      </h3>

                      {/* Italicized Preview box */}
                      <div className="bg-secondary p-3.5 rounded-2xl mb-4 flex-grow border border-border/40">
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 italic">
                          "{question.question}"
                        </p>
                      </div>

                      {/* Bottom view action */}
                      <Link 
                        to={`/question/${question.slug || question.id}`}
                        className="mt-auto flex items-center justify-between text-xs font-bold text-primary hover:underline pt-2 border-t border-border/40"
                      >
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {question.estimatedTime || 10} min read
                        </span>
                        <span className="flex items-center gap-0.5">
                          View Question
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>
    </div>
  );
}

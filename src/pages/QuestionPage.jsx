import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Eye, EyeOff, Clock, Star,
  BookOpen, AlertCircle, Tag as TagIcon, HelpCircle
} from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumb from '../components/common/Breadcrumb';
import DifficultyBadge from '../components/common/DifficultyBadge';
import Tag from '../components/common/Tag';
import BookmarkButton from '../components/common/BookmarkButton';
import CompletedButton from '../components/common/CompletedButton';
import CodeBlock from '../components/common/CodeBlock';
import EmptyState from '../components/common/EmptyState';
import { getQuestionById, getTopicById, getUnitById, getQuestions } from '../utils/dataHelper';
import { useTracking } from '../hooks/useTracking';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const TYPE_COLORS = {
  Theory:      'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30',
  Programming: 'text-violet-600 bg-violet-50 border-violet-100 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-900/30',
  MCQ:         'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30',
  Interview:   'text-pink-600 bg-pink-50 border-pink-100 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-900/30',
  Viva:        'text-teal-600 bg-teal-50 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-900/30',
  Debugging:   'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-900/30',
};

// Simple markdown-like renderer for detailed answers
function renderAnswer(text) {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className={`leading-relaxed ${line.trim() === '' ? 'my-1' : 'mb-1.5'}`}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
}

export default function QuestionPage() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const question = useMemo(() => getQuestionById(questionId), [questionId]);
  const topic = useMemo(() => question ? getTopicById(question.topicId) : null, [question]);
  const unit = useMemo(() => topic ? getUnitById(topic.unitId) : null, [topic]);

  const allQuestions = useMemo(() => getQuestions(), []);
  const topicQuestions = useMemo(
    () => question ? allQuestions.filter(q => q.topicId === question.topicId) : [],
    [allQuestions, question]
  );

  const currentIdx = topicQuestions.findIndex(q => q.id === question?.id);
  const prevQ = currentIdx > 0 ? topicQuestions[currentIdx - 1] : null;
  const nextQ = currentIdx < topicQuestions.length - 1 ? topicQuestions[currentIdx + 1] : null;

  const [answerVisible, setAnswerVisible] = useState(false);
  const { isBookmarked, toggleBookmark, isCompleted, toggleCompleted } = useTracking();

  if (!question) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <EmptyState icon={HelpCircle} title="Question not found" description="This question does not exist." />
      </div>
    );
  }

  const typeClass = TYPE_COLORS[question.type] || '';

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <Container className="py-8 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Units', href: '/units' },
          ...(unit ? [{ label: unit.title, href: `/unit/${unit.slug || unit.id}` }] : []),
          ...(topic ? [{ label: topic.title, href: `/topic/${topic.slug || topic.id}` }] : []),
          { label: `Q${question.id}` }
        ]} />

        {/* Question Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="mt-6 gap-0 py-0">
            <CardContent className="p-6">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md ${typeClass}`}
                >
                  {question.type}
                </Badge>
                <DifficultyBadge difficulty={question.difficulty} />
                {question.isImportant && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30"
                  >
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    Important
                  </Badge>
                )}
                {question.isRepeated && (
                  <Badge
                    variant="outline"
                    className="text-xs font-semibold text-violet-600 bg-violet-50 border-violet-100 dark:bg-violet-900/20 dark:border-violet-900/30"
                  >
                    Repeated
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl font-bold text-foreground leading-snug mb-4">
                {question.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4 border-t border-border/60 pt-4">
                {question.marks && (
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {question.marks} Marks
                  </span>
                )}
                {question.estimatedTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    ~{question.estimatedTime} min
                  </span>
                )}
                {question.examFrequency && (
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {question.examFrequency} Frequency
                  </span>
                )}
                {question.source && (
                  <span>{question.source.type} · {question.source.year}</span>
                )}
              </div>

              {/* Tags */}
              {question.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <TagIcon className="w-3.5 h-3.5 text-muted-foreground mt-0.5" />
                  {question.tags.map(tag => <Tag key={tag} name={tag} />)}
                </div>
              )}

              {/* Actions */}
              <Separator className="mb-4" />
              <div className="flex items-center gap-2">
                <BookmarkButton
                  isBookmarked={isBookmarked(question.id)}
                  onClick={() => toggleBookmark(question.id)}
                  showText
                />
                <CompletedButton
                  isCompleted={isCompleted(question.id)}
                  onClick={() => toggleCompleted(question.id)}
                  showText
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* The Question */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          <Card className="mt-5 gap-0 py-0">
            <CardContent className="p-6">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Question</h2>
              <p className="text-foreground text-base leading-relaxed font-medium">
                {question.question}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Answer Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.14 }}
        >
          <Card className="mt-4 overflow-hidden gap-0 py-0">
            {/* Toggle button */}
            <Button
              variant="ghost"
              onClick={() => setAnswerVisible(v => !v)}
              className="w-full flex items-center justify-between px-6 py-4 h-auto rounded-none hover:bg-muted/50 transition-colors duration-150"
            >
              <div className="flex items-center gap-2">
                {answerVisible ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-primary" />}
                <span className="text-sm font-semibold text-foreground">
                  {answerVisible ? 'Hide Answer' : 'Show Answer'}
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-250 ${answerVisible ? 'rotate-90' : ''}`} />
            </Button>

            <AnimatePresence>
              {answerVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-border/60">
                    {/* Short answer */}
                    {question.shortAnswer && (
                      <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-xs font-semibold text-primary mb-1">Quick Answer</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{question.shortAnswer}</p>
                      </div>
                    )}

                    {/* Detailed answer */}
                    {question.detailedAnswer && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Detailed Answer</p>
                        <div className="text-sm text-muted-foreground">
                          {renderAnswer(question.detailedAnswer)}
                        </div>
                      </div>
                    )}

                    {/* Code block */}
                    {question.code && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Code Example</p>
                        <CodeBlock code={question.code} fileName={`${question.slug || 'Example'}.java`} />
                      </div>
                    )}

                    {/* Output */}
                    {question.output && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Output</p>
                        <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto border border-slate-800">
                          {question.output}
                        </pre>
                      </div>
                    )}

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="mt-4 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
                        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Explanation</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{question.explanation}</p>
                      </div>
                    )}

                    {/* Common mistakes */}
                    {question.commonMistakes?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2">Common Mistakes</p>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          {question.commonMistakes.map((m, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 flex-shrink-0" />
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Related topics */}
                    {question.relatedTopics?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Related Topics</p>
                        <div className="flex flex-wrap gap-1.5">
                          {question.relatedTopics.map(t => <Tag key={t} name={t} />)}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Previous / Next navigation */}
        <div className="flex items-center justify-between mt-6 gap-3">
          {prevQ ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="max-w-[45%] gap-2"
              onClick={() => setAnswerVisible(false)}
            >
              <Link to={`/question/${prevQ.slug || prevQ.id}`}>
                <ChevronLeft className="w-4 h-4 flex-shrink-0" />
                <span className="truncate text-xs">{prevQ.title}</span>
              </Link>
            </Button>
          ) : <div />}

          {nextQ ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="max-w-[45%] gap-2 ml-auto"
              onClick={() => setAnswerVisible(false)}
            >
              <Link to={`/question/${nextQ.slug || nextQ.id}`}>
                <span className="truncate text-xs">{nextQ.title}</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              </Link>
            </Button>
          ) : <div />}
        </div>
      </Container>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { getQuestions, getQuestionsByUnitId, getQuestionsByTopicId } from '../utils/dataHelper';

export const useTracking = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('java_hub_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem('java_hub_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('java_hub_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('java_hub_completed', JSON.stringify(completed));
  }, [completed]);

  const isBookmarked = (id) => bookmarks.includes(parseInt(id));

  const toggleBookmark = (id) => {
    const numericId = parseInt(id);
    setBookmarks(prev => 
      prev.includes(numericId)
        ? prev.filter(bId => bId !== numericId)
        : [...prev, numericId]
    );
  };

  const isCompleted = (id) => completed.includes(parseInt(id));

  const toggleCompleted = (id) => {
    const numericId = parseInt(id);
    setCompleted(prev => 
      prev.includes(numericId)
        ? prev.filter(cId => cId !== numericId)
        : [...prev, numericId]
    );
  };

  const getBookmarkedQuestions = () => {
    const allQuestions = getQuestions();
    return allQuestions.filter(q => bookmarks.includes(q.id));
  };

  const getUnitProgress = (unitId) => {
    const unitQuestions = getQuestionsByUnitId(unitId);
    const total = unitQuestions.length;
    if (total === 0) return { completed: 0, total: 0, percentage: 0 };
    
    const done = unitQuestions.filter(q => completed.includes(q.id)).length;
    return {
      completed: done,
      total,
      percentage: Math.round((done / total) * 100)
    };
  };

  const getTopicProgress = (topicId) => {
    const topicQuestions = getQuestionsByTopicId(topicId);
    const total = topicQuestions.length;
    if (total === 0) return { completed: 0, total: 0, percentage: 0 };

    const done = topicQuestions.filter(q => completed.includes(q.id)).length;
    return {
      completed: done,
      total,
      percentage: Math.round((done / total) * 100)
    };
  };

  const getOverallProgress = () => {
    const allQuestions = getQuestions();
    const total = allQuestions.length;
    if (total === 0) return { completed: 0, total: 0, percentage: 0 };

    const done = allQuestions.filter(q => completed.includes(q.id)).length;
    return {
      completed: done,
      total,
      percentage: Math.round((done / total) * 100)
    };
  };

  return {
    bookmarks,
    completed,
    isBookmarked,
    toggleBookmark,
    isCompleted,
    toggleCompleted,
    getBookmarkedQuestions,
    getUnitProgress,
    getTopicProgress,
    getOverallProgress
  };
};

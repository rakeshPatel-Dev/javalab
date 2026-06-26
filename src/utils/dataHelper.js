import unitsData from '../data/units.json';
import topicsData from '../data/topics.json';
import questionsData from '../data/questions.json';

// Cache processed data for efficiency
let cachedUnits = null;
let cachedTopics = null;
let cachedQuestions = [...questionsData];

export const getQuestions = () => cachedQuestions;

export const getUnits = () => {
  if (cachedUnits) return cachedUnits;

  cachedUnits = unitsData.map(unit => {
    const unitQuestions = questionsData.filter(q => q.unitId === unit.id);
    const unitTopics = topicsData.filter(t => t.unitId === unit.id);
    
    // Count difficulties
    const easyCount = unitQuestions.filter(q => q.difficulty === 'Easy').length;
    const mediumCount = unitQuestions.filter(q => q.difficulty === 'Medium').length;
    const hardCount = unitQuestions.filter(q => q.difficulty === 'Hard').length;

    return {
      ...unit,
      questionCount: unitQuestions.length,
      topicsCount: unitTopics.length,
      stats: {
        easy: easyCount,
        medium: mediumCount,
        hard: hardCount
      }
    };
  });

  return cachedUnits;
};

export const getTopics = () => {
  if (cachedTopics) return cachedTopics;

  cachedTopics = topicsData.map(topic => {
    const topicQuestions = questionsData.filter(q => q.topicId === topic.id);
    
    const easyCount = topicQuestions.filter(q => q.difficulty === 'Easy').length;
    const mediumCount = topicQuestions.filter(q => q.difficulty === 'Medium').length;
    const hardCount = topicQuestions.filter(q => q.difficulty === 'Hard').length;

    return {
      ...topic,
      questionCount: topicQuestions.length,
      stats: {
        easy: easyCount,
        medium: mediumCount,
        hard: hardCount
      }
    };
  });

  return cachedTopics;
};

export const getUnitById = (unitId) => {
  const units = getUnits();
  if (!unitId) return null;
  const parsedId = parseInt(unitId);
  if (!isNaN(parsedId) && String(parsedId) === String(unitId).trim()) {
    const found = units.find(u => u.id === parsedId);
    if (found) return found;
  }
  return units.find(u => u.slug === unitId) || null;
};

export const getTopicById = (topicId) => {
  const topics = getTopics();
  if (!topicId) return null;
  const parsedId = parseInt(topicId);
  if (!isNaN(parsedId) && String(parsedId) === String(topicId).trim()) {
    const found = topics.find(t => t.id === parsedId);
    if (found) return found;
  }
  return topics.find(t => t.slug === topicId) || null;
};

export const getQuestionById = (questionId) => {
  if (!questionId) return null;
  const parsedId = parseInt(questionId);
  if (!isNaN(parsedId) && String(parsedId) === String(questionId).trim()) {
    const found = questionsData.find(q => q.id === parsedId);
    if (found) return found;
  }
  return questionsData.find(q => q.slug === questionId) || null;
};

export const getTopicsByUnitId = (unitId) => {
  const unit = getUnitById(unitId);
  if (!unit) return [];
  const topics = getTopics();
  return topics.filter(t => t.unitId === unit.id);
};

export const getQuestionsByTopicId = (topicId) => {
  const topic = getTopicById(topicId);
  if (!topic) return [];
  return questionsData.filter(q => q.topicId === topic.id);
};

export const getQuestionsByUnitId = (unitId) => {
  const unit = getUnitById(unitId);
  if (!unit) return [];
  return questionsData.filter(q => q.unitId === unit.id);
};

// Returns statistics for search and home page
export const getGlobalStats = () => {
  const questions = getQuestions();
  const units = getUnits();
  const topics = getTopics();

  return {
    totalUnits: units.length,
    totalTopics: topics.length,
    totalQuestions: questions.length,
    difficulty: {
      easy: questions.filter(q => q.difficulty === 'Easy').length,
      medium: questions.filter(q => q.difficulty === 'Medium').length,
      hard: questions.filter(q => q.difficulty === 'Hard').length
    },
    types: questions.reduce((acc, q) => {
      acc[q.type] = (acc[q.type] || 0) + 1;
      return acc;
    }, {})
  };
};

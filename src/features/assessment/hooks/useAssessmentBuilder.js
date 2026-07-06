'use client';

import { useState, useCallback } from 'react';

const initialDomains = [
  {
    id: 'identity',
    label: 'Identity & Purpose',
    description: 'How clearly do you see your identity beyond work?',
    color: '#534AB7',
    openQuestion: 'What does purpose mean to you now?',
    questions: [],
  },
  {
    id: 'engagement',
    label: 'Engagement & Vitality',
    description: 'How engaged and energized do you feel about your future?',
    color: '#E67E22',
    openQuestion: 'What energizes you most right now?',
    questions: [],
  },
  {
    id: 'connection',
    label: 'Connection & Belonging',
    description: 'How connected do you feel to others?',
    color: '#2ECC71',
    openQuestion: 'What relationships matter most to you?',
    questions: [],
  },
  {
    id: 'growth',
    label: 'Growth & Learning',
    description: 'How are you continuing to grow and learn?',
    color: '#3498DB',
    openQuestion: 'What would you like to learn next?',
    questions: [],
  },
  {
    id: 'meaning',
    label: 'Meaning & Legacy',
    description: 'How meaningful is your life beyond work?',
    color: '#9B59B6',
    openQuestion: 'What legacy do you want to leave?',
    questions: [],
  },
];

export function useAssessmentBuilder() {
  const [domains, setDomains] = useState(initialDomains);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);

  const addDomain = useCallback(() => {
    const newDomain = {
      id: `domain${domains.length + 1}`,
      label: 'New Domain',
      description: 'Domain description',
      color: '#C9A84C',
      openQuestion: 'Reflection question...',
      questions: [],
    };
    setDomains([...domains, newDomain]);
  }, [domains]);

  const deleteDomain = useCallback((id) => {
    setDomains(domains.filter(d => d.id !== id));
  }, [domains]);

  const moveDomain = useCallback((index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= domains.length) return;
    const updated = [...domains];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setDomains(updated);
  }, [domains]);

  const updateDomain = useCallback((id, data) => {
    setDomains(domains.map(d => d.id === id ? { ...d, ...data } : d));
  }, [domains]);

  const addQuestion = useCallback((domainId) => {
    const domain = domains.find(d => d.id === domainId);
    if (!domain) return;
    const newQuestion = {
      id: `q${domain.questions.length + 1}`,
      text: 'New question text...',
      type: 'single_choice',
      options: [
        { id: `opt${Date.now()}`, label: 'Option 1', value: 5 },
        { id: `opt${Date.now() + 1}`, label: 'Option 2', value: 4 },
        { id: `opt${Date.now() + 2}`, label: 'Option 3', value: 3 },
        { id: `opt${Date.now() + 3}`, label: 'Option 4', value: 2 },
        { id: `opt${Date.now() + 4}`, label: 'Option 5', value: 1 },
      ],
    };
    domain.questions.push(newQuestion);
    setDomains([...domains]);
  }, [domains]);

  const deleteQuestion = useCallback((domainId, questionId) => {
    const domain = domains.find(d => d.id === domainId);
    if (!domain) return;
    domain.questions = domain.questions.filter(q => q.id !== questionId);
    setDomains([...domains]);
  }, [domains]);

  const moveQuestion = useCallback((domainId, index, direction) => {
    const domain = domains.find(d => d.id === domainId);
    if (!domain) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= domain.questions.length) return;
    const updated = [...domain.questions];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    domain.questions = updated;
    setDomains([...domains]);
  }, [domains]);

  return {
    domains,
    isPreviewMode,
    currentDomainIndex,
    setCurrentDomainIndex,
    togglePreview: () => setIsPreviewMode(!isPreviewMode),
    addDomain,
    deleteDomain,
    moveDomain,
    updateDomain,
    addQuestion,
    deleteQuestion,
    moveQuestion,
  };
}
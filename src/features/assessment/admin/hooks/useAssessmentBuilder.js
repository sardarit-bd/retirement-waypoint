'use client';

import { useState, useCallback } from 'react';
import { mockAssessment } from '../data/mockData';

export function useAssessmentBuilder() {
  const [assessment, setAssessment] = useState(mockAssessment);
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [tempAssessment, setTempAssessment] = useState(null);

  const currentDomain = assessment.domains[currentDomainIndex];

  // Start editing - clone entire assessment
  const startEditing = useCallback(() => {
    setTempAssessment(JSON.parse(JSON.stringify(assessment)));
    setIsEditing(true);
  }, [assessment]);

  // Save - collect entire assessment data into single payload
  const saveEditing = useCallback(() => {
    if (tempAssessment) {
      // Prepare payload for future backend
      const payload = {
        ...tempAssessment,
        // Add any additional fields needed
        updatedAt: new Date().toISOString(),
      };
      setAssessment(tempAssessment);
      console.log('📦 Save payload:', payload);
    }
    setIsEditing(false);
    setTempAssessment(null);
  }, [tempAssessment]);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setTempAssessment(null);
  }, []);

  // Helper to get current data (assessment or temp)
  const getData = useCallback(() => {
    return isEditing ? tempAssessment : assessment;
  }, [isEditing, assessment, tempAssessment]);

  // Update functions that work on temp data during edit
  const updateDomain = useCallback((domainId, data) => {
    const target = isEditing ? tempAssessment : assessment;
    if (!target) return;
    
    const updated = {
      ...target,
      domains: target.domains.map((d) =>
        d.id === domainId ? { ...d, ...data } : d
      ),
    };
    
    if (isEditing) {
      setTempAssessment(updated);
    } else {
      setAssessment(updated);
    }
  }, [isEditing, assessment, tempAssessment]);

  const updateQuestion = useCallback((domainId, questionId, data) => {
    const target = isEditing ? tempAssessment : assessment;
    if (!target) return;
    
    const updated = {
      ...target,
      domains: target.domains.map((d) =>
        d.id === domainId
          ? {
              ...d,
              questions: d.questions.map((q) =>
                q.id === questionId ? { ...q, ...data } : q
              ),
            }
          : d
      ),
    };
    
    if (isEditing) {
      setTempAssessment(updated);
    } else {
      setAssessment(updated);
    }
  }, [isEditing, assessment, tempAssessment]);

  const updateReflection = useCallback((domainId, data) => {
    const target = isEditing ? tempAssessment : assessment;
    if (!target) return;
    
    const updated = {
      ...target,
      domains: target.domains.map((d) =>
        d.id === domainId ? { ...d, ...data } : d
      ),
    };
    
    if (isEditing) {
      setTempAssessment(updated);
    } else {
      setAssessment(updated);
    }
  }, [isEditing, assessment, tempAssessment]);

  // Question CRUD
  const addQuestion = useCallback((domainId) => {
    const target = isEditing ? tempAssessment : assessment;
    if (!target) return;
    
    const newQuestion = {
      id: `q${Date.now()}`,
      text: 'New question text...',
      type: 'single_choice',
      required: true,
      options: [
        { id: `opt${Date.now()}_1`, label: 'Strongly agree', value: 5 },
        { id: `opt${Date.now()}_2`, label: 'Agree', value: 4 },
        { id: `opt${Date.now()}_3`, label: 'Neutral', value: 3 },
        { id: `opt${Date.now()}_4`, label: 'Disagree', value: 2 },
        { id: `opt${Date.now()}_5`, label: 'Strongly disagree', value: 1 },
      ],
    };
    
    const updated = {
      ...target,
      domains: target.domains.map((d) =>
        d.id === domainId
          ? { ...d, questions: [...d.questions, newQuestion] }
          : d
      ),
    };
    
    if (isEditing) {
      setTempAssessment(updated);
    } else {
      setAssessment(updated);
    }
  }, [isEditing, assessment, tempAssessment]);

  const deleteQuestion = useCallback((domainId, questionId) => {
    const target = isEditing ? tempAssessment : assessment;
    if (!target) return;
    
    const updated = {
      ...target,
      domains: target.domains.map((d) =>
        d.id === domainId
          ? { ...d, questions: d.questions.filter((q) => q.id !== questionId) }
          : d
      ),
    };
    
    if (isEditing) {
      setTempAssessment(updated);
    } else {
      setAssessment(updated);
    }
  }, [isEditing, assessment, tempAssessment]);

  const duplicateQuestion = useCallback((domainId, questionId) => {
    const target = isEditing ? tempAssessment : assessment;
    if (!target) return;
    
    const domain = target.domains.find((d) => d.id === domainId);
    if (!domain) return;
    const question = domain.questions.find((q) => q.id === questionId);
    if (!question) return;
    
    const newQuestion = {
      ...question,
      id: `q${Date.now()}`,
      text: `${question.text} (Copy)`,
      options: question.options.map((o) => ({ ...o, id: `opt${Date.now()}_${Math.random()}` })),
    };
    
    const updated = {
      ...target,
      domains: target.domains.map((d) =>
        d.id === domainId
          ? { ...d, questions: [...d.questions, newQuestion] }
          : d
      ),
    };
    
    if (isEditing) {
      setTempAssessment(updated);
    } else {
      setAssessment(updated);
    }
  }, [isEditing, assessment, tempAssessment]);

  const moveQuestion = useCallback((domainId, questionIndex, direction) => {
    const target = isEditing ? tempAssessment : assessment;
    if (!target) return;
    
    const domain = target.domains.find((d) => d.id === domainId);
    if (!domain) return;
    const newIndex = questionIndex + direction;
    if (newIndex < 0 || newIndex >= domain.questions.length) return;
    
    const updatedQuestions = [...domain.questions];
    [updatedQuestions[questionIndex], updatedQuestions[newIndex]] = [
      updatedQuestions[newIndex],
      updatedQuestions[questionIndex],
    ];
    
    const updated = {
      ...target,
      domains: target.domains.map((d) =>
        d.id === domainId ? { ...d, questions: updatedQuestions } : d
      ),
    };
    
    if (isEditing) {
      setTempAssessment(updated);
    } else {
      setAssessment(updated);
    }
  }, [isEditing, assessment, tempAssessment]);

  const deleteDomain = useCallback((domainId) => {
    const target = isEditing ? tempAssessment : assessment;
    if (!target) return;
    
    const updated = {
      ...target,
      domains: target.domains.filter((d) => d.id !== domainId),
    };
    
    if (isEditing) {
      setTempAssessment(updated);
    } else {
      setAssessment(updated);
    }
    
    if (currentDomainIndex >= updated.domains.length - 1) {
      setCurrentDomainIndex(Math.max(0, updated.domains.length - 2));
    }
  }, [isEditing, assessment, tempAssessment, currentDomainIndex]);

  const duplicateDomain = useCallback((domainId) => {
    const target = isEditing ? tempAssessment : assessment;
    if (!target) return;
    
    const domain = target.domains.find((d) => d.id === domainId);
    if (!domain) return;
    
    const newDomain = {
      ...domain,
      id: `${domain.id}-copy`,
      key: `${domain.key}_copy`,
      label: `${domain.label} (Copy)`,
      questions: domain.questions.map((q) => ({
        ...q,
        id: `q${Date.now()}_${Math.random()}`,
        options: q.options.map((o) => ({ ...o, id: `opt${Date.now()}_${Math.random()}` })),
      })),
    };
    
    const updated = {
      ...target,
      domains: [...target.domains, newDomain],
    };
    
    if (isEditing) {
      setTempAssessment(updated);
    } else {
      setAssessment(updated);
    }
  }, [isEditing, assessment, tempAssessment]);

  const moveDomain = useCallback((index, direction) => {
    const target = isEditing ? tempAssessment : assessment;
    if (!target) return;
    
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= target.domains.length) return;
    
    const updatedDomains = [...target.domains];
    [updatedDomains[index], updatedDomains[newIndex]] = [
      updatedDomains[newIndex],
      updatedDomains[index],
    ];
    
    const updated = {
      ...target,
      domains: updatedDomains,
    };
    
    if (isEditing) {
      setTempAssessment(updated);
    } else {
      setAssessment(updated);
    }
    setCurrentDomainIndex(newIndex);
  }, [isEditing, assessment, tempAssessment]);

  // Navigation
  const goToDomain = useCallback((index) => {
    const data = getData();
    if (index >= 0 && index < data.domains.length) {
      setCurrentDomainIndex(index);
    }
  }, [getData]);

  const nextDomain = useCallback(() => {
    const data = getData();
    if (currentDomainIndex < data.domains.length - 1) {
      setCurrentDomainIndex(currentDomainIndex + 1);
    }
  }, [currentDomainIndex, getData]);

  const previousDomain = useCallback(() => {
    if (currentDomainIndex > 0) {
      setCurrentDomainIndex(currentDomainIndex - 1);
    }
  }, [currentDomainIndex]);

  const currentData = getData();
  const currentDomainData = currentData?.domains?.[currentDomainIndex] || null;

  return {
    assessment: currentData,
    currentDomain: currentDomainData,
    currentDomainIndex,
    isEditing,
    startEditing,
    saveEditing,
    cancelEditing,
    goToDomain,
    nextDomain,
    previousDomain,
    updateDomain,
    deleteDomain,
    duplicateDomain,
    moveDomain,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    moveQuestion,
    updateReflection,
    totalDomains: currentData?.domains?.length || 0,
  };
}
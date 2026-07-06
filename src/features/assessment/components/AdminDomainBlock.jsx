// features/assessment/admin/components/AdminDomainBlock.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, GripVertical, ChevronUp, ChevronDown, Copy, Trash2, Edit, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminQuestionBlock } from './AdminQuestionBlock';
import { cn } from '@/lib/utils';

export function AdminDomainBlock({ domain, isPreviewMode }) {
  const [questions, setQuestions] = useState(domain.questions || []);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: `q${questions.length + 1}`,
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
    setQuestions([...questions, newQuestion]);
  };

  const handleMoveQuestion = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= questions.length) return;
    const updated = [...questions];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setQuestions(updated);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleDuplicateQuestion = (index) => {
    const question = questions[index];
    const duplicated = {
      ...question,
      id: `q${questions.length + 1}`,
      text: `${question.text} (Copy)`,
    };
    setQuestions([...questions, duplicated]);
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-7">
        {questions.map((question, index) => (
          <AdminQuestionBlock
            key={question.id}
            question={question}
            index={index}
            isPreviewMode={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Domain Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-white/15 text-white/60 hover:bg-white/10 hover:text-white"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-white/15 text-white/60 hover:bg-white/10 hover:text-white"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-white/15 text-white/60 hover:bg-white/10 hover:text-white"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-white/15 text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <div className="flex-1" />
        <span className="text-xs text-white/30">{questions.length} questions</span>
      </div>

      {/* Questions */}
      <div className="space-y-7">
        <AnimatePresence>
          {questions.map((question, index) => (
            <AdminQuestionBlock
              key={question.id}
              question={question}
              index={index}
              isPreviewMode={false}
              onMoveUp={() => handleMoveQuestion(index, -1)}
              onMoveDown={() => handleMoveQuestion(index, 1)}
              onDelete={() => handleDeleteQuestion(index)}
              onDuplicate={() => handleDuplicateQuestion(index)}
              isFirst={index === 0}
              isLast={index === questions.length - 1}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Add Question Button */}
      <div className="pt-2">
        <Button
          onClick={handleAddQuestion}
          variant="outline"
          className="w-full rounded-xl border border-dashed border-white/15 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>
    </div>
  );
}
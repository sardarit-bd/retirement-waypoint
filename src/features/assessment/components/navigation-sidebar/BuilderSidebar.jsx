'use client';

import { cn } from '@/lib/utils';
import { CheckCircle, FileText, Layers, HelpCircle, Target, Sparkles, Eye } from 'lucide-react';

const STEPS = [
  { id: 'basic', label: 'Basic Information', icon: FileText },
  { id: 'sections', label: 'Sections', icon: Layers },
  { id: 'questions', label: 'Questions', icon: HelpCircle },
  { id: 'ranges', label: 'Result Ranges', icon: Target },
  { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
  { id: 'preview', label: 'Preview', icon: Eye },
];

export function BuilderSidebar({ currentStep, onStepChange, completedSteps }) {
  return (
    <div className="w-64 shrink-0">
      <div className="sticky top-24 space-y-1">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id);

          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={cn(
                'w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 text-left',
                isActive
                  ? 'bg-[#C9A84C]/10 text-[#C9A84C] shadow-sm'
                  : isCompleted
                  ? 'text-emerald-600 hover:bg-[#F8F5EF]'
                  : 'text-[#1B2B4B]/60 hover:bg-[#F8F5EF] hover:text-[#1B2B4B]'
              )}
            >
              <div
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  isActive
                    ? 'bg-[#C9A84C] text-[#1B2B4B]'
                    : isCompleted
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-[#1B2B4B]/5 text-[#1B2B4B]/40'
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <span className="flex-1">{step.label}</span>
              {isActive && (
                <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Save, X, Plus, Trash2, Copy, ChevronUp, ChevronDown, ArrowLeft, Loader2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { scaleOptions } from '../data/mockData';

const glassCard = 'rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl';

function QuestionItem({ question, index, domainId, isEditing, onUpdate, onDelete, onDuplicate, onMoveUp, onMoveDown }) {
  return (
    <div className="border-b border-white/10 pb-7 group">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/40">
          Item {index + 1}
        </p>
        {isEditing && (
          <div className="flex items-center gap-1">
            <button
              onClick={onMoveUp}
              className="rounded-full bg-white/10 p-1 text-white/40 hover:text-white hover:bg-white/20 transition-colors disabled:opacity-20"
              disabled={index === 0}
            >
              <ChevronUp className="h-3 w-3" />
            </button>
            <button
              onClick={onMoveDown}
              className="rounded-full bg-white/10 p-1 text-white/40 hover:text-white hover:bg-white/20 transition-colors"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
            <button
              onClick={onDuplicate}
              className="rounded-full bg-white/10 p-1 text-white/40 hover:text-white hover:bg-white/20 transition-colors"
            >
              <Copy className="h-3 w-3" />
            </button>
            <button
              onClick={onDelete}
              className="rounded-full bg-white/10 p-1 text-red-400/40 hover:text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
            </button>
            <div className="flex items-center gap-1 ml-1">
              <Switch
                checked={question.required}
                onCheckedChange={(checked) => onUpdate(domainId, question.id, { required: checked })}
                className="data-[state=checked]:bg-[#C9A84C] scale-75"
              />
              <Label className="text-[10px] text-white/40">Required</Label>
            </div>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mb-4">
          <Textarea
            value={question.text}
            onChange={(e) => onUpdate(domainId, question.id, { text: e.target.value })}
            className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl resize-none"
            rows={2}
          />
        </div>
      ) : (
        <p className="mb-4 text-base leading-7 text-white/85">{question.text}</p>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {scaleOptions.map((option) => (
          <button
            key={option.value}
            className="cursor-pointer rounded-xl border border-white/12 bg-white/8 px-3 py-3 text-xs font-semibold leading-snug text-white/65 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReflectionBlock({ domain, domainId, isEditing, onUpdate }) {
  return (
    <div className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-5 group">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">
          Reflection Question
        </label>
        {isEditing && (
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <Switch
                checked={true}
                onCheckedChange={() => {}}
                className="data-[state=checked]:bg-[#C9A84C] scale-75"
              />
              <Label className="text-[10px] text-white/40">Show</Label>
            </div>
          </div>
        )}
      </div>

      {isEditing ? (
        <div>
          <Textarea
            value={domain.openQuestion || ''}
            onChange={(e) => onUpdate(domainId, { openQuestion: e.target.value })}
            className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl resize-none"
            rows={2}
          />
        </div>
      ) : (
        <>
          <p className="mb-3 text-sm italic leading-7 text-white/70">
            {domain.openQuestion || 'No reflection question set.'}
          </p>
          <textarea
            className="min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
            placeholder="Share your thoughts here..."
            readOnly
          />
        </>
      )}
    </div>
  );
}

export function AdminAssessmentDomain({
  assessmentId,
  domain,
  domainIndex,
  totalDomains,
  isEditing,
  isSaving = false,
  onUpdateDomain,
  onDeleteDomain,
  onDuplicateDomain,
  onMoveDomain,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onDuplicateQuestion,
  onMoveQuestion,
  onUpdateReflection,
  onNext,
  onPrevious,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
}) {
  const router = useRouter();
  const totalItems = domain?.questions?.length || 0;
  const startItem = domainIndex * 3 + 1;
  const endItem = domainIndex * 3 + totalItems;

  const handleDomainFieldChange = (field, value) => {
    onUpdateDomain(domain.id, { [field]: value });
  };

  const handleBackToIntroduction = () => {
    router.push(`/admin/assessments/${assessmentId}/introduction`);
  };

  if (!domain) {
    return (
      <section className="relative min-h-screen overflow-x-hidden bg-[#1B2B4B] px-4 pb-20 pt-36 sm:px-6 lg:px-8 rounded-2xl">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-white/70 text-lg">Loading domain...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#1B2B4B] px-4 pb-20 pt-36 sm:px-6 lg:px-8 rounded-2xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#C9A84C]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToIntroduction}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer border border-white/10 rounded-full px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Introduction</span>
          </button>
        </div>

        <div className={`mx-auto max-w-4xl ${glassCard}`}>
          <div className="p-6 sm:p-8">
            <div className="flex justify-end mb-6">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={onCancelEditing}
                    disabled={isSaving}
                    className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-50"
                  >
                    <X className="mr-1 h-3.5 w-3.5" />
                    Cancel
                  </Button>
                  <Button
                    onClick={onSaveEditing}
                    disabled={isSaving}
                    className="rounded-full bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-1 h-3.5 w-3.5" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={onStartEditing}
                  className="rounded-full bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20"
                >
                  <Edit className="mr-1 h-3.5 w-3.5" />
                  Edit Domain
                </Button>
              )}
            </div>

            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="flex-1">
                <span
                  className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white"
                  style={{ backgroundColor: `${domain.color}55` }}
                >
                  {isEditing ? (
                    <Input
                      value={domain.label}
                      onChange={(e) => handleDomainFieldChange('label', e.target.value)}
                      className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-xs font-bold w-auto inline-block px-3 py-1"
                    />
                  ) : (
                    domain.label
                  )}
                </span>

                <h2 className="mb-2 text-2xl font-semibold text-white">
                  {isEditing ? (
                    <Input
                      value={domain.label}
                      onChange={(e) => handleDomainFieldChange('label', e.target.value)}
                      className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-2xl font-semibold"
                    />
                  ) : (
                    domain.label
                  )}
                </h2>

                <p className="max-w-2xl text-sm leading-7 text-white/65">
                  {isEditing ? (
                    <Textarea
                      value={domain.description}
                      onChange={(e) => handleDomainFieldChange('description', e.target.value)}
                      className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl resize-none"
                      rows={2}
                    />
                  ) : (
                    domain.description
                  )}
                </p>

                {isEditing && (
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => onMoveDomain(domainIndex, -1)}
                      className="rounded-full bg-white/10 p-1.5 text-white/40 hover:text-white hover:bg-white/20 transition-colors disabled:opacity-20"
                      disabled={domainIndex === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onMoveDomain(domainIndex, 1)}
                      className="rounded-full bg-white/10 p-1.5 text-white/40 hover:text-white hover:bg-white/20 transition-colors disabled:opacity-20"
                      disabled={domainIndex === totalDomains - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDuplicateDomain(domain.id)}
                      className="rounded-full bg-white/10 p-1.5 text-white/40 hover:text-white hover:bg-white/20 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteDomain(domain.id)}
                      className="rounded-full bg-white/10 p-1.5 text-red-400/40 hover:text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-3 text-sm font-semibold text-[#C9A84C] shrink-0">
                {startItem}–{endItem} of {domainIndex * 3 + totalItems} items
              </div>
            </div>

            <div className="space-y-7">
              <AnimatePresence>
                {domain.questions.map((question, index) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    index={index}
                    domainId={domain.id}
                    isEditing={isEditing}
                    onUpdate={onUpdateQuestion}
                    onDelete={() => onDeleteQuestion(domain.id, question.id)}
                    onDuplicate={() => onDuplicateQuestion(domain.id, question.id)}
                    onMoveUp={() => onMoveQuestion(domain.id, index, -1)}
                    onMoveDown={() => onMoveQuestion(domain.id, index, 1)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {isEditing && (
              <div className="pt-2">
                <Button
                  onClick={() => onAddQuestion(domain.id)}
                  className="w-full rounded-xl border border-dashed border-white/15 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>
            )}

            <ReflectionBlock
              domain={domain}
              domainId={domain.id}
              isEditing={isEditing}
              onUpdate={onUpdateReflection}
            />

            <div className="flex items-center justify-between gap-3 mt-7">
              <button
                disabled={domainIndex === 0}
                onClick={onPrevious}
                className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-default disabled:opacity-40"
              >
                Previous Domain
              </button>
              <button
                onClick={onNext}
                className="cursor-pointer rounded-xl bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#1B2B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D6B45A]"
              >
                {domainIndex === totalDomains - 1 ? 'See Results' : 'Next Domain'}
                <ChevronRight className="ml-2 h-4 w-4 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
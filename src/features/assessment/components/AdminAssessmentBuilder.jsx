'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, X, Pencil, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const glassCard = 'rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl';

const scaleOptions = [
  { label: 'Strongly agree', value: 5 },
  { label: 'Agree', value: 4 },
  { label: 'Neutral', value: 3 },
  { label: 'Disagree', value: 2 },
  { label: 'Strongly disagree', value: 1 },
];

// Mock data - EXACT same structure as public assessment
const mockAssessment = {
  title: 'Retirement Readiness Assessment',
  domains: [
    {
      key: 'identity',
      label: 'Identity & Purpose',
      description: 'How clearly do you see your identity beyond work?',
      color: '#534AB7',
      openQuestion: 'What does purpose mean to you now?',
      items: [
        'I have a clear sense of who I am outside of my professional role.',
        'I feel confident about what my daily life will look like after retirement.',
        'I have activities and interests that I am passionate about outside of work.',
      ],
    },
    {
      key: 'engagement',
      label: 'Engagement & Vitality',
      description: 'How engaged and energized do you feel about your future?',
      color: '#E67E22',
      openQuestion: 'What energizes you most right now?',
      items: [
        'I feel excited about my future after retirement.',
        'I have a sense of purpose that extends beyond my career.',
        'I look forward to each day with enthusiasm.',
      ],
    },
  ],
};

function EditableText({ 
  value, 
  field, 
  isEditing, 
  editField, 
  setEditField, 
  tempData, 
  setTempData,
  type = 'text',
  rows = 2,
  className = ''
}) {
  const isActive = editField === field;

  if (isEditing && isActive) {
    return type === 'textarea' ? (
      <Textarea
        value={tempData[field]}
        onChange={(e) => setTempData({ ...tempData, [field]: e.target.value })}
        className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl resize-none"
        rows={rows}
      />
    ) : (
      <Input
        value={tempData[field]}
        onChange={(e) => setTempData({ ...tempData, [field]: e.target.value })}
        className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl"
      />
    );
  }

  return (
    <div className="group relative inline-block">
      {isEditing && (
        <button
          onClick={() => setEditField(isActive ? null : field)}
          className="absolute -left-7 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-1 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 hover:text-white"
        >
          <Pencil className="h-3 w-3" />
        </button>
      )}
      <span className={className}>{value}</span>
    </div>
  );
}

export function AdminAssessmentBuilder() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [editField, setEditField] = useState(null);
  
  const [assessment, setAssessment] = useState(mockAssessment);
  const [tempData, setTempData] = useState(assessment);

  const currentDomain = assessment.domains[currentDomainIndex];
  const totalItems = assessment.domains.reduce((sum, d) => sum + d.items.length, 0);
  const answeredTotal = 0; // Mock for now

  const handleEdit = () => {
    setTempData(assessment);
    setIsEditing(true);
  };

  const handleSave = () => {
    setAssessment(tempData);
    setIsEditing(false);
    setEditField(null);
  };

  const handleCancel = () => {
    setTempData(assessment);
    setIsEditing(false);
    setEditField(null);
  };

  const handleNext = () => {
    if (currentDomainIndex < assessment.domains.length - 1) {
      setCurrentDomainIndex(currentDomainIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentDomainIndex > 0) {
      setCurrentDomainIndex(currentDomainIndex - 1);
    }
  };

  // Preview mode - show exact public view without edit controls
  if (isPreviewMode) {
    return (
      <section className="relative min-h-screen overflow-x-hidden bg-[#1B2B4B] px-4 pb-20 pt-36 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#C9A84C]/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Preview Controls */}
          <div className="flex items-center justify-end gap-3 mb-6">
            <Button
              onClick={() => setIsPreviewMode(false)}
              variant="outline"
              className="rounded-full border-white/15 text-white hover:bg-white/10"
            >
              <Edit className="mr-2 h-4 w-4" />
              Back to Edit
            </Button>
          </div>

          {/* EXACT public assessment view */}
          <div className={`mx-auto max-w-4xl ${glassCard}`}>
            <div className="p-6 sm:p-8">
              {/* Domain Header - EXACT clone */}
              <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <span
                    className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white"
                    style={{ backgroundColor: `${currentDomain.color}55` }}
                  >
                    {currentDomain.label}
                  </span>
                  <h2 className="mb-2 text-2xl font-semibold text-white">
                    {currentDomain.label}
                  </h2>
                  <p className="max-w-2xl text-sm leading-7 text-white/65">
                    {currentDomain.description}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-3 text-sm font-semibold text-[#C9A84C]">
                  {currentDomainIndex * 3 + 1}–{currentDomainIndex * 3 + currentDomain.items.length} of {totalItems} items
                </div>
              </div>

              {/* Questions - EXACT clone */}
              <div className="space-y-7">
                {currentDomain.items.map((item, index) => (
                  <div key={index} className="border-b border-white/10 pb-7">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/40">
                      Item {currentDomainIndex * 3 + index + 1}
                    </p>
                    <p className="mb-4 text-base leading-7 text-white/85">{item}</p>
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
                ))}
              </div>

              {/* Reflection - EXACT clone */}
              <div className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                  Reflection Question
                </label>
                <p className="mb-3 text-sm italic leading-7 text-white/70">
                  {currentDomain.openQuestion}
                </p>
                <textarea
                  className="min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  placeholder="Share your thoughts here..."
                  readOnly
                />
              </div>

              {/* Navigation - EXACT clone */}
              <div className="flex items-center justify-between gap-3 mt-7">
                <button
                  disabled={currentDomainIndex === 0}
                  onClick={handlePrevious}
                  className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-default disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="cursor-pointer rounded-xl bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#1B2B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D6B45A]"
                >
                  {currentDomainIndex === assessment.domains.length - 1 ? 'See Results' : 'Next Domain'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Edit Mode - same as public but with edit controls
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#1B2B4B] px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#C9A84C]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Top Controls */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/admin/assessments')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-4">
              <span className="text-xs text-white/40">Preview</span>
              <Switch
                checked={isPreviewMode}
                onCheckedChange={setIsPreviewMode}
                className="data-[state=checked]:bg-[#C9A84C]"
              />
              <span className="text-xs text-white/40">Edit</span>
            </div>

            {isEditing ? (
              <>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="rounded-full border-white/15 text-white hover:bg-white/10"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="rounded-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                onClick={handleEdit}
                variant="outline"
                className="rounded-full border-white/15 text-white hover:bg-white/10"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Assessment
              </Button>
            )}
          </div>
        </div>

        {/* Assessment Content - EXACT public view with edit controls */}
        <div className={`mx-auto max-w-4xl ${glassCard}`}>
          <div className="p-6 sm:p-8">
            {/* Domain Header */}
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <span
                  className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white"
                  style={{ backgroundColor: `${currentDomain.color}55` }}
                >
                  <EditableText
                    value={currentDomain.label}
                    field="label"
                    isEditing={isEditing}
                    editField={editField}
                    setEditField={setEditField}
                    tempData={tempData.domains[currentDomainIndex]}
                    setTempData={(data) => {
                      const newDomains = [...tempData.domains];
                      newDomains[currentDomainIndex] = data;
                      setTempData({ ...tempData, domains: newDomains });
                    }}
                    className="text-white"
                  />
                </span>
                <h2 className="mb-2 text-2xl font-semibold text-white">
                  <EditableText
                    value={currentDomain.label}
                    field="label"
                    isEditing={isEditing}
                    editField={editField}
                    setEditField={setEditField}
                    tempData={tempData.domains[currentDomainIndex]}
                    setTempData={(data) => {
                      const newDomains = [...tempData.domains];
                      newDomains[currentDomainIndex] = data;
                      setTempData({ ...tempData, domains: newDomains });
                    }}
                    className="text-white"
                  />
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-white/65">
                  <EditableText
                    value={currentDomain.description}
                    field="description"
                    type="textarea"
                    rows={2}
                    isEditing={isEditing}
                    editField={editField}
                    setEditField={setEditField}
                    tempData={tempData.domains[currentDomainIndex]}
                    setTempData={(data) => {
                      const newDomains = [...tempData.domains];
                      newDomains[currentDomainIndex] = data;
                      setTempData({ ...tempData, domains: newDomains });
                    }}
                    className="text-white/65"
                  />
                </p>
              </div>
              <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-3 text-sm font-semibold text-[#C9A84C]">
                {currentDomainIndex * 3 + 1}–{currentDomainIndex * 3 + currentDomain.items.length} of {totalItems} items
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-7">
              {currentDomain.items.map((item, index) => (
                <div key={index} className="border-b border-white/10 pb-7">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/40">
                    Item {currentDomainIndex * 3 + index + 1}
                  </p>
                  <p className="mb-4 text-base leading-7 text-white/85">
                    <EditableText
                      value={item}
                      field={`item_${index}`}
                      type="textarea"
                      rows={2}
                      isEditing={isEditing}
                      editField={editField}
                      setEditField={setEditField}
                      tempData={tempData.domains[currentDomainIndex]}
                      setTempData={(data) => {
                        const newDomains = [...tempData.domains];
                        newDomains[currentDomainIndex] = data;
                        setTempData({ ...tempData, domains: newDomains });
                      }}
                      className="text-white/85"
                    />
                  </p>
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
              ))}
            </div>

            {/* Reflection */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-5">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                Reflection Question
              </label>
              <p className="mb-3 text-sm italic leading-7 text-white/70">
                <EditableText
                  value={currentDomain.openQuestion}
                  field="openQuestion"
                  type="textarea"
                  rows={2}
                  isEditing={isEditing}
                  editField={editField}
                  setEditField={setEditField}
                  tempData={tempData.domains[currentDomainIndex]}
                  setTempData={(data) => {
                    const newDomains = [...tempData.domains];
                    newDomains[currentDomainIndex] = data;
                    setTempData({ ...tempData, domains: newDomains });
                  }}
                  className="text-white/70"
                />
              </p>
              <textarea
                className="min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                placeholder="Share your thoughts here..."
                readOnly
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3 mt-7">
              <button
                disabled={currentDomainIndex === 0}
                onClick={handlePrevious}
                className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-default disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="cursor-pointer rounded-xl bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#1B2B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D6B45A]"
              >
                {currentDomainIndex === assessment.domains.length - 1 ? 'See Results' : 'Next Domain'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
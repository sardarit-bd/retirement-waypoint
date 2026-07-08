'use client';

import { useState } from 'react';
import { useRouter }from 'next/navigation';
import { Edit, Save, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Compass, Clock, BarChart3, MessageSquareText, Lock } from 'lucide-react';

const glassCard = 'rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl';

export function AdminAssessmentIntroduction({ assessmentId, onBegin }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  // Single state object - matches future backend payload
  const [pageData, setPageData] = useState({
    badge: 'Pre-Retiree',
    title: 'Retirement Readiness Assessment',
    subtitle: 'Pre-Retiree',
    description: 'This assessment measures your retirement readiness across five key behavioral domains. Answer honestly to get the most accurate results.',
    duration: '10–12 min',
    questionCount: '15',
    reflectionCount: '5',
    ctaButton: 'Begin Assessment',
  });
  
  const [tempData, setTempData] = useState(pageData);

  const handleEdit = () => {
    setTempData({ ...pageData });
    setIsEditing(true);
  };

  const handleSave = () => {
    // Collect all data into single object
    const payload = {
      ...tempData,
      // Add any additional fields needed for backend
    };
    setPageData(tempData);
    setIsEditing(false);
    console.log('📦 Save payload:', payload);
  };

  const handleCancel = () => {
    setTempData({ ...pageData });
    setIsEditing(false);
  };

  const handleFieldChange = (field, value) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#1B2B4B] px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#C9A84C]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/admin/assessments')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer border border-white/10 rounded-full px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Assessments</span>
          </button>
        </div>

        {/* Main Content */}
        <div className={`mx-auto max-w-3xl overflow-hidden ${glassCard}`}>
          <div className="px-6 py-10 text-center sm:px-10 md:px-14">
            {/* Edit Controls */}
            <div className="flex justify-end mb-4">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleCancel}
                    className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    <X className="mr-1 h-3.5 w-3.5" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="rounded-full bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20"
                  >
                    <Save className="mr-1 h-3.5 w-3.5" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleEdit}
                  className="rounded-full bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] shadow-lg shadow-[#C9A84C]/20"
                >
                  <Edit className="mr-1 h-3.5 w-3.5" />
                  Edit Page
                </Button>
              )}
            </div>

            {/* Content - Read Mode */}
            {!isEditing ? (
              <>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C] text-[#1B2B4B] shadow-lg">
                  <Compass className="h-8 w-8" />
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
                  Retirement Waypoint
                </p>

                <span
                  className="mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
                  style={{ backgroundColor: `${'#C9A84C'}22`, color: '#ffffff' }}
                >
                  {pageData.badge}
                </span>

                <h1 className="mx-auto mb-5 max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl">
                  {pageData.title}
                </h1>

                <p className="mb-7 text-sm font-semibold text-[#C9A84C]">
                  {pageData.subtitle}
                </p>

                <p className="mx-auto max-w-xl text-base leading-8 text-white/70">
                  {pageData.description}
                </p>

                <div className="my-8 h-px bg-white/10" />

                <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: Clock, label: pageData.duration },
                    { icon: BarChart3, label: `${pageData.questionCount} scaled items` },
                    { icon: MessageSquareText, label: `${pageData.reflectionCount} reflections` },
                    { icon: Lock, label: 'Confidential' },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white/70 backdrop-blur-xl"
                    >
                      <Icon className="h-4 w-4 text-[#C9A84C]" />
                      {label}
                    </div>
                  ))}
                </div>

                <p className="mx-auto mb-8 max-w-xl text-center text-sm italic leading-7 text-white/55">
                  Answer based on where you are today — not where you think you should be. Honest responses create the most useful results.
                </p>

                <button
                  onClick={onBegin}
                  className="cursor-pointer rounded-xl bg-[#C9A84C] px-8 py-3.5 text-sm font-semibold text-[#1B2B4B] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D6B45A] hover:shadow-xl"
                >
                  {pageData.ctaButton}
                </button>
              </>
            ) : (
              /* Content - Edit Mode (Entire page becomes editable) */
              <>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C] text-[#1B2B4B] shadow-lg">
                  <Compass className="h-8 w-8" />
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
                  Retirement Waypoint
                </p>

                {/* Badge - Editable */}
                <div className="mb-6 inline-block">
                  <Input
                    value={tempData.badge}
                    onChange={(e) => handleFieldChange('badge', e.target.value)}
                    className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-center w-auto inline-block px-4 py-1.5 text-sm font-semibold"
                    style={{ backgroundColor: `${'#C9A84C'}22` }}
                  />
                </div>

                {/* Title - Editable */}
                <div className="mx-auto mb-5 max-w-2xl">
                  <Input
                    value={tempData.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-center text-3xl font-serif"
                  />
                </div>

                {/* Subtitle - Editable */}
                <div className="mb-7">
                  <Input
                    value={tempData.subtitle}
                    onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                    className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-center text-sm font-semibold text-[#C9A84C]"
                  />
                </div>

                {/* Description - Editable */}
                <div className="mx-auto max-w-xl">
                  <Textarea
                    value={tempData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl resize-none text-center"
                    rows={3}
                  />
                </div>

                <div className="my-8 h-px bg-white/10" />

                {/* Stats Grid - Editable */}
                <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: Clock, field: 'duration', label: 'Duration' },
                    { icon: BarChart3, field: 'questionCount', label: 'Question Count' },
                    { icon: MessageSquareText, field: 'reflectionCount', label: 'Reflection Count' },
                    { icon: Lock, field: null, label: 'Confidential' },
                  ].map(({ icon: Icon, field, label }) => (
                    <div
                      key={label}
                      className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white/70 backdrop-blur-xl"
                    >
                      <Icon className="h-4 w-4 text-[#C9A84C]" />
                      {field ? (
                        <Input
                          value={tempData[field]}
                          onChange={(e) => handleFieldChange(field, e.target.value)}
                          className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-xs w-20 text-center"
                        />
                      ) : (
                        label
                      )}
                    </div>
                  ))}
                </div>

                <p className="mx-auto mb-8 max-w-xl text-center text-sm italic leading-7 text-white/55">
                  Answer based on where you are today — not where you think you should be. Honest responses create the most useful results.
                </p>

                {/* CTA Button - Editable */}
                <div className="mx-auto max-w-xs">
                  <Input
                    value={tempData.ctaButton}
                    onChange={(e) => handleFieldChange('ctaButton', e.target.value)}
                    className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-center"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Edit, Save, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Compass, Clock, BarChart3, MessageSquareText, Lock } from 'lucide-react';

const glassCard = 'rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl';

export function AdminAssessmentIntroduction({ assessmentId, onBegin }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [assessment, setAssessment] = useState({
    title: 'Retirement Readiness Assessment',
    subtitle: 'Pre-Retiree',
    description:
      'This assessment measures your retirement readiness across five key behavioral domains. Answer honestly to get the most accurate results.',
    duration: '10–12 min',
    questionCount: '15',
    reflectionCount: '5',
    ctaButton: 'Begin Assessment',
    badge: 'Pre-Retiree',
  });

  const [tempData, setTempData] = useState(assessment);

  const handleEdit = () => {
    setTempData(assessment);
    setIsEditing(true);
  };

  const handleSave = () => {
    setAssessment(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(assessment);
    setIsEditing(false);
  };

  // Render content based on edit mode
  const renderContent = () => {
    const data = isEditing ? tempData : assessment;

    return (
      <>
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C] text-[#1B2B4B] shadow-lg">
          <Compass className="h-8 w-8" />
        </div>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
          Retirement Waypoint
        </p>

        {/* Badge */}
        <span
          className="mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{
            backgroundColor: `${'#C9A84C'}22`,
            color: '#ffffff',
          }}
        >
          {isEditing ? (
            <Input
              value={tempData.badge}
              onChange={(e) => setTempData({ ...tempData, badge: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-center w-auto inline-block px-3 py-1"
            />
          ) : (
            data.badge
          )}
        </span>

        {/* Title */}
        <h1 className="mx-auto mb-5 max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl">
          {isEditing ? (
            <Input
              value={tempData.title}
              onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-center text-3xl font-serif"
            />
          ) : (
            data.title
          )}
        </h1>

        {/* Subtitle */}
        <p className="mb-7 text-sm font-semibold text-[#C9A84C]">
          {isEditing ? (
            <Input
              value={tempData.subtitle}
              onChange={(e) => setTempData({ ...tempData, subtitle: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-center text-sm font-semibold"
            />
          ) : (
            data.subtitle
          )}
        </p>

        {/* Description */}
        <p className="mx-auto max-w-xl text-base leading-8 text-white/70">
          {isEditing ? (
            <Textarea
              value={tempData.description}
              onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl resize-none text-center"
              rows={3}
            />
          ) : (
            data.description
          )}
        </p>

        <div className="my-8 h-px bg-white/10" />

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Clock, label: data.duration, field: 'duration' },
            { icon: BarChart3, label: `${data.questionCount} scaled items`, field: 'questionCount' },
            { icon: MessageSquareText, label: `${data.reflectionCount} reflections`, field: 'reflectionCount' },
            { icon: Lock, label: 'Confidential', field: null },
          ].map(({ icon: Icon, label, field }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white/70 backdrop-blur-xl"
            >
              <Icon className="h-4 w-4 text-[#C9A84C]" />
              {field && isEditing ? (
                <Input
                  value={tempData[field]}
                  onChange={(e) => setTempData({ ...tempData, [field]: e.target.value })}
                  className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-xs w-16 text-center"
                />
              ) : field ? (
                label
              ) : (
                label
              )}
            </div>
          ))}
        </div>

        <p className="mx-auto mb-8 max-w-xl text-center text-sm italic leading-7 text-white/55">
          Answer based on where you are today — not where you think you should be. Honest responses create the most useful results.
        </p>

        {/* CTA Button */}
        {isEditing ? (
          <Input
            value={tempData.ctaButton}
            onChange={(e) => setTempData({ ...tempData, ctaButton: e.target.value })}
            className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-center w-auto mx-auto max-w-xs"
          />
        ) : (
          <button
            onClick={onBegin}
            className="cursor-pointer rounded-xl bg-[#C9A84C] px-8 py-3.5 text-sm font-semibold text-[#1B2B4B] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D6B45A] hover:shadow-xl"
          >
            {data.ctaButton}
          </button>
        )}
      </>
    );
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
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
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
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/15 text-white hover:bg-white/10"
                  >
                    <X className="mr-1 h-3.5 w-3.5" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="rounded-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
                  >
                    <Save className="mr-1 h-3.5 w-3.5" />
                    Save
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

            {/* Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
}
// features/assessment/admin/components/AdminAssessmentIntroduction.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Edit, Save, X, Pencil, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Compass, Clock, BarChart3, MessageSquareText, Lock } from 'lucide-react';

const glassCard = 'rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl';

function EditableField({ 
  label, 
  field, 
  value, 
  type = 'text', 
  rows = 2, 
  isEditing, 
  editField, 
  setEditField, 
  tempData, 
  setTempData 
}) {
  const isActive = editField === field;

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
      {isEditing && isActive ? (
        <div className="inline-block">
          {type === 'textarea' ? (
            <Textarea
              value={tempData[field]}
              onChange={(e) => setTempData({ ...tempData, [field]: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl resize-none min-w-[200px]"
              rows={rows}
            />
          ) : (
            <Input
              value={tempData[field]}
              onChange={(e) => setTempData({ ...tempData, [field]: e.target.value })}
              className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl min-w-[150px]"
            />
          )}
        </div>
      ) : (
        <span className="text-white/90">{value}</span>
      )}
    </div>
  );
}

export function AdminAssessmentIntroduction({ assessmentId, onBegin }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [assessment, setAssessment] = useState({
    title: 'Retirement Readiness Assessment',
    subtitle: 'Pre-Retiree',
    description: 'This assessment measures your retirement readiness across five key behavioral domains. Answer honestly to get the most accurate results.',
    duration: '10–12 min',
    questionCount: '15',
    reflectionCount: '5',
    ctaButton: 'Begin Assessment',
    badge: 'Pre-Retiree',
  });

  const [tempData, setTempData] = useState(assessment);
  const [editField, setEditField] = useState(null);

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

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#1B2B4B] px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#C9A84C]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Back Button & Edit Controls */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/admin/assessments')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Assessments</span>
          </button>

          <div className="flex items-center gap-3">
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
                Edit Page
              </Button>
            )}
          </div>
        </div>

        {/* Main Content - EXACT clone of public introduction */}
        <div className={`mx-auto max-w-3xl overflow-hidden ${glassCard}`}>
          <div className="px-6 py-10 text-center sm:px-10 md:px-14">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C] text-[#1B2B4B] shadow-lg">
              <Compass className="h-8 w-8" />
            </div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
              Retirement Waypoint
            </p>

            <span
              className="mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: `${'#C9A84C'}22`,
                color: '#ffffff',
              }}
            >
              <EditableField 
                label="Badge" 
                field="badge" 
                value={assessment.badge}
                isEditing={isEditing}
                editField={editField}
                setEditField={setEditField}
                tempData={tempData}
                setTempData={setTempData}
              />
            </span>

            <h1 className="mx-auto mb-5 max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl">
              <EditableField 
                label="Title" 
                field="title" 
                value={assessment.title}
                isEditing={isEditing}
                editField={editField}
                setEditField={setEditField}
                tempData={tempData}
                setTempData={setTempData}
              />
            </h1>

            <p className="mb-7 text-sm font-semibold text-[#C9A84C]">
              <EditableField 
                label="Subtitle" 
                field="subtitle" 
                value={assessment.subtitle}
                isEditing={isEditing}
                editField={editField}
                setEditField={setEditField}
                tempData={tempData}
                setTempData={setTempData}
              />
            </p>

            <p className="mx-auto max-w-xl text-base leading-8 text-white/70">
              <EditableField 
                label="Description" 
                field="description" 
                value={assessment.description} 
                type="textarea" 
                rows={3}
                isEditing={isEditing}
                editField={editField}
                setEditField={setEditField}
                tempData={tempData}
                setTempData={setTempData}
              />
            </p>

            <div className="my-8 h-px bg-white/10" />

            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Clock, label: assessment.duration, field: 'duration' },
                { icon: BarChart3, label: `${assessment.questionCount} scaled items`, field: 'questionCount' },
                { icon: MessageSquareText, label: `${assessment.reflectionCount} reflections`, field: 'reflectionCount' },
                { icon: Lock, label: 'Confidential', field: null },
              ].map(({ icon: Icon, label, field }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white/70 backdrop-blur-xl"
                >
                  <Icon className="h-4 w-4 text-[#C9A84C]" />
                  {field ? (
                    <EditableField 
                      label={field} 
                      field={field} 
                      value={label}
                      isEditing={isEditing}
                      editField={editField}
                      setEditField={setEditField}
                      tempData={tempData}
                      setTempData={setTempData}
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

            <button
              onClick={onBegin}
              className="cursor-pointer rounded-xl bg-[#C9A84C] px-8 py-3.5 text-sm font-semibold text-[#1B2B4B] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D6B45A] hover:shadow-xl"
            >
              <EditableField 
                label="Button Text" 
                field="ctaButton" 
                value={assessment.ctaButton}
                isEditing={isEditing}
                editField={editField}
                setEditField={setEditField}
                tempData={tempData}
                setTempData={setTempData}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
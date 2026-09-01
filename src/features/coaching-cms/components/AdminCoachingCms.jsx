/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import {
  Save,
  Loader2,
  LayoutTemplate,
  Layers,
  CheckCircle2,
  Plus,
  Trash2,
  RotateCcw,
  ExternalLink,
  Columns2,
  PanelLeft,
  Eye,
  Compass,
  Zap,
  HeartHandshake,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCoachingCmsAdmin, useUpdateCoachingCms } from '../hooks/useCoachingCms';
import { CoachingCmsLivePreview } from './CoachingCmsLivePreview';

const defaultParagraphs = [
  'The loss of structure. The shift in identity. The question of what comes next. These aren’t small adjustments. They’re among the most significant psychological transitions you’ll ever navigate in your lifetime.',
  'I’m a behavioral and industrial psychologist with 40 years of experience helping people understand what drives them — and what holds them back. I’ve spent the last chapter of my own career doing what I wish more people had helped me do earlier: applying behavioral science to the question of how to actually thrive in retirement, not just survive it.',
  'My coaching draws on around the five domains of retirement thriving - (1) Identify the purpose, (2) Engagement and vitality, (3) Connection and belonging, (4) Growth and learning, and (5) Meaning and legacy. These domains consistently link to wellbeing and fulfillment in later life. We don’t just talk. We build a clear picture of where you are, where you want to go, and what’s standing in the way.',
];

const defaultDomains = [
  {
    tag: 'FIVE DOMAINS',
    title: 'Identity & Purpose',
    subtitle: 'Who are you becoming?',
    description:
      'Who are you when the title is gone? Reclaiming identity anchored in values, not roles.',
    iconName: 'Compass',
  },
  {
    tag: 'FIVE DOMAINS',
    title: 'Engagement & Vitality',
    subtitle: 'Energy and flow',
    description:
      'Energy, flow, and the daily rhythm of a life that feels alive and fully activated.',
    iconName: 'Zap',
  },
  {
    tag: 'FIVE DOMAINS',
    title: 'Connection & Belonging',
    subtitle: 'Relationships that sustain',
    description:
      'The quality and intentionality of relationships that sustain wellbeing across decades.',
    iconName: 'HeartHandshake',
  },
  {
    tag: 'FIVE DOMAINS',
    title: 'Growth & Learning',
    subtitle: 'Stay curious, stay vital',
    description:
      'Staying curious, challenged, and expanding — the antidote to stagnation in retirement.',
    iconName: 'GraduationCap',
  },
  {
    tag: 'FIVE DOMAINS',
    title: 'Meaning & Legacy',
    subtitle: 'What you leave behind',
    description:
      'What you stand for, what you leave behind, and the story you choose to live now.',
    iconName: 'Sparkles',
  },
];

const defaultPoints = [
  'You’re within 2–3 years of retiring and want to go in prepared',
  'You’ve already retired and feel like something’s missing',
  'You’re restless, disconnected, or struggling to find your footing',
];

export function AdminCoachingCms() {
  const { data: response, isLoading, refetch } = useCoachingCmsAdmin();
  const updateMutation = useUpdateCoachingCms();

  const cmsData = response?.data;
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState('heroOverview');
  const [layoutMode, setLayoutMode] = useState('split'); // 'split' | 'edit' | 'preview'

  // Initialize local form state when backend data loads
  useEffect(() => {
    if (cmsData) {
      setFormData(JSON.parse(JSON.stringify(cmsData)));
    }
  }, [cmsData]);

  if (isLoading || !formData) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C]" />
        <p className="text-sm font-medium text-[#1B2B4B]/70">Loading Coaching Page CMS content...</p>
      </div>
    );
  }

  // Handle field changes inside a section with deep immutability
  const handleFieldChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev?.[section] || {}),
        [field]: value,
      },
    }));
  };

  // Safe String Array Item Change
  const handleStringArrayChange = (section, arrayName, index, value, fallbackDefaults) => {
    setFormData((prev) => {
      const list = [
        ...(prev[section]?.[arrayName]?.length
          ? prev[section][arrayName]
          : fallbackDefaults),
      ];
      list[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayName]: list,
        },
      };
    });
  };

  // Safe String Array Add
  const handleAddStringArrayItem = (section, arrayName, defaultText, fallbackDefaults) => {
    setFormData((prev) => {
      const list = [
        ...(prev[section]?.[arrayName]?.length
          ? prev[section][arrayName]
          : fallbackDefaults),
      ];
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayName]: [...list, defaultText],
        },
      };
    });
  };

  // Safe String Array Remove
  const handleRemoveStringArrayItem = (section, arrayName, index, fallbackDefaults) => {
    setFormData((prev) => {
      const list = [
        ...(prev[section]?.[arrayName]?.length
          ? prev[section][arrayName]
          : fallbackDefaults),
      ];
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayName]: list.filter((_, idx) => idx !== index),
        },
      };
    });
  };

  // Safe Object Array Item Change (e.g. Domains)
  const handleObjectArrayItemChange = (section, arrayName, index, field, value, fallbackDefaults) => {
    setFormData((prev) => {
      const list = [
        ...(prev[section]?.[arrayName]?.length
          ? prev[section][arrayName]
          : fallbackDefaults),
      ];
      list[index] = {
        ...list[index],
        [field]: value,
      };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayName]: list,
        },
      };
    });
  };

  // Safe Object Array Add Item
  const handleAddObjectArrayItem = (section, arrayName, defaultItem, fallbackDefaults) => {
    setFormData((prev) => {
      const list = [
        ...(prev[section]?.[arrayName]?.length
          ? prev[section][arrayName]
          : fallbackDefaults),
      ];
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayName]: [...list, defaultItem],
        },
      };
    });
  };

  // Safe Object Array Remove Item
  const handleRemoveObjectArrayItem = (section, arrayName, index, fallbackDefaults) => {
    setFormData((prev) => {
      const list = [
        ...(prev[section]?.[arrayName]?.length
          ? prev[section][arrayName]
          : fallbackDefaults),
      ];
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayName]: list.filter((_, idx) => idx !== index),
        },
      };
    });
  };

  // Save all changes
  const handleSave = () => {
    if (!formData) return;

    const { _id, __v, createdAt, updatedAt, ...cleanData } = formData;

    updateMutation.mutate(
      {
        id: _id,
        data: cleanData,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  // Reset to server data
  const handleReset = () => {
    if (cmsData) {
      setFormData(JSON.parse(JSON.stringify(cmsData)));
      toast.success('Form reset to saved content');
    }
  };

  const tabsConfig = [
    { id: 'heroOverview', label: 'Hero & Overview', icon: LayoutTemplate },
    { id: 'framework', label: 'Five Domains Framework', icon: Layers },
    { id: 'eligibilityCta', label: 'Audience & CTA', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#1B2B4B]/10">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1B2B4B] sm:text-3xl">
              Coaching Page CMS
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A84C]/15 px-3 py-1 text-xs font-bold text-[#8C6D1F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              Live Editor
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#1B2B4B]/60">
            Manage headline copy, psychology philosophy, Five Domains framework cards, and audience eligibility.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Layout Mode Toggles */}
          <div className="hidden md:flex items-center rounded-xl bg-[#F8F5EF] p-1 border border-[#1B2B4B]/10">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setLayoutMode('split')}
              className={`h-8 px-2.5 text-xs font-semibold rounded-lg cursor-pointer ${
                layoutMode === 'split'
                  ? 'bg-white text-[#1B2B4B] shadow-sm'
                  : 'text-[#1B2B4B]/60 hover:text-[#1B2B4B]'
              }`}
              title="Split View"
            >
              <Columns2 className="mr-1.5 h-3.5 w-3.5 text-[#C9A84C]" />
              Split View
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setLayoutMode('edit')}
              className={`h-8 px-2.5 text-xs font-semibold rounded-lg cursor-pointer ${
                layoutMode === 'edit'
                  ? 'bg-white text-[#1B2B4B] shadow-sm'
                  : 'text-[#1B2B4B]/60 hover:text-[#1B2B4B]'
              }`}
              title="Editor Only"
            >
              <PanelLeft className="mr-1.5 h-3.5 w-3.5 text-[#1B2B4B]" />
              Editor Only
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setLayoutMode('preview')}
              className={`h-8 px-2.5 text-xs font-semibold rounded-lg cursor-pointer ${
                layoutMode === 'preview'
                  ? 'bg-white text-[#1B2B4B] shadow-sm'
                  : 'text-[#1B2B4B]/60 hover:text-[#1B2B4B]'
              }`}
              title="Preview Only"
            >
              <Eye className="mr-1.5 h-3.5 w-3.5 text-[#1B2B4B]" />
              Preview Only
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={updateMutation.isPending}
            className="border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] cursor-pointer h-9 px-3 text-xs sm:text-sm font-semibold"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] h-9 px-3 text-xs sm:text-sm font-semibold"
          >
            <Link href="/coaching" target="_blank" rel="noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Live Site
            </Link>
          </Button>

          <Button
            size="sm"
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] font-bold shadow-md cursor-pointer disabled:cursor-not-allowed h-9 px-4 text-xs sm:text-sm"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="w-full bg-white p-2 rounded-2xl shadow-sm border border-[#1B2B4B]/10 overflow-x-auto">
          <TabsList className="flex h-auto w-max sm:w-full flex-wrap gap-1.5 bg-transparent p-0">
            {tabsConfig.map(({ id, label, icon: Icon }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="flex-1 min-w-[150px] px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer data-[state=active]:bg-[#1B2B4B] data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-[#F8F5EF]"
              >
                <Icon className="mr-2 h-4 w-4 text-[#C9A84C]" />
                <span className="truncate">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor */}
          {(layoutMode === 'split' || layoutMode === 'edit') && (
            <div
              className={`space-y-6 transition-all duration-300 ${
                layoutMode === 'split' ? 'lg:col-span-6 xl:col-span-5' : 'lg:col-span-12'
              }`}
            >
              {/* 1. HERO & OVERVIEW TAB */}
              <TabsContent value="heroOverview" className="m-0 space-y-6">
                {/* Hero Section */}
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Hero Header</CardTitle>
                    <CardDescription>
                      Top badge, main headline, and subtitle banner.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Badge Text</Label>
                        <Input
                          value={formData.hero?.badge || ''}
                          onChange={(e) => handleFieldChange('hero', 'badge', e.target.value)}
                          placeholder="Retirement Coaching"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Main Headline</Label>
                        <Input
                          value={formData.hero?.title || ''}
                          onChange={(e) => handleFieldChange('hero', 'title', e.target.value)}
                          placeholder="Retirement Coaching with David Allen, Ph.D."
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Subtitle</Label>
                      <Textarea
                        rows={2}
                        value={formData.hero?.subtitle || ''}
                        onChange={(e) => handleFieldChange('hero', 'subtitle', e.target.value)}
                        placeholder="Personalized guidance to help you navigate retirement..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Overview & Philosophy Section */}
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Overview & Philosophy</CardTitle>
                    <CardDescription>
                      Introduction pill, bold headline, and core psychology paragraphs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Badge Pill</Label>
                        <Input
                          value={formData.overview?.badge || ''}
                          onChange={(e) => handleFieldChange('overview', 'badge', e.target.value)}
                          placeholder="Coaching Services"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Section Headline</Label>
                        <Input
                          value={formData.overview?.headline || ''}
                          onChange={(e) => handleFieldChange('overview', 'headline', e.target.value)}
                          placeholder="Most people prepare financially for retirement..."
                        />
                      </div>
                    </div>

                    {/* Paragraphs List */}
                    <div className="space-y-3 pt-3 border-t border-[#1B2B4B]/10">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Philosophy Paragraphs
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddStringArrayItem(
                              'overview',
                              'paragraphs',
                              'New paragraph explaining coaching philosophy.',
                              defaultParagraphs
                            )
                          }
                          className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5 bg-white"
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Paragraph
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {(formData.overview?.paragraphs?.length
                          ? formData.overview.paragraphs
                          : defaultParagraphs
                        ).map((paragraph, index) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-3.5 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#C9A84C]">Paragraph #{index + 1}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleRemoveStringArrayItem(
                                    'overview',
                                    'paragraphs',
                                    index,
                                    defaultParagraphs
                                  )
                                }
                                className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                            <Textarea
                              rows={3}
                              value={paragraph}
                              onChange={(e) =>
                                handleStringArrayChange(
                                  'overview',
                                  'paragraphs',
                                  index,
                                  e.target.value,
                                  defaultParagraphs
                                )
                              }
                              placeholder="Type paragraph..."
                              className="bg-white text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 2. FIVE DOMAINS FRAMEWORK TAB */}
              <TabsContent value="framework" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Five Domains Framework</CardTitle>
                    <CardDescription>
                      Framework badge, title, subtitle, and domain pillar cards.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Badge Text</Label>
                        <Input
                          value={formData.framework?.badge || ''}
                          onChange={(e) => handleFieldChange('framework', 'badge', e.target.value)}
                          placeholder="THE FRAMEWORK"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Title</Label>
                        <Input
                          value={formData.framework?.title || ''}
                          onChange={(e) => handleFieldChange('framework', 'title', e.target.value)}
                          placeholder="Five Domains of Retirement Thriving"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Subtitle Description</Label>
                      <Textarea
                        rows={2}
                        value={formData.framework?.subtitle || ''}
                        onChange={(e) => handleFieldChange('framework', 'subtitle', e.target.value)}
                        placeholder="Grounded in decades of behavioral science..."
                      />
                    </div>

                    {/* Domain Cards List */}
                    <div className="space-y-3 pt-3 border-t border-[#1B2B4B]/10">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Domain Cards ({formData.framework?.domains?.length || defaultDomains.length})
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddObjectArrayItem(
                              'framework',
                              'domains',
                              {
                                tag: 'FIVE DOMAINS',
                                title: 'New Domain',
                                subtitle: 'Focus area',
                                description: 'Summary of domain purpose.',
                                iconName: 'Compass',
                              },
                              defaultDomains
                            )
                          }
                          className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5 bg-white"
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Domain
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {(formData.framework?.domains?.length
                          ? formData.framework.domains
                          : defaultDomains
                        ).map((domain, index) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#C9A84C]">Domain #{index + 1}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleRemoveObjectArrayItem(
                                    'framework',
                                    'domains',
                                    index,
                                    defaultDomains
                                  )
                                }
                                className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="space-y-1">
                                <Label className="text-[11px] font-semibold text-[#1B2B4B]">Title</Label>
                                <Input
                                  value={domain.title}
                                  onChange={(e) =>
                                    handleObjectArrayItemChange(
                                      'framework',
                                      'domains',
                                      index,
                                      'title',
                                      e.target.value,
                                      defaultDomains
                                    )
                                  }
                                  placeholder="e.g. Identity & Purpose"
                                  className="bg-white text-xs h-8"
                                />
                              </div>

                              <div className="space-y-1">
                                <Label className="text-[11px] font-semibold text-[#1B2B4B]">Subtitle</Label>
                                <Input
                                  value={domain.subtitle || ''}
                                  onChange={(e) =>
                                    handleObjectArrayItemChange(
                                      'framework',
                                      'domains',
                                      index,
                                      'subtitle',
                                      e.target.value,
                                      defaultDomains
                                    )
                                  }
                                  placeholder="e.g. Who are you becoming?"
                                  className="bg-white text-xs h-8"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <Label className="text-[11px] font-semibold text-[#1B2B4B]">Description</Label>
                              <Textarea
                                rows={2}
                                value={domain.description}
                                onChange={(e) =>
                                  handleObjectArrayItemChange(
                                    'framework',
                                    'domains',
                                    index,
                                    'description',
                                    e.target.value,
                                    defaultDomains
                                  )
                                }
                                placeholder="Summary of this domain..."
                                className="bg-white text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 3. TARGET AUDIENCE & CTA TAB */}
              <TabsContent value="eligibilityCta" className="m-0 space-y-6">
                {/* Assessment Note */}
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Assessment Connection Note</CardTitle>
                    <CardDescription>
                      Paragraph explaining how assessment findings connect with the coaching engagement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Note Text</Label>
                      <Textarea
                        rows={3}
                        value={formData.assessmentNote?.noteText || ''}
                        onChange={(e) =>
                          handleFieldChange('assessmentNote', 'noteText', e.target.value)
                        }
                        placeholder="Your assessment results will be used as a starting point..."
                        className="bg-white text-xs"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Eligibility Box */}
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Eligibility Checklist Box</CardTitle>
                    <CardDescription>
                      The &quot;This is right for you if&quot; checklist cards.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Box Heading</Label>
                      <Input
                        value={formData.eligibility?.boxTitle || ''}
                        onChange={(e) =>
                          handleFieldChange('eligibility', 'boxTitle', e.target.value)
                        }
                        placeholder="This is right for you if:"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Checklist Points
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddStringArrayItem(
                              'eligibility',
                              'points',
                              'New criteria statement.',
                              defaultPoints
                            )
                          }
                          className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5 bg-white"
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Point
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {(formData.eligibility?.points?.length
                          ? formData.eligibility.points
                          : defaultPoints
                        ).map((point, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={point}
                              onChange={(e) =>
                                handleStringArrayChange(
                                  'eligibility',
                                  'points',
                                  index,
                                  e.target.value,
                                  defaultPoints
                                )
                              }
                              placeholder="e.g. You're within 2–3 years of retiring..."
                              className="bg-white text-xs h-9"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleRemoveStringArrayItem(
                                  'eligibility',
                                  'points',
                                  index,
                                  defaultPoints
                                )
                              }
                              className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bottom Call to Action */}
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Bottom Call to Action</CardTitle>
                    <CardDescription>
                      Button text and navigation link at the bottom of the coaching page.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Button Text</Label>
                        <Input
                          value={formData.cta?.buttonText || 'Work With Me'}
                          onChange={(e) => handleFieldChange('cta', 'buttonText', e.target.value)}
                          placeholder="Work With Me"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Button Link</Label>
                        <Input
                          value={formData.cta?.buttonLink || '/contact'}
                          onChange={(e) => handleFieldChange('cta', 'buttonLink', e.target.value)}
                          placeholder="/contact"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          )}

          {/* Right Column: Live Mockup Preview */}
          {(layoutMode === 'split' || layoutMode === 'preview') && (
            <div
              className={`sticky top-24 transition-all duration-300 ${
                layoutMode === 'split' ? 'lg:col-span-6 xl:col-span-7' : 'lg:col-span-12'
              }`}
            >
              <CoachingCmsLivePreview formData={formData} activeTab={activeTab} />
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}

export default AdminCoachingCms;

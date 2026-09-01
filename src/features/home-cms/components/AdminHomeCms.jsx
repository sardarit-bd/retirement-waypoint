/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Save,
  Loader2,
  Sparkles,
  Shield,
  FileCheck,
  HeartHandshake,
  Mail,
  Plus,
  Trash2,
  RotateCcw,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Columns2,
  PanelLeft,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useHomeCmsAdmin, useUpdateHomeCms } from '../hooks/useHomeCms';
import { HomeCmsLivePreview } from './HomeCmsLivePreview';
import api from '@/lib/api/axios';

export function AdminHomeCms() {
  const { data: response, isLoading, refetch } = useHomeCmsAdmin();
  const updateMutation = useUpdateHomeCms();

  const cmsData = response?.data;
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [layoutMode, setLayoutMode] = useState('split'); // 'split' | 'edit' | 'preview'
  const [isUploadingBg, setIsUploadingBg] = useState(false);
  const fileInputRef = useRef(null);
  const [isUploadingSupportBg, setIsUploadingSupportBg] = useState(false);
  const supportFileInputRef = useRef(null);

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
        <p className="text-sm font-medium text-[#1B2B4B]/70">Loading Home Page CMS content...</p>
      </div>
    );
  }

  // Handle root field changes inside section
  const handleFieldChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle nested array item changes
  const handleArrayItemChange = (section, arrayName, index, field, value) => {
    setFormData((prev) => {
      const updatedArray = [...(prev[section]?.[arrayName] || [])];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value,
      };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayName]: updatedArray,
        },
      };
    });
  };

  // Generic Array Manipulation Helpers
  const handleRemoveArrayItem = (sectionKey, arrayKey, targetIndex) => {
    setFormData((prev) => {
      const currentSection = prev[sectionKey] || {};
      const currentList = currentSection[arrayKey] || [];
      return {
        ...prev,
        [sectionKey]: {
          ...currentSection,
          [arrayKey]: currentList.filter((_, idx) => idx !== targetIndex),
        },
      };
    });
  };

  const handleAddArrayItem = (sectionKey, arrayKey, defaultItem, fallbackDefaults = []) => {
    setFormData((prev) => {
      const currentSection = prev[sectionKey] || {};
      const currentList = currentSection[arrayKey]?.length
        ? currentSection[arrayKey]
        : fallbackDefaults;

      return {
        ...prev,
        [sectionKey]: {
          ...currentSection,
          [arrayKey]: [...currentList, defaultItem],
        },
      };
    });
  };

  // Default fallback constants
  const defaultTrustPoints = [
    { iconName: 'TrendingUp', text: 'Psychology-based guidance' },
    { iconName: 'Users', text: 'Personalized readiness insights' },
    { iconName: 'Target', text: 'Progress tracking for your next chapter' },
  ];

  const defaultTrustStats = [
    { iconName: 'Briefcase', value: '40+', label: 'Years Experience', description: 'Behavioral psychology experience focused on people, purpose, and life transitions.' },
    { iconName: 'ClipboardCheck', value: 'Guided', label: 'Assessments', description: 'Structured readiness tools designed to reveal emotional and lifestyle preparation.' },
    { iconName: 'TrendingUp', value: 'Progress', label: 'Tracking', description: 'Help users understand where they are today and what to improve next.' },
    { iconName: 'Lightbulb', value: 'Expert', label: 'Insights', description: 'Research-backed guidance around identity, structure, relationships, and purpose.' },
  ];

  const defaultAssessmentSteps = [
    { iconName: 'Target', title: 'Answer Guided Questions', description: 'Reflect on your retirement readiness across key life areas' },
    { iconName: 'BarChart3', title: 'Receive Personalized Insights', description: 'Get data-driven feedback tailored to your unique situation' },
    { iconName: 'TrendingUp', title: 'Track Your Progress', description: 'Monitor your growth and adjust your retirement roadmap' },
  ];

  const defaultSupportItems = [
    { iconName: 'ClipboardCheck', title: 'Readiness Assessment', description: 'Understand your emotional, lifestyle, and purpose readiness before retirement.' },
    { iconName: 'LineChart', title: 'Progress Tracking', description: 'Track your growth over time and see where your next chapter is improving.' },
    { iconName: 'Compass', title: 'Purpose & Identity', description: 'Navigate the shift from career identity to a more meaningful life structure.' },
    { iconName: 'BookOpen', title: 'Guided Resources', description: 'Access practical books, worksheets, and insights designed for transition.' },
    { iconName: 'HeartHandshake', title: 'Coaching Support', description: 'Receive personal guidance for building confidence, clarity, and direction.' },
    { iconName: 'Lightbulb', title: 'Expert Insights', description: 'Learn from behavioral psychology principles and real retirement experience.' },
  ];

  // Specific safe Trust Point Handlers
  const handleAddTrustPoint = () => {
    const currentPoints = (
      formData?.hero?.trustPoints?.length
        ? formData.hero.trustPoints
        : defaultTrustPoints
    ).map((p) => (typeof p === 'string' ? { iconName: 'TrendingUp', text: p } : p));

    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        trustPoints: [...currentPoints, { iconName: 'TrendingUp', text: 'New trust point' }],
      },
    }));
  };

  const handleTrustPointChange = (index, value) => {
    const currentPoints = (
      formData?.hero?.trustPoints?.length
        ? formData.hero.trustPoints
        : defaultTrustPoints
    ).map((p) => (typeof p === 'string' ? { iconName: 'TrendingUp', text: p } : p));

    currentPoints[index] = {
      ...currentPoints[index],
      text: value,
    };

    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        trustPoints: currentPoints,
      },
    }));
  };

  const handleRemoveTrustPoint = (index) => {
    const currentPoints = (
      formData?.hero?.trustPoints?.length
        ? formData.hero.trustPoints
        : defaultTrustPoints
    ).map((p) => (typeof p === 'string' ? { iconName: 'TrendingUp', text: p } : p));

    const updated = currentPoints.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        trustPoints: updated,
      },
    }));
  };

  // Sample Question Card Handlers for Assessment Preview
  const handleSampleCardChange = (field, value) => {
    setFormData((prev) => {
      const currentCard = prev?.assessmentPreview?.sampleCard || {
        questionNumber: 'Question 13',
        progressPercent: '52%',
        questionText: 'My life purpose feels connected to values beyond my career.',
        options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
        selectedOptionIndex: 1,
        footerText: 'Powered by behavioral psychology',
      };

      return {
        ...prev,
        assessmentPreview: {
          ...prev.assessmentPreview,
          sampleCard: {
            ...currentCard,
            [field]: value,
          },
        },
      };
    });
  };

  const handleSampleCardOptionChange = (optIndex, value) => {
    setFormData((prev) => {
      const currentCard = prev?.assessmentPreview?.sampleCard || {
        questionNumber: 'Question 13',
        progressPercent: '52%',
        questionText: 'My life purpose feels connected to values beyond my career.',
        options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
        selectedOptionIndex: 1,
        footerText: 'Powered by behavioral psychology',
      };

      const currentOptions = [...(currentCard.options || [])];
      currentOptions[optIndex] = value;

      return {
        ...prev,
        assessmentPreview: {
          ...prev.assessmentPreview,
          sampleCard: {
            ...currentCard,
            options: currentOptions,
          },
        },
      };
    });
  };

  const handleAddSampleCardOption = () => {
    setFormData((prev) => {
      const currentCard = prev?.assessmentPreview?.sampleCard || {
        questionNumber: 'Question 13',
        progressPercent: '52%',
        questionText: 'My life purpose feels connected to values beyond my career.',
        options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
        selectedOptionIndex: 1,
        footerText: 'Powered by behavioral psychology',
      };

      const currentOptions = [...(currentCard.options || [])];

      return {
        ...prev,
        assessmentPreview: {
          ...prev.assessmentPreview,
          sampleCard: {
            ...currentCard,
            options: [...currentOptions, 'New Option'],
          },
        },
      };
    });
  };

  const handleRemoveSampleCardOption = (optIndex) => {
    setFormData((prev) => {
      const currentCard = prev?.assessmentPreview?.sampleCard || {
        questionNumber: 'Question 13',
        progressPercent: '52%',
        questionText: 'My life purpose feels connected to values beyond my career.',
        options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
        selectedOptionIndex: 1,
        footerText: 'Powered by behavioral psychology',
      };

      const currentOptions = (currentCard.options || []).filter((_, i) => i !== optIndex);

      return {
        ...prev,
        assessmentPreview: {
          ...prev.assessmentPreview,
          sampleCard: {
            ...currentCard,
            options: currentOptions,
          },
        },
      };
    });
  };

  // Handle background image upload
  const handleBgImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Maximum allowed image size is 5MB.');
      return;
    }

    setIsUploadingBg(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', 'home-cms');

    try {
      const res = await api.post('/api/upload/single', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = res.data?.data?.url || res.data?.url;
      if (uploadedUrl) {
        handleFieldChange('hero', 'backgroundImage', uploadedUrl);
        toast.success('Hero background image uploaded successfully!');
      } else {
        throw new Error('No image URL returned from upload server');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload background image');
    } finally {
      setIsUploadingBg(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle Support background image upload
  const handleSupportBgImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Maximum allowed image size is 5MB.');
      return;
    }

    setIsUploadingSupportBg(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', 'home-cms');

    try {
      const res = await api.post('/api/upload/single', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = res.data?.data?.url || res.data?.url;
      if (uploadedUrl) {
        handleFieldChange('support', 'backgroundImage', uploadedUrl);
        toast.success('Support background image uploaded successfully!');
      } else {
        throw new Error('No image URL returned from upload server');
      }
    } catch (error) {
      console.error('Support upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload background image');
    } finally {
      setIsUploadingSupportBg(false);
      if (supportFileInputRef.current) supportFileInputRef.current.value = '';
    }
  };

  // Save all changes
  const handleSave = () => {
    if (!formData) return;

    // Clean payload: pass pure section data
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
    { id: 'hero', label: 'Hero Section', icon: Sparkles },
    { id: 'trust', label: 'Trust & Stats', icon: Shield },
    { id: 'assessment', label: 'Assessment', icon: FileCheck },
    { id: 'support', label: 'Support & Guidance', icon: HeartHandshake },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#1B2B4B]/10">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1B2B4B] sm:text-3xl">
              Home Page CMS
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A84C]/15 px-3 py-1 text-xs font-bold text-[#8C6D1F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              Live Editor
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#1B2B4B]/60">
            Edit headlines, text, badges, background images, and cards with live instant preview.
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
              title="Split View (Editor + Live Preview)"
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
              title="Editor Full Width"
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
              title="Preview Full Width"
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
            <Link href="/" target="_blank" rel="noreferrer">
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
                className="flex-1 min-w-[130px] sm:min-w-[140px] px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer data-[state=active]:bg-[#1B2B4B] data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-[#F8F5EF]"
              >
                <Icon className="mr-2 h-4 w-4 text-[#C9A84C]" />
                <span className="truncate">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Main Content Layout (Split Screen or Single Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor (Visible in 'split' or 'edit' mode) */}
          {(layoutMode === 'split' || layoutMode === 'edit') && (
            <div
              className={`space-y-6 transition-all duration-300 ${
                layoutMode === 'split' ? 'lg:col-span-6 xl:col-span-5' : 'lg:col-span-12'
              }`}
            >
              {/* 1. HERO SECTION TAB */}
              <TabsContent value="hero" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Hero Section</CardTitle>
                    <CardDescription>
                      Headline, badge, call-to-action button, background image, and key trust points.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Background Image Upload & Input */}
                    <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Hero Background Image
                        </Label>
                        {formData.hero?.backgroundImage && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFieldChange('hero', 'backgroundImage', '/images/hero-bg.png')}
                            className="h-6 text-[11px] text-[#1B2B4B]/60 hover:text-[#1B2B4B] cursor-pointer"
                          >
                            Reset Default
                          </Button>
                        )}
                      </div>

                      {/* Thumbnail Preview */}
                      <div className="relative h-36 w-full overflow-hidden rounded-xl border border-[#1B2B4B]/15 bg-[#04103A] shadow-inner group">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('${formData.hero?.backgroundImage || '/images/hero-bg.png'}')`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                          <span className="text-[11px] font-medium text-white/90 truncate">
                            {formData.hero?.backgroundImage || '/images/hero-bg.png'}
                          </span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex gap-2">
                        <Input
                          value={formData.hero?.backgroundImage || ''}
                          onChange={(e) => handleFieldChange('hero', 'backgroundImage', e.target.value)}
                          placeholder="/images/hero-bg.png or https://..."
                          className="bg-white text-xs"
                        />
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleBgImageUpload}
                          className="hidden"
                          id="hero-bg-file"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isUploadingBg}
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-white border-[#1B2B4B]/20 text-xs font-bold text-[#1B2B4B] hover:bg-[#F8F5EF] shrink-0 cursor-pointer"
                        >
                          {isUploadingBg ? (
                            <>
                              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-1.5 h-3.5 w-3.5 text-[#C9A84C]" />
                              Upload
                            </>
                          )}
                        </Button>
                      </div>

                      <p className="text-[11px] text-[#1B2B4B]/60 font-medium">
                        Recommended format: PNG/JPG (Max 5MB)
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Top Badge Text</Label>
                        <Input
                          value={formData.hero?.badge || ''}
                          onChange={(e) => handleFieldChange('hero', 'badge', e.target.value)}
                          placeholder="e.g. Retirement made clearer"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">CTA Button Text</Label>
                        <Input
                          value={formData.hero?.ctaText || ''}
                          onChange={(e) => handleFieldChange('hero', 'ctaText', e.target.value)}
                          placeholder="e.g. Take Assessment"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Main Headline (H1)</Label>
                      <Input
                        value={formData.hero?.title || ''}
                        onChange={(e) => handleFieldChange('hero', 'title', e.target.value)}
                        placeholder="Navigate Retirement With Confidence..."
                        className="font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Subtitle / Description</Label>
                      <Textarea
                        rows={3}
                        value={formData.hero?.subtitle || ''}
                        onChange={(e) => handleFieldChange('hero', 'subtitle', e.target.value)}
                        placeholder="Retirement Waypoint helps professionals understand their readiness..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">CTA Target Link</Label>
                      <Input
                        value={formData.hero?.ctaLink || ''}
                        onChange={(e) => handleFieldChange('hero', 'ctaLink', e.target.value)}
                        placeholder="/assessment"
                      />
                    </div>

                    {/* Trust Points */}
                    <div className="space-y-3 pt-3 border-t border-[#1B2B4B]/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                            Trust Points
                          </h3>
                          <p className="text-[11px] text-[#1B2B4B]/60">
                            Bullet highlights shown beneath the CTA.
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddTrustPoint}
                          className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5"
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Point
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {(
                          formData.hero?.trustPoints?.length
                            ? formData.hero.trustPoints
                            : defaultTrustPoints
                        ).map((point, index) => {
                          const pointText = typeof point === 'string' ? point : point?.text || '';
                          return (
                            <div key={index} className="flex items-center gap-2">
                              <Input
                                value={pointText}
                                onChange={(e) => handleTrustPointChange(index, e.target.value)}
                                placeholder="Trust point statement"
                                className="text-xs"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveTrustPoint(index)}
                                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 2. TRUST SECTION TAB */}
              <TabsContent value="trust" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Trust & Methodology</CardTitle>
                    <CardDescription>
                      Headline, badge, description, and the 4 metric cards.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Badge Text</Label>
                        <Input
                          value={formData.trust?.badge || ''}
                          onChange={(e) => handleFieldChange('trust', 'badge', e.target.value)}
                          placeholder="Built for meaningful transition"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Section Title</Label>
                        <Input
                          value={formData.trust?.title || ''}
                          onChange={(e) => handleFieldChange('trust', 'title', e.target.value)}
                          placeholder="Built on Psychology, Purpose, and Progress"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Description</Label>
                      <Textarea
                        rows={2}
                        value={formData.trust?.subtitle || ''}
                        onChange={(e) => handleFieldChange('trust', 'subtitle', e.target.value)}
                        placeholder="Helping professionals transition into retirement with clarity..."
                      />
                    </div>

                    {/* Stats Cards */}
                    <div className="space-y-3 pt-3 border-t border-[#1B2B4B]/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Stats & Metric Cards
                        </h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddArrayItem(
                              'trust',
                              'stats',
                              {
                                iconName: 'TrendingUp',
                                value: '100%',
                                label: 'New Metric',
                                description: 'Description of the metric and its benefit.',
                              },
                              defaultTrustStats
                            )
                          }
                          className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5"
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Card
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {(formData.trust?.stats?.length ? formData.trust.stats : defaultTrustStats).map((stat, index) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-3.5 space-y-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#C9A84C]">Card #{index + 1}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveArrayItem('trust', 'stats', index)}
                                className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <Label className="text-[11px] font-semibold text-[#1B2B4B]">Value / Number</Label>
                                <Input
                                  value={stat.value}
                                  onChange={(e) =>
                                    handleArrayItemChange('trust', 'stats', index, 'value', e.target.value)
                                  }
                                  placeholder="e.g. 40+"
                                  className="bg-white text-xs h-8"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-[11px] font-semibold text-[#1B2B4B]">Label</Label>
                                <Input
                                  value={stat.label}
                                  onChange={(e) =>
                                    handleArrayItemChange('trust', 'stats', index, 'label', e.target.value)
                                  }
                                  placeholder="e.g. Years Experience"
                                  className="bg-white text-xs h-8"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <Label className="text-[11px] font-semibold text-[#1B2B4B]">Description</Label>
                              <Textarea
                                rows={2}
                                value={stat.description}
                                onChange={(e) =>
                                  handleArrayItemChange(
                                    'trust',
                                    'stats',
                                    index,
                                    'description',
                                    e.target.value
                                  )
                                }
                                placeholder="Short summary..."
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

              {/* 3. ASSESSMENT PREVIEW TAB */}
              <TabsContent value="assessment" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Assessment Preview</CardTitle>
                    <CardDescription>
                      Headline, badge, description, and workflow steps.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Badge Text</Label>
                        <Input
                          value={formData.assessmentPreview?.badge || ''}
                          onChange={(e) =>
                            handleFieldChange('assessmentPreview', 'badge', e.target.value)
                          }
                          placeholder="Retirement Readiness Assessment"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Section Title</Label>
                        <Input
                          value={formData.assessmentPreview?.title || ''}
                          onChange={(e) =>
                            handleFieldChange('assessmentPreview', 'title', e.target.value)
                          }
                          placeholder="Understand Where You Are — And What Comes Next"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Description</Label>
                      <Textarea
                        rows={2}
                        value={formData.assessmentPreview?.description || ''}
                        onChange={(e) =>
                          handleFieldChange('assessmentPreview', 'description', e.target.value)
                        }
                        placeholder="Gain personalized insights into your emotional readiness..."
                      />
                    </div>

                    {/* Steps */}
                    <div className="space-y-3 pt-3 border-t border-[#1B2B4B]/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Workflow Steps
                        </h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddArrayItem(
                              'assessmentPreview',
                              'steps',
                              {
                                iconName: 'Target',
                                title: 'New Step',
                                description: 'Explanation of this step.',
                              },
                              defaultAssessmentSteps
                            )
                          }
                          className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5"
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Step
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {(formData.assessmentPreview?.steps?.length
                          ? formData.assessmentPreview.steps
                          : defaultAssessmentSteps
                        ).map((step, index) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-3.5 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#C9A84C]">Step {index + 1}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveArrayItem('assessmentPreview', 'steps', index)}
                                className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-[11px] font-semibold text-[#1B2B4B]">Title</Label>
                              <Input
                                value={step.title}
                                onChange={(e) =>
                                  handleArrayItemChange(
                                    'assessmentPreview',
                                    'steps',
                                    index,
                                    'title',
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. Answer Guided Questions"
                                className="bg-white text-xs h-8"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-[11px] font-semibold text-[#1B2B4B]">Description</Label>
                              <Input
                                value={step.description}
                                onChange={(e) =>
                                  handleArrayItemChange(
                                    'assessmentPreview',
                                    'steps',
                                    index,
                                    'description',
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. Reflect on your readiness..."
                                className="bg-white text-xs h-8"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Sample Question Card */}
                    <div className="space-y-4 pt-4 border-t border-[#1B2B4B]/10">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Interactive Sample Question Card
                        </h3>
                        <p className="text-[11px] text-[#1B2B4B]/60">
                          Configure the live interactive mockup card shown alongside the assessment steps.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-4 space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-[#1B2B4B]">Question Tag / Number</Label>
                            <Input
                              value={
                                formData.assessmentPreview?.sampleCard?.questionNumber ||
                                'Question 13'
                              }
                              onChange={(e) =>
                                handleSampleCardChange('questionNumber', e.target.value)
                              }
                              placeholder="e.g. Question 13"
                              className="bg-white text-xs"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-[#1B2B4B]">Progress Percentage</Label>
                            <Input
                              value={
                                formData.assessmentPreview?.sampleCard?.progressPercent ||
                                '52%'
                              }
                              onChange={(e) =>
                                handleSampleCardChange('progressPercent', e.target.value)
                              }
                              placeholder="e.g. 52%"
                              className="bg-white text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-bold text-[#1B2B4B]">Sample Question Statement</Label>
                          <Textarea
                            rows={2}
                            value={
                              formData.assessmentPreview?.sampleCard?.questionText ||
                              'My life purpose feels connected to values beyond my career.'
                            }
                            onChange={(e) =>
                              handleSampleCardChange('questionText', e.target.value)
                            }
                            placeholder="Type the sample question statement..."
                            className="bg-white text-xs"
                          />
                        </div>

                        {/* Answer Options */}
                        <div className="space-y-2 pt-2 border-t border-[#1B2B4B]/10">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-bold text-[#1B2B4B]">
                              Answer Options & Highlight
                            </Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleAddSampleCardOption}
                              className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5 bg-white"
                            >
                              <Plus className="mr-1 h-3.5 w-3.5" />
                              Add Option
                            </Button>
                          </div>

                          <div className="space-y-2">
                            {(
                              formData.assessmentPreview?.sampleCard?.options || [
                                'Strongly Agree',
                                'Agree',
                                'Neutral',
                                'Disagree',
                                'Strongly Disagree',
                              ]
                            ).map((opt, optIndex) => {
                              const isHighlighted =
                                (formData.assessmentPreview?.sampleCard?.selectedOptionIndex ?? 1) === optIndex;
                              return (
                                <div key={optIndex} className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleSampleCardChange('selectedOptionIndex', optIndex)}
                                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer shrink-0 ${
                                      isHighlighted
                                        ? 'bg-[#C9A84C] text-[#1B2B4B] border-[#C9A84C]'
                                        : 'bg-white text-[#1B2B4B]/60 border-[#1B2B4B]/20 hover:border-[#C9A84C]'
                                    }`}
                                    title="Click to set as default highlighted preview option"
                                  >
                                    {isHighlighted ? '✓ Active' : 'Set Active'}
                                  </button>

                                  <Input
                                    value={opt}
                                    onChange={(e) =>
                                      handleSampleCardOptionChange(optIndex, e.target.value)
                                    }
                                    placeholder="Option label"
                                    className="bg-white text-xs h-8"
                                  />

                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveSampleCardOption(optIndex)}
                                    className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer shrink-0"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-[#1B2B4B]/10">
                          <Label className="text-xs font-bold text-[#1B2B4B]">Card Footer Note</Label>
                          <Input
                            value={
                              formData.assessmentPreview?.sampleCard?.footerText ||
                              'Powered by behavioral psychology'
                            }
                            onChange={(e) =>
                              handleSampleCardChange('footerText', e.target.value)
                            }
                            placeholder="e.g. Powered by behavioral psychology"
                            className="bg-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 4. SUPPORT & GUIDANCE TAB */}
              <TabsContent value="support" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Support & Guidance</CardTitle>
                    <CardDescription>
                      Section badge, title, subtitle, and support pillar cards.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Background Image Upload & Input */}
                    <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Support Background Image
                        </Label>
                        {formData.support?.backgroundImage && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleFieldChange('support', 'backgroundImage', '/images/support-bg.jpg')
                            }
                            className="h-6 text-[11px] text-[#1B2B4B]/60 hover:text-[#1B2B4B] cursor-pointer"
                          >
                            Reset Default
                          </Button>
                        )}
                      </div>

                      {/* Thumbnail Preview */}
                      <div className="relative h-36 w-full overflow-hidden rounded-xl border border-[#1B2B4B]/15 bg-[#04103A] shadow-inner group">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('${formData.support?.backgroundImage || '/images/support-bg.jpg'}')`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                          <span className="text-[11px] font-medium text-white/90 truncate">
                            {formData.support?.backgroundImage || '/images/support-bg.jpg'}
                          </span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex gap-2">
                        <Input
                          value={formData.support?.backgroundImage || ''}
                          onChange={(e) =>
                            handleFieldChange('support', 'backgroundImage', e.target.value)
                          }
                          placeholder="/images/support-bg.jpg or https://..."
                          className="bg-white text-xs"
                        />
                        <input
                          ref={supportFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleSupportBgImageUpload}
                          className="hidden"
                          id="support-bg-file"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isUploadingSupportBg}
                          onClick={() => supportFileInputRef.current?.click()}
                          className="bg-white border-[#1B2B4B]/20 text-xs font-bold text-[#1B2B4B] hover:bg-[#F8F5EF] shrink-0 cursor-pointer"
                        >
                          {isUploadingSupportBg ? (
                            <>
                              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-1.5 h-3.5 w-3.5 text-[#C9A84C]" />
                              Upload
                            </>
                          )}
                        </Button>
                      </div>

                      <p className="text-[11px] text-[#1B2B4B]/60 font-medium">
                        Recommended format: PNG/JPG (Max 5MB)
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Badge Text</Label>
                        <Input
                          value={formData.support?.badge || ''}
                          onChange={(e) => handleFieldChange('support', 'badge', e.target.value)}
                          placeholder="How Retirement Waypoint Helps"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Section Title</Label>
                        <Input
                          value={formData.support?.title || ''}
                          onChange={(e) => handleFieldChange('support', 'title', e.target.value)}
                          placeholder="Support For Your Next Chapter"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Subtitle</Label>
                      <Textarea
                        rows={2}
                        value={formData.support?.subtitle || ''}
                        onChange={(e) => handleFieldChange('support', 'subtitle', e.target.value)}
                        placeholder="A simple, structured way to understand your readiness..."
                      />
                    </div>

                    {/* Support Items */}
                    <div className="space-y-3 pt-3 border-t border-[#1B2B4B]/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Support Pillar Cards
                        </h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddArrayItem(
                              'support',
                              'items',
                              {
                                iconName: 'ClipboardCheck',
                                title: 'New Pillar',
                                description: 'Detailed description of this support pillar.',
                              },
                              defaultSupportItems
                            )
                          }
                          className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5"
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Pillar
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {(formData.support?.items?.length
                          ? formData.support.items
                          : defaultSupportItems
                        ).map((item, index) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-3.5 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#C9A84C]">Pillar #{index + 1}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveArrayItem('support', 'items', index)}
                                className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>

                            <div className="space-y-1">
                              <Label className="text-[11px] font-semibold text-[#1B2B4B]">Title</Label>
                              <Input
                                value={item.title}
                                onChange={(e) =>
                                  handleArrayItemChange('support', 'items', index, 'title', e.target.value)
                                }
                                placeholder="e.g. Readiness Assessment"
                                className="bg-white text-xs h-8"
                              />
                            </div>

                            <div className="space-y-1">
                              <Label className="text-[11px] font-semibold text-[#1B2B4B]">Description</Label>
                              <Textarea
                                rows={2}
                                value={item.description}
                                onChange={(e) =>
                                  handleArrayItemChange(
                                    'support',
                                    'items',
                                    index,
                                    'description',
                                    e.target.value
                                  )
                                }
                                placeholder="Short summary of this pillar..."
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

              {/* 6. NEWSLETTER TAB */}
              <TabsContent value="newsletter" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Newsletter Section</CardTitle>
                    <CardDescription>
                      Heading and subtext above the homepage email subscription input.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Headline</Label>
                      <Input
                        value={formData.newsletter?.title || ''}
                        onChange={(e) => handleFieldChange('newsletter', 'title', e.target.value)}
                        placeholder="Stay Up to Date With Our Newsletter"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Subtitle / Description</Label>
                      <Textarea
                        rows={2}
                        value={formData.newsletter?.subtitle || ''}
                        onChange={(e) => handleFieldChange('newsletter', 'subtitle', e.target.value)}
                        placeholder="Our retirement transition insights are designed to guide you..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          )}

          {/* Right Column: Live Mockup Preview (Visible in 'split' or 'preview' mode) */}
          {(layoutMode === 'split' || layoutMode === 'preview') && (
            <div
              className={`sticky top-24 transition-all duration-300 ${
                layoutMode === 'split' ? 'lg:col-span-6 xl:col-span-7' : 'lg:col-span-12'
              }`}
            >
              <HomeCmsLivePreview formData={formData} activeTab={activeTab} />
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}

export default AdminHomeCms;

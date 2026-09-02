/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Save,
  Loader2,
  UserCheck,
  HeartHandshake,
  Target,
  Image as ImageIcon,
  Send,
  Plus,
  Trash2,
  RotateCcw,
  ExternalLink,
  Upload,
  Columns2,
  PanelLeft,
  Eye,
  Brain,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAboutCmsAdmin, useUpdateAboutCms } from '../hooks/useAboutCms';
import { AboutCmsLivePreview } from './AboutCmsLivePreview';
import api from '@/lib/api/axios';

const defaultBioParagraphs = [
  'Dave holds a Ph.D. in Industrial/Organizational Psychology from Kansas State University and brings more than 40 years of experience helping people understand work, motivation, leadership, identity, and life transitions.',
  'Over the course of his career, he held leadership positions with several national consulting firms — Watson Wyatt, TRI-AD, Kenexa, and Right Management — where his work centered on organizational assessment, research identifying the drivers of employee satisfaction and engagement, coaching, and leadership development.',
  'Dave started Retirement Waypoint after going through his own transition out of full-time consulting. As he moved from a long, demanding career toward retirement, he found surprisingly few resources built to help with the psychological side of that shift — the questions of identity, the loss of daily structure and purpose, and the work of building a genuinely fulfilling life after work. Drawing on decades spent researching what makes people thrive professionally, he created Retirement Waypoint to close that gap: a resource grounded in psychological science, not just financial planning, to help other professionals move into retirement with the same clarity and intention they brought to their careers.',
];

const defaultCredentials = [
  '40+ Years Experience',
  'Industrial Psychologist',
  'Retirement Transition Specialist',
];

const defaultValues = [
  {
    iconName: 'Target',
    title: 'Purpose',
    description:
      'Helping people rediscover meaning and direction beyond their professional identity.',
  },
  {
    iconName: 'Compass',
    title: 'Clarity',
    description:
      'Turning uncertainty into a clearer path for the next chapter of life.',
  },
  {
    iconName: 'ShieldCheck',
    title: 'Confidence',
    description:
      'Supporting professionals as they move forward with emotional readiness.',
  },
  {
    iconName: 'Users',
    title: 'Human Connection',
    description:
      'Recognizing that relationships, belonging, and support shape a fulfilling retirement.',
  },
];

export function AdminAboutCms() {
  const { data: response, isLoading, refetch } = useAboutCmsAdmin();
  const updateMutation = useUpdateAboutCms();

  const cmsData = response?.data;
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [layoutMode, setLayoutMode] = useState('split'); // 'split' | 'edit' | 'preview'

  // Image Upload states & refs
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const profileFileInputRef = useRef(null);

  const [isUploadingBannerBg, setIsUploadingBannerBg] = useState(false);
  const bannerFileInputRef = useRef(null);

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
        <p className="text-sm font-medium text-[#1B2B4B]/70">Loading About Page CMS content...</p>
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

  // Handle nested object field changes (e.g. missionVision.mission.title)
  const handleNestedFieldChange = (section, subSection, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...(prev[section]?.[subSection] || {}),
          [field]: value,
        },
      },
    }));
  };

  // Generic Array Item Change
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

  // Generic Array Add Item
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

  // Generic Array Remove Item
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

  // Bio Paragraph String Array Handlers
  const handleBioParagraphChange = (index, value) => {
    setFormData((prev) => {
      const list = [...(prev.hero?.bioParagraphs?.length ? prev.hero.bioParagraphs : defaultBioParagraphs)];
      list[index] = value;
      return {
        ...prev,
        hero: {
          ...prev.hero,
          bioParagraphs: list,
        },
      };
    });
  };

  const handleAddBioParagraph = () => {
    setFormData((prev) => {
      const list = [...(prev.hero?.bioParagraphs?.length ? prev.hero.bioParagraphs : defaultBioParagraphs)];
      return {
        ...prev,
        hero: {
          ...prev.hero,
          bioParagraphs: [...list, 'New biography paragraph statement.'],
        },
      };
    });
  };

  const handleRemoveBioParagraph = (index) => {
    setFormData((prev) => {
      const list = [...(prev.hero?.bioParagraphs?.length ? prev.hero.bioParagraphs : defaultBioParagraphs)];
      return {
        ...prev,
        hero: {
          ...prev.hero,
          bioParagraphs: list.filter((_, idx) => idx !== index),
        },
      };
    });
  };

  // Credentials String Array Handlers
  const handleCredentialChange = (index, value) => {
    setFormData((prev) => {
      const list = [...(prev.hero?.credentials?.length ? prev.hero.credentials : defaultCredentials)];
      list[index] = value;
      return {
        ...prev,
        hero: {
          ...prev.hero,
          credentials: list,
        },
      };
    });
  };

  const handleAddCredential = () => {
    setFormData((prev) => {
      const list = [...(prev.hero?.credentials?.length ? prev.hero.credentials : defaultCredentials)];
      return {
        ...prev,
        hero: {
          ...prev.hero,
          credentials: [...list, 'New Credential'],
        },
      };
    });
  };

  const handleRemoveCredential = (index) => {
    setFormData((prev) => {
      const list = [...(prev.hero?.credentials?.length ? prev.hero.credentials : defaultCredentials)];
      return {
        ...prev,
        hero: {
          ...prev.hero,
          credentials: list.filter((_, idx) => idx !== index),
        },
      };
    });
  };

  // Profile Image Upload Handler
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Maximum allowed image size is 5MB.');
      return;
    }

    setIsUploadingProfile(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', 'about-cms');

    try {
      const res = await api.post('/api/upload/single', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = res.data?.data?.url || res.data?.url;
      if (uploadedUrl) {
        handleFieldChange('hero', 'profileImage', uploadedUrl);
        toast.success('Profile photo uploaded successfully!');
      } else {
        throw new Error('No image URL returned from upload server');
      }
    } catch (error) {
      console.error('Profile upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploadingProfile(false);
      if (profileFileInputRef.current) profileFileInputRef.current.value = '';
    }
  };

  // Banner Background Image Upload Handler
  const handleBannerBgUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Maximum allowed image size is 5MB.');
      return;
    }

    setIsUploadingBannerBg(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', 'about-cms');

    try {
      const res = await api.post('/api/upload/single', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = res.data?.data?.url || res.data?.url;
      if (uploadedUrl) {
        handleFieldChange('quoteBanner', 'backgroundImage', uploadedUrl);
        toast.success('Quote banner background uploaded successfully!');
      } else {
        throw new Error('No image URL returned from upload server');
      }
    } catch (error) {
      console.error('Banner upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload background image');
    } finally {
      setIsUploadingBannerBg(false);
      if (bannerFileInputRef.current) bannerFileInputRef.current.value = '';
    }
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
    { id: 'hero', label: 'Hero & Bio', icon: UserCheck },
    { id: 'missionVision', label: 'Mission & Vision', icon: HeartHandshake },
    { id: 'coreValues', label: 'Core Values', icon: Target },
    { id: 'quoteBanner', label: 'Quote Banner', icon: ImageIcon },
    { id: 'finalCta', label: 'Call to Action', icon: Send },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#1B2B4B]/10">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1B2B4B] sm:text-3xl">
              About Page CMS
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A84C]/15 px-3 py-1 text-xs font-bold text-[#8C6D1F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              Live Editor
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#1B2B4B]/60">
            Edit biography, credentials, mission, core values cards, quote banner, and final CTA with live instant preview.
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
            <Link href="/about" target="_blank" rel="noreferrer">
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
          {/* Left Column: Form Editor */}
          {(layoutMode === 'split' || layoutMode === 'edit') && (
            <div
              className={`space-y-6 transition-all duration-300 ${
                layoutMode === 'split' ? 'lg:col-span-6 xl:col-span-5' : 'lg:col-span-12'
              }`}
            >
              {/* 1. HERO & BIO TAB */}
              <TabsContent value="hero" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Hero & Biography Section</CardTitle>
                    <CardDescription>
                      Profile photo, badge, main headline, biography paragraphs, and credentials tags.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Profile Photo Manager */}
                    <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Dave&apos;s Profile Photo
                        </Label>
                        {formData.hero?.profileImage && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleFieldChange('hero', 'profileImage', '/images/about/dave-story-2.png')
                            }
                            className="h-6 text-[11px] text-[#1B2B4B]/60 hover:text-[#1B2B4B] cursor-pointer"
                          >
                            Reset Default
                          </Button>
                        )}
                      </div>

                      {/* Thumbnail Preview */}
                      <div className="relative h-44 w-full overflow-hidden rounded-xl border border-[#1B2B4B]/15 bg-[#1B2B4B] shadow-inner group">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('${formData.hero?.profileImage || '/images/about/dave-story-2.png'}')`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                          <span className="text-[11px] font-medium text-white/90 truncate">
                            {formData.hero?.profileImage || '/images/about/dave-story-2.png'}
                          </span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex gap-2">
                        <Input
                          value={formData.hero?.profileImage || ''}
                          onChange={(e) => handleFieldChange('hero', 'profileImage', e.target.value)}
                          placeholder="/images/about/dave-story-2.png or https://..."
                          className="bg-white text-xs"
                        />
                        <input
                          ref={profileFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageUpload}
                          className="hidden"
                          id="profile-img-file"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isUploadingProfile}
                          onClick={() => profileFileInputRef.current?.click()}
                          className="bg-white border-[#1B2B4B]/20 text-xs font-bold text-[#1B2B4B] hover:bg-[#F8F5EF] shrink-0 cursor-pointer"
                        >
                          {isUploadingProfile ? (
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
                        <Label className="text-xs font-bold text-[#1B2B4B]">Top Badge</Label>
                        <Input
                          value={formData.hero?.badge || ''}
                          onChange={(e) => handleFieldChange('hero', 'badge', e.target.value)}
                          placeholder="Psychology Meets Purpose"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Main Headline</Label>
                        <Input
                          value={formData.hero?.title || ''}
                          onChange={(e) => handleFieldChange('hero', 'title', e.target.value)}
                          placeholder="The Psychology Behind Retirement Waypoint"
                        />
                      </div>
                    </div>

                    {/* Biography Paragraphs */}
                    <div className="space-y-3 pt-3 border-t border-[#1B2B4B]/10">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Biography Paragraphs
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddBioParagraph}
                          className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5 bg-white"
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Paragraph
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {(formData.hero?.bioParagraphs?.length ? formData.hero.bioParagraphs : defaultBioParagraphs).map(
                          (paragraph, index) => (
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
                                  onClick={() => handleRemoveBioParagraph(index)}
                                  className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                              <Textarea
                                rows={3}
                                value={paragraph}
                                onChange={(e) => handleBioParagraphChange(index, e.target.value)}
                                placeholder="Type biography paragraph..."
                                className="bg-white text-xs"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Credentials Pills */}
                    <div className="space-y-3 pt-3 border-t border-[#1B2B4B]/10">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Credentials & Tags
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddCredential}
                          className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5 bg-white"
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Pill
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {(formData.hero?.credentials?.length ? formData.hero.credentials : defaultCredentials).map(
                          (cred, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Input
                                value={cred}
                                onChange={(e) => handleCredentialChange(index, e.target.value)}
                                placeholder="e.g. Industrial Psychologist"
                                className="bg-white text-xs h-8"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveCredential(index)}
                                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 2. MISSION & VISION TAB */}
              <TabsContent value="missionVision" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Mission & Vision Section</CardTitle>
                    <CardDescription>
                      Section title, subtitle, and dedicated Mission and Vision cards.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Section Title</Label>
                      <Input
                        value={formData.missionVision?.title || ''}
                        onChange={(e) => handleFieldChange('missionVision', 'title', e.target.value)}
                        placeholder="A More Human Way To Approach Retirement"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Section Subtitle</Label>
                      <Textarea
                        rows={2}
                        value={formData.missionVision?.subtitle || ''}
                        onChange={(e) => handleFieldChange('missionVision', 'subtitle', e.target.value)}
                        placeholder="Retirement Waypoint exists to bring emotional clarity..."
                      />
                    </div>

                    {/* Mission Card */}
                    <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <HeartHandshake className="h-4 w-4 text-[#C9A84C]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">Mission Card</h4>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold text-[#1B2B4B]">Card Title</Label>
                        <Input
                          value={formData.missionVision?.mission?.title || 'Mission'}
                          onChange={(e) =>
                            handleNestedFieldChange('missionVision', 'mission', 'title', e.target.value)
                          }
                          className="bg-white text-xs h-8"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold text-[#1B2B4B]">Description</Label>
                        <Textarea
                          rows={2}
                          value={formData.missionVision?.mission?.description || ''}
                          onChange={(e) =>
                            handleNestedFieldChange('missionVision', 'mission', 'description', e.target.value)
                          }
                          placeholder="Helping professionals thrive emotionally..."
                          className="bg-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Vision Card */}
                    <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-[#C9A84C]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">Vision Card</h4>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold text-[#1B2B4B]">Card Title</Label>
                        <Input
                          value={formData.missionVision?.vision?.title || 'Vision'}
                          onChange={(e) =>
                            handleNestedFieldChange('missionVision', 'vision', 'title', e.target.value)
                          }
                          className="bg-white text-xs h-8"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold text-[#1B2B4B]">Description</Label>
                        <Textarea
                          rows={2}
                          value={formData.missionVision?.vision?.description || ''}
                          onChange={(e) =>
                            handleNestedFieldChange('missionVision', 'vision', 'description', e.target.value)
                          }
                          placeholder="A future where retirement is approached with clarity..."
                          className="bg-white text-xs"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 3. CORE VALUES TAB */}
              <TabsContent value="coreValues" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Core Values Section</CardTitle>
                    <CardDescription>
                      Headline, description, and dynamic Core Value cards.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Section Title</Label>
                      <Input
                        value={formData.coreValues?.title || ''}
                        onChange={(e) => handleFieldChange('coreValues', 'title', e.target.value)}
                        placeholder="The Values Behind Retirement Waypoint"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Section Subtitle</Label>
                      <Textarea
                        rows={2}
                        value={formData.coreValues?.subtitle || ''}
                        onChange={(e) => handleFieldChange('coreValues', 'subtitle', e.target.value)}
                        placeholder="Every part of the platform is shaped by the belief..."
                      />
                    </div>

                    {/* Values Cards */}
                    <div className="space-y-3 pt-3 border-t border-[#1B2B4B]/10">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Value Cards
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddArrayItem(
                              'coreValues',
                              'values',
                              {
                                iconName: 'Target',
                                title: 'New Core Value',
                                description: 'Summary of how this value shapes the experience.',
                              },
                              defaultValues
                            )
                          }
                          className="border-[#1B2B4B]/20 text-xs font-semibold cursor-pointer h-7 px-2.5 bg-white"
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Card
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {(formData.coreValues?.values?.length ? formData.coreValues.values : defaultValues).map(
                          (val, index) => (
                            <div
                              key={index}
                              className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-3.5 space-y-2.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#C9A84C]">Value #{index + 1}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveArrayItem('coreValues', 'values', index)}
                                  className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>

                              <div className="space-y-1">
                                <Label className="text-[11px] font-semibold text-[#1B2B4B]">Value Title</Label>
                                <Input
                                  value={val.title}
                                  onChange={(e) =>
                                    handleArrayItemChange('coreValues', 'values', index, 'title', e.target.value)
                                  }
                                  placeholder="e.g. Purpose, Clarity, Confidence"
                                  className="bg-white text-xs h-8"
                                />
                              </div>

                              <div className="space-y-1">
                                <Label className="text-[11px] font-semibold text-[#1B2B4B]">Description</Label>
                                <Textarea
                                  rows={2}
                                  value={val.description}
                                  onChange={(e) =>
                                    handleArrayItemChange('coreValues', 'values', index, 'description', e.target.value)
                                  }
                                  placeholder="Explanation of the value..."
                                  className="bg-white text-xs"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 4. INSPIRATIONAL QUOTE BANNER TAB */}
              <TabsContent value="quoteBanner" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Inspirational Quote Banner</CardTitle>
                    <CardDescription>
                      Full-width background image, inspirational headline, and supporting statement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Background Image Upload & Input */}
                    <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/60 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]">
                          Banner Background Image
                        </Label>
                        {formData.quoteBanner?.backgroundImage && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleFieldChange(
                                'quoteBanner',
                                'backgroundImage',
                                '/images/about/retirement-lifestyle.jpg'
                              )
                            }
                            className="h-6 text-[11px] text-[#1B2B4B]/60 hover:text-[#1B2B4B] cursor-pointer"
                          >
                            Reset Default
                          </Button>
                        )}
                      </div>

                      {/* Thumbnail Preview */}
                      <div className="relative h-36 w-full overflow-hidden rounded-xl border border-[#1B2B4B]/15 bg-[#1B2B4B] shadow-inner group">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('${formData.quoteBanner?.backgroundImage || '/images/about/retirement-lifestyle.jpg'}')`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                          <span className="text-[11px] font-medium text-white/90 truncate">
                            {formData.quoteBanner?.backgroundImage || '/images/about/retirement-lifestyle.jpg'}
                          </span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex gap-2">
                        <Input
                          value={formData.quoteBanner?.backgroundImage || ''}
                          onChange={(e) =>
                            handleFieldChange('quoteBanner', 'backgroundImage', e.target.value)
                          }
                          placeholder="/images/about/retirement-lifestyle.jpg or https://..."
                          className="bg-white text-xs"
                        />
                        <input
                          ref={bannerFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleBannerBgUpload}
                          className="hidden"
                          id="banner-bg-file"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isUploadingBannerBg}
                          onClick={() => bannerFileInputRef.current?.click()}
                          className="bg-white border-[#1B2B4B]/20 text-xs font-bold text-[#1B2B4B] hover:bg-[#F8F5EF] shrink-0 cursor-pointer"
                        >
                          {isUploadingBannerBg ? (
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

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Quote Headline</Label>
                      <Input
                        value={formData.quoteBanner?.title || ''}
                        onChange={(e) => handleFieldChange('quoteBanner', 'title', e.target.value)}
                        placeholder="Retirement Is Not The End Of Your Story"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Quote Subtitle</Label>
                      <Textarea
                        rows={2}
                        value={formData.quoteBanner?.subtitle || ''}
                        onChange={(e) => handleFieldChange('quoteBanner', 'subtitle', e.target.value)}
                        placeholder="It's the beginning of a new chapter filled with purpose..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 5. CALL TO ACTION TAB */}
              <TabsContent value="finalCta" className="m-0 space-y-6">
                <Card className="rounded-3xl border-[#1B2B4B]/10 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#1B2B4B]">Final Call to Action</CardTitle>
                    <CardDescription>
                      Bottom banner prompt and assessment navigation button.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Headline</Label>
                      <Input
                        value={formData.finalCta?.title || ''}
                        onChange={(e) => handleFieldChange('finalCta', 'title', e.target.value)}
                        placeholder="Ready To Understand Your Retirement Readiness?"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#1B2B4B]">Subtitle</Label>
                      <Textarea
                        rows={2}
                        value={formData.finalCta?.subtitle || ''}
                        onChange={(e) => handleFieldChange('finalCta', 'subtitle', e.target.value)}
                        placeholder="Take the assessment and begin building a more meaningful..."
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Button Text</Label>
                        <Input
                          value={formData.finalCta?.buttonText || 'Take Assessment'}
                          onChange={(e) => handleFieldChange('finalCta', 'buttonText', e.target.value)}
                          placeholder="Take Assessment"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#1B2B4B]">Button Link</Label>
                        <Input
                          value={formData.finalCta?.buttonLink || '/assessment'}
                          onChange={(e) => handleFieldChange('finalCta', 'buttonLink', e.target.value)}
                          placeholder="/assessment"
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
              <AboutCmsLivePreview formData={formData} activeTab={activeTab} />
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}

export default AdminAboutCms;

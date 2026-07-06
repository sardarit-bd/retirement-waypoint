'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, X, Plus, Trash2, Copy, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mockResultRanges = [
  {
    id: 'range1',
    title: 'Ready for Retirement',
    minScore: 80,
    maxScore: 100,
    description: 'You are well prepared for retirement with strong foundations.',
    color: '#10b981',
    recommendations: [
      {
        id: 'rec1',
        title: 'Explore Your Purpose',
        description: 'Continue exploring activities that bring you meaning.',
        priority: 1,
        bookIds: ['book1', 'book2'],
        resourceLinks: ['https://example.com/resource1'],
        ctaText: 'Learn More',
        ctaLink: 'https://example.com',
      },
    ],
  },
  {
    id: 'range2',
    title: 'Getting Closer',
    minScore: 60,
    maxScore: 79,
    description: 'You are making progress but have areas to strengthen.',
    color: '#C9A84C',
    recommendations: [],
  },
];

export function AdminResultsBuilder() {
  const [ranges, setRanges] = useState(mockResultRanges);
  const [editingRangeId, setEditingRangeId] = useState(null);
  const [editingRecId, setEditingRecId] = useState(null);

  const handleAddRange = () => {
    const newRange = {
      id: `range${ranges.length + 1}`,
      title: 'New Result Range',
      minScore: 0,
      maxScore: 100,
      description: '',
      color: '#C9A84C',
      recommendations: [],
    };
    setRanges([...ranges, newRange]);
  };

  const handleDeleteRange = (id) => {
    setRanges(ranges.filter(r => r.id !== id));
  };

  const handleAddRecommendation = (rangeId) => {
    const range = ranges.find(r => r.id === rangeId);
    if (range) {
      const newRec = {
        id: `rec${range.recommendations.length + 1}`,
        title: 'New Recommendation',
        description: '',
        priority: 1,
        bookIds: [],
        resourceLinks: [],
        ctaText: 'Learn More',
        ctaLink: '',
      };
      range.recommendations.push(newRec);
      setRanges([...ranges]);
    }
  };

  const handleDeleteRecommendation = (rangeId, recId) => {
    const range = ranges.find(r => r.id === rangeId);
    if (range) {
      range.recommendations = range.recommendations.filter(r => r.id !== recId);
      setRanges([...ranges]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Results Builder</h2>
          <p className="text-white/60">Define result ranges and recommendations</p>
        </div>
        <Button
          onClick={handleAddRange}
          className="rounded-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Result Range
        </Button>
      </div>

      {/* Result Ranges */}
      <div className="space-y-4">
        {ranges.map((range) => (
          <motion.div
            key={range.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-start gap-4">
              <div
                className="h-3 w-3 rounded-full shrink-0 mt-2"
                style={{ backgroundColor: range.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{range.title}</h3>
                  <Badge className="bg-white/10 text-white/60 border-white/10">
                    {range.minScore} - {range.maxScore}%
                  </Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {range.recommendations.length} recommendations
                  </Badge>
                </div>
                {range.description && (
                  <p className="text-sm text-white/60 mt-1">{range.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 rounded-full p-0 text-white/40 hover:text-white hover:bg-white/10"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteRange(range.id)}
                  className="h-8 w-8 rounded-full p-0 text-red-400/40 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-4 space-y-2">
              {range.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-xl border border-white/5 bg-white/5 p-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white/80">{rec.title}</span>
                      <Badge variant="outline" className="text-[10px] text-white/40 border-white/10">
                        Priority {rec.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 rounded-full p-0 text-white/30 hover:text-white hover:bg-white/10"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRecommendation(range.id, rec.id)}
                        className="h-6 w-6 rounded-full p-0 text-red-400/30 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  {rec.description && (
                    <p className="text-sm text-white/40">{rec.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-1">
                    {rec.bookIds.length > 0 && (
                      <span className="text-xs text-white/30">📚 {rec.bookIds.length} books</span>
                    )}
                    {rec.resourceLinks.length > 0 && (
                      <span className="text-xs text-white/30">🔗 {rec.resourceLinks.length} resources</span>
                    )}
                    {rec.ctaText && (
                      <span className="text-xs text-[#C9A84C]">{rec.ctaText}</span>
                    )}
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddRecommendation(range.id)}
                className="w-full rounded-xl border border-dashed border-white/15 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add Recommendation
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
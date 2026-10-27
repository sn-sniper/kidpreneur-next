'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  Calendar,
  MapPin,
  ExternalLink,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Star,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  Loader2,
  X,
  Upload,
} from 'lucide-react';
import { MediaLibrary } from './MediaLibrary';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  type: 'WORKSHOP' | 'ACTIVITY' | 'INSTAGRAM';
  status: 'UPCOMING' | 'COMPLETED' | 'DRAFT';
  category?: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
  summary?: string;
  content?: string;
  coverImageUrl?: string;
  galleryImages?: string[];
  instagramUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  isFeatured?: number;
  isPublished?: number;
  orderIndex?: number;
  createdAt?: string | number;
}

export const PortfolioManager: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Media Picker Sub-modal
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'cover' | 'gallery' | null>(null);

  // Instagram Activity Engine State
  const [isEngineOpen, setIsEngineOpen] = useState(false);
  const [engineUrl, setEngineUrl] = useState('');
  const [engineLoading, setEngineLoading] = useState(false);
  const [engineError, setEngineError] = useState<string | null>(null);
  const [engineData, setEngineData] = useState<any | null>(null);
  const [enginePublishing, setEnginePublishing] = useState(false);

  const [engineTitle, setEngineTitle] = useState('');
  const [engineType, setEngineType] = useState<'WORKSHOP' | 'ACTIVITY' | 'INSTAGRAM'>('INSTAGRAM');
  const [engineStatus, setEngineStatus] = useState<'UPCOMING' | 'COMPLETED'>('COMPLETED');
  const [engineSummary, setEngineSummary] = useState('');
  const [engineEventDate, setEngineEventDate] = useState('');
  const [engineLocation, setEngineLocation] = useState('Innovation Hub, Beirut & Online');
  const [engineCoverUrl, setEngineCoverUrl] = useState('');

  const handleEngineFetch = async () => {
    if (!engineUrl.trim()) {
      setEngineError('Please enter an Instagram post or reel URL');
      return;
    }
    try {
      setEngineLoading(true);
      setEngineError(null);
      const res = await fetch('/api/admin/instagram/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: engineUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch Instagram post');
      }

      setEngineData(data);
      setEngineTitle(data.title || '');
      setEngineSummary(data.summary || '');
      setEngineCoverUrl(data.coverImageUrl || '');
      setEngineType(data.suggestedType || 'INSTAGRAM');
      setEngineStatus(data.suggestedStatus || 'COMPLETED');
      if (data.suggestedType === 'WORKSHOP') {
        setEngineEventDate('Upcoming Cohort 2026');
      }
    } catch (err: any) {
      setEngineError(err.message || 'Error parsing Instagram URL');
    } finally {
      setEngineLoading(false);
    }
  };

  const handleEnginePublish = async () => {
    if (!engineTitle.trim()) {
      alert('Please specify an activity title');
      return;
    }
    try {
      setEnginePublishing(true);
      const res = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: engineTitle,
          type: engineType,
          status: engineStatus,
          summary: engineSummary,
          content: engineData?.content || engineSummary,
          coverImageUrl: engineCoverUrl,
          instagramUrl: engineData?.instagramUrl || engineUrl,
          eventDate: engineEventDate || undefined,
          location: engineLocation,
          category: engineType === 'WORKSHOP' ? 'Upcoming Workshop' : engineType === 'ACTIVITY' ? 'Past Activities' : 'Instagram Posts',
          ctaText: engineType === 'WORKSHOP' ? 'Reserve a Seat in the Lab' : engineType === 'ACTIVITY' ? 'Join Next Cohort' : 'Follow @kidpreneur.journey',
          ctaUrl: engineType === 'WORKSHOP' ? 'https://lab.the-kidpreneur-journey.com/register/lab' : engineData?.instagramUrl || engineUrl,
          isFeatured: 1,
          isPublished: 1,
          orderIndex: items.length + 1,
        }),
      });

      if (res.ok) {
        setIsEngineOpen(false);
        setEngineUrl('');
        setEngineData(null);
        fetchItems();
      } else {
        const err = await res.json();
        alert(`Failed to publish: ${err.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert('Error publishing activity');
    } finally {
      setEnginePublishing(false);
    }
  };

  // Form State
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: '',
    slug: '',
    type: 'WORKSHOP',
    status: 'UPCOMING',
    category: 'Workshop',
    eventDate: '',
    eventTime: '',
    location: 'Innovation Hub, Beirut',
    summary: '',
    content: '',
    coverImageUrl: '',
    galleryImages: [],
    instagramUrl: '',
    ctaText: 'Register for Lab',
    ctaUrl: 'https://lab.the-kidpreneur-journey.com/register/lab',
    isFeatured: 0,
    isPublished: 1,
    orderIndex: 0,
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/portfolio');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.error('Error fetching portfolio items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      type: 'WORKSHOP',
      status: 'UPCOMING',
      category: 'Workshop',
      eventDate: '',
      eventTime: '',
      location: 'Innovation Hub, Beirut',
      summary: '',
      content: '',
      coverImageUrl: '',
      galleryImages: [],
      instagramUrl: '',
      ctaText: 'Register for Lab',
      ctaUrl: 'https://lab.the-kidpreneur-journey.com/register/lab',
      isFeatured: 0,
      isPublished: 1,
      orderIndex: items.length,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      ...item,
      galleryImages: item.galleryImages || [],
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingItem ? prev.slug : slug,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return alert('Title is required');

    setSaving(true);
    try {
      const url = editingItem
        ? `/api/admin/portfolio/${editingItem.id}`
        : '/api/admin/portfolio';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchItems();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save item');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving portfolio item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(prev => prev.filter(x => x.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const togglePublished = async (item: PortfolioItem) => {
    const newStatus = item.isPublished ? 0 : 1;
    try {
      const res = await fetch(`/api/admin/portfolio/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: newStatus }),
      });
      if (res.ok) {
        setItems(prev =>
          prev.map(x => (x.id === item.id ? { ...x, isPublished: newStatus } : x))
        );
      }
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  const toggleFeatured = async (item: PortfolioItem) => {
    const newStatus = item.isFeatured ? 0 : 1;
    try {
      const res = await fetch(`/api/admin/portfolio/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: newStatus }),
      });
      if (res.ok) {
        setItems(prev =>
          prev.map(x => (x.id === item.id ? { ...x, isFeatured: newStatus } : x))
        );
      }
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  // Filter items
  const filtered = items.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.summary && item.summary.toLowerCase().includes(search.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(search.toLowerCase()));

    const matchesType =
      selectedType === 'ALL' || item.type === selectedType;

    const matchesStatus =
      selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Portfolio & Showcase CMS</h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Create, edit, and publish upcoming workshops, past activity stories, and Instagram posts.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => {
              setEngineUrl('');
              setEngineData(null);
              setEngineError(null);
              setIsEngineOpen(true);
            }}
            className="flex-1 sm:flex-initial justify-center flex items-center gap-2 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-medium px-4 sm:px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-xs sm:text-sm"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Instagram Engine</span>
          </button>

          <button
            onClick={openCreateModal}
            className="flex-1 sm:flex-initial justify-center flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 sm:px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-xs sm:text-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3.5 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 scrollbar-none">
          {/* Type Filter */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium shrink-0">
            {[
              { id: 'ALL', label: 'All Types' },
              { id: 'WORKSHOP', label: 'Upcoming Workshops' },
              { id: 'ACTIVITY', label: 'Past Activities' },
              { id: 'INSTAGRAM', label: 'Instagram Posts' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  selectedType === t.id
                    ? 'bg-white text-slate-800 shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium shrink-0">
            {['ALL', 'UPCOMING', 'COMPLETED', 'DRAFT'].map(s => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  selectedStatus === s
                    ? 'bg-white text-slate-800 shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {s === 'ALL' ? 'All Status' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items List */}
      {loading ? (
        <div className="py-20 flex justify-center text-teal-600">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 text-slate-500">
          <Sparkles className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-semibold text-slate-700">No items match your criteria</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting the filters or create a new item.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
            >
              {/* Cover Thumbnail / Media Preview */}
              <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                {item.coverImageUrl ? (
                  <img
                    src={item.coverImageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {(() => {
                    const isPast = Boolean(
                      item.eventDate &&
                      !isNaN(new Date(item.eventDate).getTime()) &&
                      new Date(item.eventDate) < new Date(new Date().setHours(0, 0, 0, 0))
                    );
                    const isAutoArchived = item.type === 'WORKSHOP' && item.status === 'UPCOMING' && isPast;

                    return (
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm ${
                          item.type === 'INSTAGRAM'
                            ? 'bg-pink-600/90 text-white'
                            : isAutoArchived
                            ? 'bg-indigo-600/90 text-white'
                            : item.status === 'UPCOMING'
                            ? 'bg-emerald-600/90 text-white'
                            : item.status === 'COMPLETED'
                            ? 'bg-blue-600/90 text-white'
                            : 'bg-amber-600/90 text-white'
                        }`}
                      >
                        {item.type === 'INSTAGRAM'
                          ? 'Instagram'
                          : isAutoArchived
                          ? 'Past (Auto-Expired)'
                          : item.status}
                      </span>
                    );
                  })()}

                  {item.category && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-900/70 text-white backdrop-blur-md">
                      {item.category}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => toggleFeatured(item)}
                    className={`p-1.5 rounded-full backdrop-blur-md shadow-sm transition-colors ${
                      item.isFeatured
                        ? 'bg-amber-400 text-amber-900'
                        : 'bg-slate-900/60 text-white hover:text-amber-300'
                    }`}
                    title={item.isFeatured ? 'Featured on Homepage' : 'Mark as Featured'}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    onClick={() => togglePublished(item)}
                    className={`p-1.5 rounded-full backdrop-blur-md shadow-sm transition-colors ${
                      item.isPublished
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-900/60 text-slate-300 hover:text-white'
                    }`}
                    title={item.isPublished ? 'Published (Click to hide)' : 'Draft (Click to publish)'}
                  >
                    {item.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{item.title}</h3>
                  {item.summary && (
                    <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  {item.eventDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{item.eventDate} {item.eventTime ? `• ${item.eventTime}` : ''}</span>
                    </div>
                  )}

                  {item.location && item.type !== 'INSTAGRAM' && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}

                  {item.type === 'INSTAGRAM' && item.instagramUrl && (
                    <div className="flex items-center gap-2 text-pink-600 truncate">
                      <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
                      <a href={item.instagramUrl} target="_blank" rel="noreferrer" className="hover:underline truncate">
                        {item.instagramUrl}
                      </a>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      title="Edit Item"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.type !== 'INSTAGRAM' && (
                    <a
                      href={`https://the-kidpreneur-journey.com/portfolio/${item.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                    >
                      View Live <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center font-bold">
                  {editingItem ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {editingItem ? 'Edit Portfolio Item' : 'New Portfolio Item'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Configure details, media, and presentation settings.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Item Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {[
                    { type: 'WORKSHOP', label: 'Upcoming Workshop', icon: Calendar },
                    { type: 'ACTIVITY', label: 'Past Activity Story', icon: CheckCircle2 },
                    { type: 'INSTAGRAM', label: 'Instagram Reel / Post', icon: InstagramIcon },
                  ].map(tab => {
                    const Icon = tab.icon;
                    const isSelected = formData.type === tab.type;
                    return (
                      <button
                        type="button"
                        key={tab.type}
                        onClick={() =>
                          setFormData(prev => ({
                            ...prev,
                            type: tab.type as any,
                            status: tab.type === 'WORKSHOP' ? 'UPCOMING' : 'COMPLETED',
                          }))
                        }
                        className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50/60 text-teal-900 font-bold shadow-sm ring-2 ring-teal-200'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-teal-600' : 'text-slate-400'}`} />
                        <span className="text-xs">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Title / Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={e => handleTitleChange(e.target.value)}
                    placeholder="e.g. Spring Robotics & AI Bootcamp"
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Web Slug (URL path)
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="spring-robotics-and-ai-bootcamp"
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-mono text-slate-600 outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Instagram URL (Only if INSTAGRAM) */}
              {formData.type === 'INSTAGRAM' && (
                <div className="p-4 bg-pink-50/60 rounded-2xl border border-pink-200/60 space-y-3">
                  <div className="flex items-center gap-2 text-pink-700 font-bold text-sm">
                    <InstagramIcon className="w-5 h-5" />
                    Instagram Link & Settings
                  </div>
                  <input
                    type="url"
                    required
                    value={formData.instagramUrl || ''}
                    onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })}
                    placeholder="https://www.instagram.com/p/DB_xyz... or /reel/..."
                    className="w-full border border-pink-200 rounded-xl p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <p className="text-xs text-pink-600">
                    Paste the direct Instagram post or reel URL. In hybrid mode, visitors see a fast Kidpreneur card and can open the live post popup or view it on Instagram!
                  </p>
                </div>
              )}

              {/* Category, Status, Dates */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Robotics, AI, Pitch Day"
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status || 'UPCOMING'}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="UPCOMING">Upcoming</option>
                    <option value="COMPLETED">Completed / Past</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Event Date</label>
                    <span className="text-[10px] text-teal-600 font-semibold bg-teal-50 px-2 py-0.5 rounded-full">Auto-Archives to Past</span>
                  </div>
                  <input
                    type="date"
                    value={formData.eventDate || ''}
                    onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    When this date passes, the platform automatically moves it to Past Activities.
                  </p>
                </div>
              </div>

              {/* Time & Location (for Workshops/Activities) */}
              {formData.type !== 'INSTAGRAM' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Event Time</label>
                    <input
                      type="text"
                      value={formData.eventTime || ''}
                      onChange={e => setFormData({ ...formData, eventTime: e.target.value })}
                      placeholder="e.g. 10:00 AM - 1:30 PM"
                      className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Beirut, Lebanon & Online"
                      className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              )}

              {/* Summary / Teaser */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Summary / Short Teaser
                </label>
                <textarea
                  rows={2}
                  value={formData.summary || ''}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="A concise 1-2 sentence hook displayed on the portfolio card..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Detailed Content / Markdown (for Workshops/Activities) */}
              {formData.type !== 'INSTAGRAM' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Description / Event Agenda (Supports Markdown)
                  </label>
                  <textarea
                    rows={6}
                    value={formData.content || ''}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write detailed workshop highlights, what kids will learn, requirements, schedule..."
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm font-sans outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}

              {/* Cover Image */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Cover Image (R2 / CDN)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.coverImageUrl || ''}
                    onChange={e => setFormData({ ...formData, coverImageUrl: e.target.value })}
                    placeholder="Paste image URL or pick from Media Library"
                    className="flex-1 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget('cover')}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors shrink-0"
                  >
                    <ImageIcon className="w-4 h-4 text-teal-600" />
                    Browse Media
                  </button>
                </div>

                {formData.coverImageUrl && (
                  <div className="relative w-36 h-24 rounded-xl overflow-hidden border border-slate-200 mt-2">
                    <img
                      src={formData.coverImageUrl}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImageUrl: '' })}
                      className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Gallery Images (for Workshops / Activities) */}
              {formData.type !== 'INSTAGRAM' && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Event Photo Gallery (Multi-photo slider)
                      </label>
                      <p className="text-[11px] text-slate-500">
                        Photos added here will appear in the full-screen lightbox on the website.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMediaPickerTarget('gallery')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Photo to Gallery
                    </button>
                  </div>

                  {formData.galleryImages && formData.galleryImages.length > 0 ? (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {formData.galleryImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group"
                        >
                          <img
                            src={imgUrl}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setFormData(prev => ({
                                ...prev,
                                galleryImages: prev.galleryImages?.filter((_, i) => i !== idx),
                              }))
                            }
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove Photo"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No gallery photos attached yet.</p>
                  )}
                </div>
              )}

              {/* CTA Button Settings */}
              {formData.type !== 'INSTAGRAM' && (
                <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.ctaText || ''}
                      onChange={e => setFormData({ ...formData, ctaText: e.target.value })}
                      placeholder="e.g. Register for Workshop"
                      className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CTA Button Link (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.ctaUrl || ''}
                      onChange={e => setFormData({ ...formData, ctaUrl: e.target.value })}
                      placeholder="https://lab.the-kidpreneur-journey.com/register/lab"
                      className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              )}

              {/* Visibility and Featured toggles */}
              <div className="flex items-center gap-6 pt-3 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isPublished === 1}
                    onChange={e => setFormData({ ...formData, isPublished: e.target.checked ? 1 : 0 })}
                    className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                  />
                  <span>Published on public website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured === 1}
                    onChange={e => setFormData({ ...formData, isFeatured: e.target.checked ? 1 : 0 })}
                    className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>Feature on Homepage banner</span>
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingItem ? 'Save Changes' : 'Publish Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Picker Sub-modal */}
      {mediaPickerTarget && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-800 text-lg">
                Select Photo from Media Library
              </h3>
              <button
                onClick={() => setMediaPickerTarget(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <MediaLibrary
                selectionMode={true}
                onSelectImage={(url) => {
                  if (mediaPickerTarget === 'cover') {
                    setFormData(prev => ({ ...prev, coverImageUrl: url }));
                  } else if (mediaPickerTarget === 'gallery') {
                    setFormData(prev => ({
                      ...prev,
                      galleryImages: [...(prev.galleryImages || []), url],
                    }));
                  }
                  setMediaPickerTarget(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Instagram Activity Engine Modal */}
      {isEngineOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col p-6 shadow-2xl overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Instagram Activity Engine</h3>
                  <p className="text-xs text-slate-500">Auto-convert any Instagram post or reel into a website activity</p>
                </div>
              </div>
              <button
                onClick={() => setIsEngineOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto py-5 space-y-6">
              {/* URL Input Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Paste Instagram Post or Reel URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/p/... or /reel/..."
                    value={engineUrl}
                    onChange={e => setEngineUrl(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={handleEngineFetch}
                    disabled={engineLoading || !engineUrl.trim()}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                  >
                    {engineLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch Post'}
                  </button>
                </div>
                {engineError && (
                  <p className="text-xs text-red-500 font-medium mt-2">{engineError}</p>
                )}
              </div>

              {/* Parsed Post Preview & Activity Type Selector */}
              {engineData && (
                <div className="space-y-6 border-t border-slate-100 pt-6 animate-fadeIn">
                  {/* Select Activity Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Choose Target Activity Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Upcoming Workshop */}
                      <button
                        type="button"
                        onClick={() => {
                          setEngineType('WORKSHOP');
                          setEngineStatus('UPCOMING');
                          if (!engineEventDate) setEngineEventDate('Upcoming Cohort 2026');
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          engineType === 'WORKSHOP'
                            ? 'border-teal-500 bg-teal-50/50 ring-2 ring-teal-500/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xl block mb-1">🚀</span>
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Upcoming Workshop</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Registration open for young learners</p>
                      </button>

                      {/* Past Activities */}
                      <button
                        type="button"
                        onClick={() => {
                          setEngineType('ACTIVITY');
                          setEngineStatus('COMPLETED');
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          engineType === 'ACTIVITY'
                            ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xl block mb-1">🏆</span>
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Past Activities</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Showcase past cohort & market milestone</p>
                      </button>

                      {/* Instagram Posts */}
                      <button
                        type="button"
                        onClick={() => {
                          setEngineType('INSTAGRAM');
                          setEngineStatus('COMPLETED');
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          engineType === 'INSTAGRAM'
                            ? 'border-pink-500 bg-pink-50/50 ring-2 ring-pink-500/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xl block mb-1">📸</span>
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Instagram Posts</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Reels, F.A.I.L. lessons & classroom clips</p>
                      </button>
                    </div>
                  </div>

                  {/* Post Preview Card */}
                  <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 items-start">
                    <img
                      src={engineCoverUrl}
                      alt="Thumbnail"
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                          {engineData.author || '@kidpreneur.journey'}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">Auto-detected: <strong>{engineData.suggestedType}</strong></span>
                      </div>
                      <p className="text-xs text-slate-700 line-clamp-2 italic">"{engineData.summary}"</p>
                    </div>
                  </div>

                  {/* Form Adjustments */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Activity Title</label>
                      <input
                        type="text"
                        value={engineTitle}
                        onChange={e => setEngineTitle(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Event Date / Cohort</label>
                        <input
                          type="text"
                          value={engineEventDate}
                          onChange={e => setEngineEventDate(e.target.value)}
                          placeholder="e.g. May 15, 2026 or Spring 2026"
                          className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={engineLocation}
                          onChange={e => setEngineLocation(e.target.value)}
                          className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Summary Teaser</label>
                      <textarea
                        rows={3}
                        value={engineSummary}
                        onChange={e => setEngineSummary(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEngineOpen(false)}
                className="px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-medium"
              >
                Close
              </button>
              {engineData && (
                <button
                  type="button"
                  onClick={handleEnginePublish}
                  disabled={enginePublishing}
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all text-sm"
                >
                  {enginePublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>Publish Activity to Website</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

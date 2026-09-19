'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, Loader2, Trash2 } from 'lucide-react';
import { updateSession, deleteSession } from '@/app/admin/actions';
import type { CourseSession } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ActivityFormBuilder } from './ActivityFormBuilder';

export const SessionEditor = ({ session }: { session: CourseSession }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: session.title,
    description: session.description,
    objective: session.objective,
    activityPayload: session.activityPayload,
  });
  const [isSaving, setIsSaving] = useState(false);

  const isChanged = 
    formData.title !== session.title ||
    formData.description !== session.description ||
    formData.objective !== session.objective ||
    formData.activityPayload !== session.activityPayload;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChanged) return;
    
    setIsSaving(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('objective', formData.objective);
      data.append('activityPayload', formData.activityPayload);
      
      await updateSession(session.id, data);
                  router.push('/admin/sessions');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/admin/sessions')}
            className="p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Go Back</span>
          </button>
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          <span className="text-2xl bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-sm">{session.icon}</span>
          <h2 className="text-xl font-bold text-slate-800">
            Edit Session {session.sessionNumber}
          </h2>
        </div>
      </div>
      
      <form onSubmit={handleSave} className="flex flex-col">
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              className="w-full border-slate-200 rounded-xl p-3.5 border focus:ring-2 focus:ring-blue-500 outline-none text-sm shadow-sm" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              className="w-full border-slate-200 rounded-xl p-3.5 border focus:ring-2 focus:ring-blue-500 outline-none text-sm shadow-sm" 
              rows={3} 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Objective</label>
            <textarea 
              name="objective" 
              value={formData.objective} 
              onChange={handleChange}
              className="w-full border-slate-200 rounded-xl p-3.5 border focus:ring-2 focus:ring-blue-500 outline-none text-sm shadow-sm" 
              rows={2} 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Activity Config (Visual Builder)</label>
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 shadow-sm">
              <ActivityFormBuilder 
                initialPayload={formData.activityPayload}
                onChange={(val) => setFormData(prev => ({ ...prev, activityPayload: val }))}
              />
            </div>
            <p className="text-xs text-slate-500 mt-3 px-1">
              Defines the interactive widget for this session. Type: <span className="font-semibold">{session.activityType}</span>
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center gap-3">
          <button 
            type="button"
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
                setIsSaving(true);
                try {
                  await deleteSession(session.id);
                  router.push('/admin/sessions');
                } catch (err) {
                  console.error(err);
                  setIsSaving(false);
                }
              }
            }}
            className="px-4 py-2.5 text-red-600 hover:bg-red-100 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
            disabled={isSaving}
          >
            <Trash2 className="w-4 h-4" />
            Delete Session
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => router.push('/admin/sessions')}
              className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={!isChanged || isSaving}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-xl font-medium text-white transition-all
                ${!isChanged 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                }
              `}
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

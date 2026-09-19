'use client';

import React, { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { updateSession } from '@/app/admin/actions';
import type { CourseSession } from '@prisma/client';
import { ActivityFormBuilder } from './ActivityFormBuilder';

export const SessionModal = ({ session, onClose }: { session: CourseSession, onClose: () => void }) => {
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
      onClose(); // Close modal on success
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{session.icon}</span>
            <h2 className="text-xl font-bold text-slate-800">
              Edit Session {session.sessionNumber}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSave} className="flex flex-col overflow-hidden">
          <div className="p-6 overflow-y-auto space-y-5 flex-1">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                className="w-full border-slate-200 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                className="w-full border-slate-200 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                rows={2} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Objective</label>
              <textarea 
                name="objective" 
                value={formData.objective} 
                onChange={handleChange}
                className="w-full border-slate-200 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                rows={2} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Activity Config (Visual Builder)</label>
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
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

          <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center gap-3 shrink-0">
            <button 
              type="button"
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
                  setIsSaving(true);
                  try {
                    const { deleteSession } = await import('@/app/admin/actions');
                    await deleteSession(session.id);
                    onClose();
                  } catch (err) {
                    console.error(err);
                    setIsSaving(false);
                  }
                }
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
              disabled={isSaving}
            >
              Delete Session
            </button>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={!isChanged || isSaving}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-white transition-all
                  ${!isChanged 
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }
                `}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

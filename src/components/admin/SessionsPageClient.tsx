'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import type { courseSessions } from '@/db/schema';
type CourseSession = typeof courseSessions.$inferSelect;
import { Settings, RefreshCw, Plus } from 'lucide-react';
import { SessionsView } from './SessionsView';
import { SessionEditor } from './SessionEditor';
import { createSession, publishInitialSessions } from '@/app/admin/actions';

export const SessionsPageClient = ({ sessions }: { sessions: CourseSession[] }) => {
  const searchParams = useSearchParams();
  const editParam = searchParams.get('edit');

  if (editParam) {
    const sessionToEdit = sessions.find(s => s.id === editParam);
    if (sessionToEdit) {
      return (
        <div className="w-full">
          <SessionEditor session={sessionToEdit} />
        </div>
      );
    }
  }

  return (
    <div className="w-full">
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <Settings className="text-blue-600 w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Course Sessions CMS</h1>
            <p className="text-slate-500 text-sm">Manage dynamic course sessions directly in the database.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <form action={publishInitialSessions}>
            <button type="submit" className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
              <RefreshCw className="w-4 h-4" />
              Reset & Seed Data
            </button>
          </form>
          <form action={createSession}>
            <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow-md">
              <Plus className="w-4 h-4" />
              New Session
            </button>
          </form>
        </div>
      </header>

      <SessionsView sessions={sessions} />
      
      {sessions.length === 0 && (
        <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-500 mt-6">
          No sessions found in database. Click "Reset & Seed Data" to populate.
        </div>
      )}
    </div>
  );
};

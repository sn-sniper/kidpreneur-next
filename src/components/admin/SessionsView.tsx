'use client';

import React, { useState } from 'react';
import type { courseSessions } from '@/db/schema';
type CourseSession = typeof courseSessions.$inferSelect;
import { SessionsGrid } from './SessionsGrid';
import { SessionsTable } from './SessionsTable';
import { LayoutGrid, List } from 'lucide-react';

export const SessionsView = ({ sessions }: { sessions: CourseSession[] }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Course Sessions ({sessions.length})
        </h2>
        
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`flex items-center justify-center p-2 rounded-lg transition-all ${
              viewMode === 'table' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center justify-center p-2 rounded-lg transition-all ${
              viewMode === 'grid' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <SessionsGrid sessions={sessions} />
      ) : (
        <SessionsTable sessions={sessions} />
      )}
    </div>
  );
};

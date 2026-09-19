'use client';

import React from 'react';
import type { CourseSession } from '@prisma/client';
import { useRouter } from 'next/navigation';

export const SessionsGrid = ({ sessions }: { sessions: CourseSession[] }) => {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => router.push(`?edit=${session.id}`)}
            className="bg-white aspect-square rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center justify-center p-6 gap-4 group"
          >
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-3xl group-hover:bg-blue-50 transition-colors">
              {session.icon}
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-blue-600 mb-1 tracking-wider uppercase">
                Session {session.sessionNumber}
              </div>
              <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight">
                {session.title}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

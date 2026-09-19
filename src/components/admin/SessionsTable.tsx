'use client';

import React from 'react';
import type { CourseSession } from '@prisma/client';
import { useRouter } from 'next/navigation';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit2 } from 'lucide-react';

export const SessionsTable = ({ sessions }: { sessions: CourseSession[] }) => {
  const router = useRouter();

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative w-full max-h-[calc(100vh-220px)] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <table className="w-full caption-bottom text-sm">
            <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <TableRow className="border-slate-100 border-b">
                <TableHead className="w-16 text-center bg-slate-50">Icon</TableHead>
                <TableHead className="w-24 bg-slate-50">Session</TableHead>
                <TableHead className="w-1/4 bg-slate-50">Title</TableHead>
                <TableHead className="bg-slate-50">Objective</TableHead>
                <TableHead className="w-24 text-right bg-slate-50">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow 
                  key={session.id} 
                  className="hover:bg-slate-50/50 cursor-pointer border-b border-slate-100"
                  onClick={() => router.push(`?edit=${session.id}`)}
                >
                  <TableCell className="text-center text-2xl">
                    {session.icon}
                  </TableCell>
                  <TableCell className="font-medium text-slate-500">
                    #{session.sessionNumber}
                  </TableCell>
                  <TableCell className="font-bold text-slate-800">
                    {session.title}
                  </TableCell>
                  <TableCell className="text-slate-600 truncate max-w-xs">
                    {session.objective}
                  </TableCell>
                  <TableCell className="text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`?edit=${session.id}`);
                      }}
                      className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {sessions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                    No sessions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </table>
        </div>
      </div>
    </>
  );
};

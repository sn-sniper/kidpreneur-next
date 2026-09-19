'use client';

import Link from 'next/link';
import { LayoutDashboard, BookOpen, Layers, LogOut, User as UserIcon, MessageSquare } from 'lucide-react';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AdminSidebarProps {
  activities: { name: string; href: string }[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activities }) => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen overflow-y-auto shrink-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-blue-500" />
          Admin
        </h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard Home
        </Link>
        <Link href="/admin/sessions" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <BookOpen className="w-5 h-5" />
          Course Sessions
        </Link>
        <Link href="/admin/portfolio" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Layers className="w-5 h-5" />
          Frontend Activities
        </Link>
        
        <div className="px-2">
          <Accordion className="w-full">
            <AccordionItem value="learners" className="border-b-0">
              <AccordionTrigger className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-base font-normal hover:no-underline data-[state=open]:text-white">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-5 h-5" />
                  Learner Submissions
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pl-10 pr-2 space-y-1">
                {activities.map(act => {
                  // Format link to lowercase, replace spaces with hyphens if needed
                  // e.g., "The Kidpreneur Lab" -> "the-kidpreneur-lab"
                  // But the spec says /admin/learners/lab, so we can do a simple slug mapping
                  const slug = act.name.toLowerCase().includes('lab') ? 'lab' : act.name.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <Link 
                      key={act.name}
                      href={`/admin/learners/${slug}`} 
                      className="block px-4 py-2 text-sm rounded-md hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      {act.name}
                    </Link>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <MessageSquare className="w-5 h-5" />
          Contact Messages
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/admin/login';
          }}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-slate-800 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

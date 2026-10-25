'use client';

import Link from 'next/link';
import { LayoutDashboard, BookOpen, Layers, LogOut, User as UserIcon, MessageSquare, Sparkles, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
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
      <div className="p-6 border-b border-slate-800/80">
        <Link href="/admin" className="flex items-center gap-3 group">
          <img
            src="/logo.jpg"
            alt="The Kidpreneur Journey"
            className="w-11 h-11 rounded-xl object-contain bg-amber-400 p-0.5 shadow-md ring-1 ring-amber-300/40 group-hover:scale-105 transition-transform"
          />
          <div>
            <h2 className="text-base font-bold text-white tracking-tight leading-tight">Admin Portal</h2>
            <p className="text-[11px] text-teal-400 font-medium">Kidpreneur Journey</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 mt-2">
        <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard Home
        </Link>

        <Link href="/admin/portfolio" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors text-teal-300 font-medium">
          <Sparkles className="w-5 h-5 text-teal-400" />
          Portfolio & Events
        </Link>

        <Link href="/admin/media" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
          <ImageIcon className="w-5 h-5 text-indigo-400" />
          Media Gallery (R2)
        </Link>

        <Link href="/admin/sessions" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
          <BookOpen className="w-5 h-5 text-amber-400" />
          Course Sessions
        </Link>

        <Link href="/admin/navbar-links" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
          <LinkIcon className="w-5 h-5 text-sky-400" />
          Navbar Links
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

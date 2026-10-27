'use client';

import Link from 'next/link';
import { LayoutDashboard, BookOpen, Layers, LogOut, User as UserIcon, MessageSquare, Sparkles, Image as ImageIcon, Link as LinkIcon, X } from 'lucide-react';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AdminSidebarProps {
  activities: { name: string; href: string }[];
  onNavigate?: () => void;
  isMobile?: boolean;
  onClose?: () => void;
  className?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activities, 
  onNavigate, 
  isMobile = false,
  onClose,
  className = '' 
}) => {
  const handleLinkClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside className={`w-64 bg-slate-900 text-slate-300 flex flex-col h-full overflow-y-auto shrink-0 select-none ${className}`}>
      {/* Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link href="/admin" onClick={handleLinkClick} className="flex items-center gap-3 group">
          <img
            src="/logo.jpg"
            alt="The Kidpreneur Journey"
            className="w-10 h-10 rounded-xl object-contain bg-amber-400 p-0.5 shadow-md ring-1 ring-amber-300/40 group-hover:scale-105 transition-transform"
          />
          <div>
            <h2 className="text-base font-bold text-white tracking-tight leading-tight">Admin Portal</h2>
            <p className="text-[11px] text-teal-400 font-medium">Kidpreneur Journey</p>
          </div>
        </Link>

        {isMobile && onClose && (
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 mt-3">
        <Link 
          href="/admin" 
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LayoutDashboard className="w-4 h-4 text-slate-400" />
          Dashboard Home
        </Link>

        <Link 
          href="/admin/portfolio" 
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm hover:bg-slate-800 hover:text-white transition-colors text-teal-300 font-medium"
        >
          <Sparkles className="w-4 h-4 text-teal-400" />
          Portfolio & Events
        </Link>

        <Link 
          href="/admin/media" 
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ImageIcon className="w-4 h-4 text-indigo-400" />
          Media Gallery (R2)
        </Link>

        <Link 
          href="/admin/sessions" 
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          Course Sessions
        </Link>

        <Link 
          href="/admin/navbar-links" 
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LinkIcon className="w-4 h-4 text-sky-400" />
          Navbar Links
        </Link>
        
        <div className="px-1.5">
          <Accordion className="w-full">
            <AccordionItem value="learners" className="border-b-0">
              <AccordionTrigger className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium hover:no-underline data-[state=open]:text-white">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-4 h-4 text-emerald-400" />
                  Learner Submissions
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pl-9 pr-2 space-y-1">
                {activities.map(act => {
                  const slug = act.name.toLowerCase().includes('lab') ? 'lab' : act.name.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <Link 
                      key={act.name}
                      href={`/admin/learners/${slug}`} 
                      onClick={handleLinkClick}
                      className="block px-3 py-1.5 text-xs rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      {act.name}
                    </Link>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Link 
          href="/admin/messages" 
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-rose-400" />
          Contact Messages
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-slate-800">
        <button 
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/admin/login';
          }}
          className="flex w-full items-center gap-3 px-3.5 py-2.5 text-sm rounded-xl text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

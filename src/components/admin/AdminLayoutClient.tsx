'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import Link from 'next/link';

interface AdminLayoutClientProps {
  activities: { name: string; href: string }[];
  children: React.ReactNode;
}

export const AdminLayoutClient: React.FC<AdminLayoutClientProps> = ({ activities, children }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);

  return (
    <div className="flex h-[100dvh] w-full bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Sidebar (hidden on mobile, visible from md up) */}
      <div className="hidden md:flex shrink-0 h-full">
        <AdminSidebar activities={activities} />
      </div>

      {/* Mobile Drawer Backdrop & Panel */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fadeIn"
            aria-hidden="true"
          />

          {/* Drawer Slide-in Panel */}
          <div className="relative z-50 w-72 max-w-[85vw] h-full shadow-2xl flex flex-col animate-slideInLeft">
            <AdminSidebar 
              activities={activities} 
              onNavigate={() => setMobileDrawerOpen(false)} 
              onClose={() => setMobileDrawerOpen(false)}
              isMobile 
              className="w-full h-full shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 h-[100dvh] overflow-hidden">
        {/* Mobile Top Navbar (Visible only on < md) */}
        <header className="md:hidden shrink-0 flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-white z-20 shadow-sm">
          <Link href="/admin" className="flex items-center gap-2.5">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="w-8 h-8 rounded-lg object-contain bg-amber-400 p-0.5 shadow-sm"
            />
            <div>
              <span className="block text-sm font-bold leading-tight">Admin Portal</span>
              <span className="block text-[10px] text-teal-400 font-medium">Kidpreneur Journey</span>
            </div>
          </Link>

          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Open admin navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden min-w-0 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

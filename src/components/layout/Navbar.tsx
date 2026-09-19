import React, { useState } from 'react';
import { Lightbulb, Menu, X } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { useAuth } from '../../context/AuthContext';
import { ViewName } from '../../types';
import { useRouter } from 'next/navigation';

interface NavItem {
  id: ViewName;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'journey', label: 'My Journey' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'portfolio', label: 'My Portfolio' },
  { id: 'resources', label: 'Resources' },
  { id: 'live', label: 'Live Class' },
  { id: 'parents', label: 'Parent Corner' },
  { id: 'help', label: 'Help' },
];

export const Navbar: React.FC = () => {
  const { activeView, setActiveView } = useJourney();
  const { user, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const isAuthenticated = !!user;

  const handleNavClick = (view: ViewName) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6" aria-label="Main navigation">
        <button
          type="button"
          className="flex items-center gap-2.5 text-left group"
          onClick={() => handleNavClick('home')}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-sun text-ink group-hover:scale-105 transition-transform">
            <Lightbulb className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <strong className="block text-sm font-bold text-ink">The Kidpreneur</strong>
            <span className="text-xs text-slate-500 font-medium">Lab</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-4 text-sm font-semibold lg:flex">
          {NAV_ITEMS.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`cursor-pointer transition-colors py-1 px-2 rounded-lg ${
                  isActive
                    ? 'text-coral font-bold bg-rose-50'
                    : 'text-ink hover:text-coral hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <div className="h-6 w-px bg-slate-200 mx-1 hidden lg:block"></div>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-600">
                Hi, {user.fullName.split(' ')[0]}
              </span>
              <button
                type="button"
                className="cursor-pointer bg-slate-100 text-ink hover:bg-slate-200 px-4 py-1.5 rounded-lg font-bold transition-all duration-200"
                onClick={logout}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="cursor-pointer bg-navy text-white hover:bg-ink px-4 py-1.5 rounded-lg font-bold transition-all duration-200 shadow-sm hover:shadow-md"
              onClick={() => {
                // For now, redirect to /login
                router.push('/login');
              }}
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="rounded-xl border border-slate-200 p-2 text-ink lg:hidden hover:bg-slate-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`cursor-pointer rounded-xl p-3 text-left transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-cream text-coral font-bold'
                    : 'text-ink bg-slate-50 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-slate-600 text-center">
                  Logged in as {user.fullName}
                </span>
                <button
                  type="button"
                  className="cursor-pointer w-full rounded-xl p-3 text-center bg-slate-100 text-ink font-bold hover:bg-slate-200 transition-all duration-200"
                  onClick={logout}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="cursor-pointer w-full rounded-xl p-3 text-center bg-navy text-white font-bold hover:bg-ink transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => {
                  router.push('/login');
                }}
              >
                Log In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

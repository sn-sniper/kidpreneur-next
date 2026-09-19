import React from 'react';
import { Lightbulb, Heart, ShieldCheck } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useJourney();

  return (
    <footer className="border-t border-slate-200 bg-white py-12 mt-16 text-slate-600 text-sm">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-8 md:grid-cols-3 items-center">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-sun text-ink">
            <Lightbulb className="h-5 w-5" />
          </span>
          <div>
            <strong className="block text-ink font-bold">The Kidpreneur Journey</strong>
            <span className="text-xs text-slate-500">Inspiring Young Minds to Build Solutions</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 font-semibold text-ink">
          <button onClick={() => setActiveView('home')} className="hover:text-coral">Home</button>
          <button onClick={() => setActiveView('journey')} className="hover:text-coral">Dashboard</button>
          <button onClick={() => setActiveView('sessions')} className="hover:text-coral">Sessions</button>
          <button onClick={() => setActiveView('parents')} className="hover:text-coral">Parent Corner</button>
          <button onClick={() => setActiveView('help')} className="hover:text-coral">Help & Safety</button>
        </div>

        <div className="text-right md:text-right text-xs text-slate-500 space-y-1">
          <p className="flex items-center justify-end gap-1 font-medium">
            <ShieldCheck className="h-4 w-4 text-mint" /> Safe & Friendly Learning Space
          </p>
          <p>© {new Date().getFullYear()} The Kidpreneur Journey. Made with <Heart className="inline h-3 w-3 text-coral fill-coral" /> for future leaders.</p>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Download, FileText, Video, Presentation, Users, Sparkles } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

export const ResourcesView: React.FC = () => {
  const { setActiveView, showToast } = useJourney();

  const downloadTextFile = (title: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast(`${title} download ready!`);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 space-y-8 animate-fadeIn">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Your Toolkit</p>
        <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-ink">
          Resources to Help You Shine
        </h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <button
          type="button"
          onClick={() =>
            downloadTextFile(
              'Kidpreneur Course Rules',
              'The Kidpreneur Journey Rules:\n1. Participate and share\n2. Respect other ideas\n3. Ask questions\n4. Try before saying "I cannot"\n5. Learn from mistakes\n6. Complete each challenge\n7. Have fun while creating'
            )
          }
          className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-sky hover:shadow-md group"
        >
          <span className="text-3xl">📌</span>
          <strong className="mt-4 block text-ink font-bold text-base group-hover:text-coral transition">
            Course Rules
          </strong>
          <span className="mt-1 block text-xs text-slate-500">
            A quick reminder of our journey promises.
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            downloadTextFile(
              'All Session Worksheets Template',
              'The Kidpreneur Journey - Worksheet Template\n\nSession Notes:\n\n1. My Strengths:\n2. Problems Spotting:\n3. Brainstorming Ideas:\n4. My Scorecard:\n5. Customer Profile:\n6. Solution Prototype:\n7. Project Name & Slogan:\n8. Price & Profit Calculator:\n9. My 1-Minute Pitch Starter:\n10. Journey Celebration:'
            )
          }
          className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-sky hover:shadow-md group"
        >
          <span className="text-3xl">📝</span>
          <strong className="mt-4 block text-ink font-bold text-base group-hover:text-coral transition">
            Worksheets
          </strong>
          <span className="mt-1 block text-xs text-slate-500">
            Use these for drawing, listing, and planning.
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            downloadTextFile(
              'Final Pitch Template',
              'Final Pitch Starter Template:\n\n"Hello, my name is [Your Name].\n\nThe problem I noticed is [Problem Description].\n\nMy solution is [Your Idea/Product Name].\n\nIt helps [Target Audience] by [Key Benefit].\n\nWhat makes my idea special is [Unique Feature].\n\nThank you!"'
            )
          }
          className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-sky hover:shadow-md group"
        >
          <span className="text-3xl">🎤</span>
          <strong className="mt-4 block text-ink font-bold text-base group-hover:text-coral transition">
            Final Pitch Template
          </strong>
          <span className="mt-1 block text-xs text-slate-500">
            Your guide for a confident presentation.
          </span>
        </button>

        <button
          type="button"
          onClick={() => showToast('Your facilitator can add the presentation link here.')}
          className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-sky hover:shadow-md group"
        >
          <span className="text-3xl">🖥️</span>
          <strong className="mt-4 block text-ink font-bold text-base group-hover:text-coral transition">
            Session Presentations
          </strong>
          <span className="mt-1 block text-xs text-slate-500">
            Slides from each live class.
          </span>
        </button>

        <button
          type="button"
          onClick={() => showToast('Your facilitator can add a recommended video link here.')}
          className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-sky hover:shadow-md group"
        >
          <span className="text-3xl">▶️</span>
          <strong className="mt-4 block text-ink font-bold text-base group-hover:text-coral transition">
            Recommended Videos
          </strong>
          <span className="mt-1 block text-xs text-slate-500">
            Watch, wonder, and get inspired.
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveView('parents')}
          className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-sky hover:shadow-md group"
        >
          <span className="text-3xl">👨‍👩‍👧</span>
          <strong className="mt-4 block text-ink font-bold text-base group-hover:text-coral transition">
            Parent Information
          </strong>
          <span className="mt-1 block text-xs text-slate-500">
            Helpful tips for grown-up supporters.
          </span>
        </button>
      </div>
    </div>
  );
};

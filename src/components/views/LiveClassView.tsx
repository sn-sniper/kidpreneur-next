import React from 'react';
import { Video, Calendar, Clock, BookOpen, ExternalLink } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

export const LiveClassView: React.FC = () => {
  const { showToast } = useJourney();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 animate-fadeIn">
      <div className="rounded-[2rem] bg-gradient-to-br from-cream via-amber-50 to-orange-50 p-8 sm:p-12 border border-amber-200 shadow-lg space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Live Online Learning</p>
          <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-ink">
            Join Your Facilitator Live
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-700 leading-relaxed">
            Every session is an interactive workshop where you share ideas, collaborate with peers, and get real-time feedback.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 pt-2">
          <div className="rounded-2xl bg-white/90 p-5 shadow-sm border border-slate-100">
            <strong className="block text-ink font-bold text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4 text-coral" /> Next Session
            </strong>
            <p className="mt-2 text-xs text-slate-600">Check schedule with your facilitator</p>
          </div>

          <div className="rounded-2xl bg-white/90 p-5 shadow-sm border border-slate-100">
            <strong className="block text-ink font-bold text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-coral" /> Duration
            </strong>
            <p className="mt-2 text-xs text-slate-600">Approximately 90 minutes</p>
          </div>

          <div className="rounded-2xl bg-white/90 p-5 shadow-sm border border-slate-100">
            <strong className="block text-ink font-bold text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-coral" /> Prepare
            </strong>
            <p className="mt-2 text-xs text-slate-600">Notebook, pencil, and curiosity!</p>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={() =>
              showToast('Meeting Link: Your facilitator will share the live Zoom/Teams link before class.')
            }
            className="rounded-2xl bg-coral px-8 py-4 font-bold text-white shadow-lg shadow-rose-200 hover:bg-rose-500 transition flex items-center gap-2 text-base"
          >
            <Video className="h-5 w-5" /> Join Live Classroom <ExternalLink className="h-4 w-4" />
          </button>
          <p className="mt-4 text-xs font-semibold text-slate-600">
            Please join 5 minutes early so you are ready to create.
          </p>
        </div>
      </div>
    </div>
  );
};

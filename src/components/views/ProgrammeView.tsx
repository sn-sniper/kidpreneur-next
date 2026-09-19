import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

const RULES = [
  '1. Participate and share',
  '2. Respect other ideas',
  '3. Ask questions',
  '4. Try before saying “I cannot”',
  '5. Learn from mistakes',
  '6. Complete each challenge',
  '7. Have fun while creating'
];

export const ProgrammeView: React.FC = () => {
  const { sessions } = useJourney();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 space-y-10 animate-fadeIn">
      <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <aside className="rounded-4xl bg-cream p-8 border border-amber-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-4xl">🧭</span>
            <h1 className="font-display text-3xl font-bold text-ink mt-4">
              The Kidpreneur Programme
            </h1>
            <p className="mt-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              Designed specifically for young minds, this {sessions.length}-step guided journey empowers kids to explore entrepreneurship with confidence and joy.
            </p>
          </div>

          <div className="mt-8 space-y-3 text-sm font-bold text-ink bg-white/80 p-5 rounded-2xl border border-amber-200/50">
            <p className="flex items-center gap-2">🕘 {sessions.length} live online sessions</p>
            <p className="flex items-center gap-2">⏱ About 90 minutes each</p>
            <p className="flex items-center gap-2">🎒 Learn, make, share, repeat</p>
          </div>
        </aside>

        <div className="space-y-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink">How Your Programme Works</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <strong className="text-ink font-bold text-base flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-mint" /> 1. Join Live
                </strong>
                <p className="mt-2 text-sm text-slate-600">Bring your ideas and join five minutes early.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <strong className="text-ink font-bold text-base flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-mint" /> 2. Try Challenges
                </strong>
                <p className="mt-2 text-sm text-slate-600">Complete activities during or after each session.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <strong className="text-ink font-bold text-base flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-mint" /> 3. Save Your Work
                </strong>
                <p className="mt-2 text-sm text-slate-600">Keep your worksheets, notes, and sketches organised.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <strong className="text-ink font-bold text-base flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-mint" /> 4. Keep Growing
                </strong>
                <p className="mt-2 text-sm text-slate-600">Effort, creativity, and questions matter most!</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold text-ink">Journey Rules</h2>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {RULES.map((rule, idx) => (
                <li
                  key={idx}
                  className={`rounded-xl bg-cream p-4 font-semibold text-ink border border-amber-100 text-sm ${
                    idx === RULES.length - 1 ? 'sm:col-span-2' : ''
                  }`}
                >
                  {rule}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

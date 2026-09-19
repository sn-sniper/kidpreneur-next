import React from 'react';
import { Sparkles, ArrowRight,  Rocket } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export const HomeView: React.FC = () => {
  const { setActiveView, openSessionWorkspace, unlockedSessions, sessions } = useJourney();
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cream border-b border-amber-100">
        <span className="hero-orb left-[4%] top-16 h-16 w-16 bg-mint"></span>
        <span className="hero-orb right-[8%] top-24 h-24 w-24 bg-sun" style={{ animationDelay: '1s' }}></span>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-20">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-sun/30 px-4 py-1.5 text-xs font-bold text-ink uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-coral" /> Interactive {sessions.length}-Session Adventure
            </span>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
              Turn Your Ideas into Extraordinary Solutions
            </h1>

            <p className="mt-4 text-xl font-bold text-coral">
              For curious minds ready to solve real-world problems.
            </p>

            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-700">
              Welcome to <strong>The Kidpreneur Journey</strong>! Discover your unique strengths, spot everyday problems, build creative prototypes, and present your pitch with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    setActiveView('sessions');
                  } else {
                    router.push('/login?redirect=sessions');
                  }
                }}
                className="rounded-2xl bg-coral px-7 py-4 font-bold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-1 hover:bg-rose-500 flex items-center gap-2 text-base"
              >
                Start My Journey <ArrowRight className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveView('programme')}
                className="rounded-2xl border-2 border-slate-300 bg-white px-7 py-4 font-bold text-ink shadow-sm transition hover:bg-slate-50 text-base"
              >
                How It Works
              </button>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Sparkles className="h-4 w-4 text-coral shrink-0" /> You do not need a business idea yet — we will discover it together!
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-sky/40"></div>
            <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-indigo-900 via-navy to-ink p-8 text-white shadow-2xl min-h-90 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="rounded-2xl bg-white/10 p-3 text-3xl">💡</span>
                <span className="rounded-full bg-mint/20 px-3 py-1 text-xs font-bold text-mint">
                  Kidpreneur Lab
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-sun">Small Steps. Bright Ideas.</h3>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                  Join thousands of young creators stepping up to change their world one session at a time.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-3 backdrop-blur border border-white/10 flex items-center gap-3">
                <Rocket className="h-6 w-6 text-sun" />
                <span className="text-xs font-semibold text-slate-200">
                  Interactive worksheets, financial tools, and pitch timers included!
                </span>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white p-4 shadow-xl border border-slate-100 flex items-center gap-2">
              <span className="text-3xl">🚀</span>
              <div>
                <strong className="block text-sm font-bold text-ink">Ideas begin here!</strong>
                <span className="text-xs text-slate-500">{sessions.length} structured sessions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Your Route Map</p>
            <h2 className="font-display mt-1 text-3xl font-bold text-ink">Explore the {sessions.length} Sessions</h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveView('sessions')}
            className="font-bold text-ink underline decoration-sun decoration-4 underline-offset-4 hover:text-coral transition"
          >
            See all sessions <ArrowRight className="inline h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {sessions.map(s => {
            const sessionNum = s.sessionNumber;
            const isUnlocked = unlockedSessions.includes(sessionNum);
            return (
              <button
                key={sessionNum}
                type="button"
                onClick={() => openSessionWorkspace(sessionNum)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                  isUnlocked
                    ? 'border-slate-200 bg-white hover:border-sun hover:shadow-md'
                    : 'border-slate-200 bg-slate-50 opacity-80'
                }`}
              >
                <span className="road-dot grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                  0{sessionNum}
                </span>
                <span className="text-sm font-bold text-ink line-clamp-2 leading-tight">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Closing Banner */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="rounded-4xl bg-linear-to-r from-navy to-ink p-8 text-center sm:p-12 text-white shadow-xl">
          <p className="font-display text-2xl sm:text-3xl font-bold max-w-3xl mx-auto leading-relaxed text-cream">
            “You don’t have to be great to start, but you have to start to be great.”
          </p>
        </div>
      </section>
    </div>
  );
};

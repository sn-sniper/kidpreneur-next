import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const PARENT_TIPS = [
  '💬 Ask questions rather than giving answers',
  '🌱 Encourage the child to try',
  '🧩 Allow mistakes and learning',
  '🎉 Celebrate effort and progress',
  '💻 Help only with technical support',
  '✨ Let the idea stay theirs'
];

export const ParentsView: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 space-y-9 animate-fadeIn">
      <div className="grid gap-8 lg:grid-cols-[1fr_.85fr] items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Parent Corner</p>
          <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-ink">
            Cheer Them On. Let Them Lead.
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
            The best support is warm encouragement. The ideas, choices, and voice should remain the child’s own work.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {PARENT_TIPS.map((tip, idx) => (
              <p
                key={idx}
                className="rounded-2xl bg-cream p-4 font-semibold text-ink text-sm border border-amber-100 shadow-sm"
              >
                {tip}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-gradient-to-br from-navy to-ink p-8 text-white shadow-xl border border-slate-800 space-y-6">
          <span className="text-4xl">👨‍👩‍👧</span>
          <h3 className="font-display text-2xl font-bold text-sun">Supporting Young Entrepreneurs</h3>
          <p className="text-sm text-slate-200 leading-relaxed">
            By stepping back and serving as a curious sounding board, you help build resilience, self-efficacy, and critical decision-making skills that last a lifetime.
          </p>
          <div className="rounded-xl bg-white/10 p-4 border border-white/10 text-xs text-slate-300">
            <strong className="block text-white font-bold mb-1">Parent Promise</strong>
            &quot;I promise to support with tech when needed, celebrate effort over perfection, and let my kidpreneur lead the way.&quot;
          </div>
        </div>

        <div className="lg:col-span-2 mt-4 rounded-3xl bg-slate-50 border border-slate-200 p-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 shrink-0 rounded-2xl bg-white p-3 shadow-sm border border-slate-100">
              <ShieldCheck className="h-6 w-6 text-mint" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-ink">A Safe Space to Grow</h2>
              <p className="mt-4 text-slate-700 leading-relaxed text-sm sm:text-base max-w-3xl">
                Kidpreneur is a carefully designed safe space. We prioritize your child&apos;s privacy and ensure a structured, ad-free environment where they can learn and create without distraction. All &quot;businesses&quot; created in the app are fictional and intended purely for educational purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

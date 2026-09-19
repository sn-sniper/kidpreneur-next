'use client';

import React, { useState } from 'react';
import { StrengthsSelector } from '@/components/activities/StrengthsSelector';
import { FinancialCalculator } from '@/components/activities/FinancialCalculator';
import { IdeaScorecard } from '@/components/activities/IdeaScorecard';
import { PitchTimer } from '@/components/activities/PitchTimer';
import { GenericActivity } from '@/components/activities/GenericActivity';
import { DynamicFormActivity } from '@/components/activities/DynamicFormActivity';
import { ArrowLeft, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

const ActivityWidgetMap: Record<string, React.FC<any>> = {
  strengths_selector: StrengthsSelector,
  financial_calculator: FinancialCalculator,
  idea_scorecard: IdeaScorecard,
  pitch_timer: PitchTimer,
  generic_activity: GenericActivity,
  dynamic_form: DynamicFormActivity,
};

export default function JourneyClient({ sessions }: { sessions: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSession = sessions[activeIndex];

  // Dynamic Component Selection
  const WidgetComponent = ActivityWidgetMap[activeSession.activityType] || GenericActivity;
  
  let widgetProps = {};
  try {
    widgetProps = JSON.parse(activeSession.activityPayload);
  } catch (e) {
    console.error("Failed to parse widget config JSON", e);
  }

  return (
    <div className="min-h-screen bg-[#fff9e9] pb-24">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b-2 border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ffc857] flex items-center justify-center font-bold text-xl shadow-inner text-white">
            K
          </div>
          <h1 className="font-display font-bold text-xl text-[#17324d] hidden sm:block">
            The Kidpreneur Journey
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* Progress Timeline */}
        <div className="mb-8 flex overflow-x-auto pb-4 gap-4 no-scrollbar">
          {sessions.map((session, idx) => (
            <button
              key={session.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex flex-col items-center min-w-[80px] p-3 rounded-2xl transition-all ${
                activeIndex === idx 
                  ? 'bg-white shadow-md border-2 border-[#12304a]' 
                  : 'bg-white/50 border-2 border-transparent hover:bg-white'
              }`}
            >
              <span className="text-2xl mb-1">{session.icon}</span>
              <span className="text-xs font-bold text-[#17324d]">S{session.sessionNumber}</span>
            </button>
          ))}
        </div>

        {/* Active Session Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-2 border-slate-100 page-fade-enter">
          <div className="inline-block px-4 py-1.5 bg-[#f1fffb] text-[#52c4aa] rounded-full text-sm font-bold mb-6 border border-[#52c4aa]/30">
            Session {activeSession.sessionNumber}
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#17324d] mb-4 leading-tight">
            {activeSession.title}
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {activeSession.description}
          </p>
          
          <div className="bg-[#fffdf2] rounded-2xl p-6 border-l-4 border-[#ffc857] mb-10">
            <h3 className="font-bold text-[#17324d] mb-2 flex items-center gap-2">
              <CheckCircle2 className="text-[#ffc857] w-5 h-5" />
              Your Objective
            </h3>
            <p className="text-[#17324d]/80">{activeSession.objective}</p>
          </div>

          {/* Dynamic Interactive Widget */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-[#17324d] mb-6">Interactive Activity</h3>
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200">
              <WidgetComponent {...widgetProps} activityId={activeSession.id} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button 
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(i => i - 1)}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-full font-bold shadow-sm disabled:opacity-50 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          
          <button 
            disabled={activeIndex === sessions.length - 1}
            onClick={() => setActiveIndex(i => i + 1)}
            className="flex items-center gap-2 px-6 py-3 bg-[#12304a] text-white rounded-full font-bold shadow-md disabled:opacity-50 hover:bg-[#17324d] transition-colors"
          >
            Next <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}

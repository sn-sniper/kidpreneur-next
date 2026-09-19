import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Download, Save, CheckCircle2 } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { StrengthsSelector } from '../activities/StrengthsSelector';
import { IdeaScorecard } from '../activities/IdeaScorecard';
import { FinancialCalculator } from '../activities/FinancialCalculator';
import { PitchTimer } from '../activities/PitchTimer';
import { GenericActivity } from '../activities/GenericActivity';
import { DynamicFormActivity } from '../activities/DynamicFormActivity';

export const WorkspaceView: React.FC = () => {
  const {
    currentSessionNum,
    records,
    setActiveView,
    openSessionWorkspace,
    saveSessionRecord,
    showToast,
    sessions
  } = useJourney();

  const activeDbSession = sessions.find(s => s.sessionNumber === currentSessionNum);
  const session = activeDbSession ? {
    n: activeDbSession.sessionNumber,
    title: activeDbSession.title,
    objective: activeDbSession.objective,
    desc: activeDbSession.description,
    icon: activeDbSession.icon,
    intro: activeDbSession.description,
    challenge: '',
    reflection: 'What did you learn from this activity?',
    action: 'Review your notes and get ready for the next session.'
  } : null;

  const record = records.find(r => Number(r.session_number) === currentSessionNum);

  const [notes, setNotes] = useState('');
  const [reflection, setReflection] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotes(record?.notes || '');
    setReflection(record?.reflection || '');
  }, [currentSessionNum, record]);

  const handleSave = async (completed: boolean) => {
    setIsSaving(true);
    await saveSessionRecord(completed, notes, reflection);
    setIsSaving(false);
  };

  const handleNextSession = () => {
    if (currentSessionNum < sessions.length) {
      openSessionWorkspace(currentSessionNum + 1);
    } else {
      setActiveView('portfolio');
    }
  };

  const renderActivityWidget = () => {
    if (!activeDbSession) return <GenericActivity />;
    
    // Parse dynamic payload if present
    let widgetProps = {};
    try {
      if (activeDbSession.activityPayload) {
        widgetProps = JSON.parse(activeDbSession.activityPayload);
      }
    } catch (e) {
      console.error("Failed to parse widget config", e);
    }

    switch (activeDbSession.activityType) {
      case 'strengths_selector':
        return <StrengthsSelector {...widgetProps} />;
      case 'financial_calculator':
        return <FinancialCalculator {...widgetProps} />;
      case 'idea_scorecard':
        return <IdeaScorecard {...widgetProps} />;
      case 'pitch_timer':
        return <PitchTimer onTimeEnd={() => showToast('Time! Take a breath — you did it!')} />;
      case 'dynamic_form':
        return <DynamicFormActivity {...widgetProps} activityId={activeDbSession.id} />;
      default:
        return <GenericActivity />;
    }
  };

  const isCompleted = record?.status === 'Completed';

  if (!session) return <div>Session not found</div>;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 space-y-7 animate-fadeIn">
      <button
        type="button"
        onClick={() => setActiveView('journey')}
        className="inline-flex items-center gap-2 font-bold text-ink hover:text-coral transition text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> Back to My Journey
      </button>

      {/* Session Banner */}
      <div className="rounded-4xl bg-cream p-7 sm:p-10 border border-amber-100 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <span className="rounded-full bg-ink px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider">
              SESSION {session.n} OF {sessions.length}
            </span>
            <h1 className="font-display mt-4 text-3xl sm:text-4xl font-bold text-ink">
              {session.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-700">
              {session.objective}
            </p>
          </div>
          <span className="text-6xl select-none" role="img" aria-label={session.title}>
            {session.icon}
          </span>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid gap-7 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          {/* Let's Discover */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-ink">Let’s Discover</h2>
            <p className="mt-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              {session.intro}
            </p>
            <div className="mt-5">{renderActivityWidget()}</div>
          </article>

          {/* My Challenge */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-ink">My Challenge</h2>
            <p className="mt-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              {session.challenge}
            </p>
            <label className="mt-5 block text-sm font-bold text-ink" htmlFor="session-notes">
              My ideas, answers, or working
            </label>
            <textarea
              id="session-notes"
              rows={5}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 p-4 text-ink placeholder-slate-400 focus:border-navy focus:ring-2 focus:ring-navy/10 text-sm leading-relaxed"
              placeholder="Write, list, or describe your ideas here..."
            ></textarea>
          </article>

          {/* My Reflection */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-ink">My Reflection</h2>
            <label className="mt-3 block text-slate-700 leading-relaxed text-sm sm:text-base" htmlFor="session-reflection">
              {session.reflection}
            </label>
            <textarea
              id="session-reflection"
              rows={4}
              value={reflection}
              onChange={e => setReflection(e.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-300 p-4 text-ink placeholder-slate-400 focus:border-navy focus:ring-2 focus:ring-navy/10 text-sm leading-relaxed"
              placeholder="Your honest thoughts are welcome here..."
            ></textarea>
          </article>
        </div>

        {/* Action Sidebar */}
        <aside className="space-y-5 sticky top-28 self-start">
          <div className="rounded-3xl bg-[#e7f7ff] p-6 border border-sky-100 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-ink">Before Next Session</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              {session.action}
            </p>
          </div>

          <div className="rounded-3xl bg-[#f1fffb] p-6 border border-mint/30 shadow-sm space-y-3">
            <h2 className="font-display text-2xl font-bold text-ink">Save My Journey</h2>
            <p className="text-xs text-slate-600">
              Your notes and reflections are saved securely to your workspace.
            </p>

            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSave(false)}
              className="w-full rounded-xl bg-mint px-4 py-3.5 font-bold text-navy shadow hover:bg-mint/90 transition flex items-center justify-center gap-2 text-sm"
            >
              <Save className="h-4 w-4" /> Save My Work
            </button>

            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSave(true)}
              className={`w-full rounded-xl px-4 py-3.5 font-bold text-white transition flex items-center justify-center gap-2 text-sm ${
                isCompleted ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-ink hover:bg-navy shadow'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" /> {isCompleted ? 'Completed ✓' : 'Mark as Completed'}
            </button>

            <button
              type="button"
              onClick={handleNextSession}
              className="w-full rounded-xl border-2 border-ink px-4 py-3 font-bold text-ink hover:bg-slate-100 transition flex items-center justify-center gap-2 text-sm mt-2"
            >
              {currentSessionNum < sessions.length ? 'Next Session' : 'Go to Portfolio'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

import prisma from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, User as UserIcon, Database } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function LearnerDetail({ params }: { params: { id: string } }) {
  // Fix for Next.js 16.3 params handling where params is a Promise
  const resolvedParams = await Promise.resolve(params);
  const learnerId = resolvedParams.id;

  const learner = await prisma.user.findUnique({
    where: { id: learnerId },
    include: {
      globalLearnerState: true,
      activityStates: true
    }
  });

  if (!learner) {
    notFound();
  }

  const globalData = learner.globalLearnerState?.data 
    ? JSON.parse(learner.globalLearnerState.data) 
    : null;

  return (
    <div className="max-w-4xl">
      <Link href="/admin/learners" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Learners
      </Link>

      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <UserIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{learner.fullName}</h1>
            <p className="text-slate-500 text-sm">{learner.email || 'No email associated'}</p>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Global State */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            Global State (Carry-Forward)
          </h2>
          {globalData ? (
            <pre className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 overflow-x-auto whitespace-pre-wrap font-mono border border-slate-200">
              {JSON.stringify(globalData, null, 2)}
            </pre>
          ) : (
            <p className="text-sm text-slate-500 italic">No global state recorded yet.</p>
          )}
        </div>

        {/* Activity States */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-teal-600" />
            Activity Submissions
          </h2>
          
          {learner.activityStates.length > 0 ? (
            <div className="space-y-4">
              {learner.activityStates.map((state) => {
                let parsed = {};
                try {
                  parsed = JSON.parse(state.data);
                } catch (e) {}

                return (
                  <div key={state.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                      <span className="font-semibold text-slate-700">{state.activityId}</span>
                      <span className="text-xs text-slate-400">{new Date(state.updatedAt).toLocaleString()}</span>
                    </div>
                    <pre className="p-4 text-xs text-slate-600 overflow-x-auto whitespace-pre-wrap font-mono">
                      {JSON.stringify(parsed, null, 2)}
                    </pre>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No activity submissions recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { LearnersTable } from '@/components/admin/LearnersTable';

export default async function LearnersPage({ params }: { params: { activity_slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.activity_slug || 'activity';

  // If slug is 'lab', fetch lab registrations
  // For this project scope, we just render the table for Lab.
  const isLab = slug === 'lab';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 capitalize">
          {slug.replace(/-/g, ' ')} Submissions
        </h1>
        <p className="text-slate-500 mt-2">Manage all learner registrations and confirmations.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        {isLab ? (
          <LearnersTable />
        ) : (
          <div className="p-12 text-center text-slate-500">
            No table configured for this activity yet.
          </div>
        )}
      </div>
    </div>
  );
}

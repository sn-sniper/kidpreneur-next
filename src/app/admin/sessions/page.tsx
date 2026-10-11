import { db } from '@/lib/db';
import { courseSessions } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { Suspense } from 'react';
import { SessionsPageClient } from '@/components/admin/SessionsPageClient';

export default async function AdminDashboard() {
  const sessions = await db.select().from(courseSessions).orderBy(asc(courseSessions.sessionNumber));

  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Loading sessions...</div>}>
      <SessionsPageClient sessions={sessions} />
    </Suspense>
  );
}

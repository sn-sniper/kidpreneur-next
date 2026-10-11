import App from '../../App';
import { db } from '@/lib/db';
import { courseSessions } from '@/db/schema';
import { asc } from 'drizzle-orm';

export default async function JourneyPage() {
  const sessions = await db.select().from(courseSessions).orderBy(asc(courseSessions.sessionNumber));
  
  return <App initialSessions={sessions} />;
}

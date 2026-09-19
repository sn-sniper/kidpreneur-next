import App from '../../App';
import prisma from '@/lib/db';

export default async function JourneyPage() {
  const sessions = await prisma.courseSession.findMany({
    orderBy: { sessionNumber: 'asc' }
  });
  
  return <App initialSessions={sessions} />;
}

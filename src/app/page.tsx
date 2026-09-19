import App from '../App';
import prisma from '@/lib/db';

export default async function Home() {
  const sessions = await prisma.courseSession.findMany({
    orderBy: { sessionNumber: 'asc' }
  });
  
  return <App initialSessions={sessions} />;
}

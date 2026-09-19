import prisma from '@/lib/db';
import Link from 'next/link';
import { User as UserIcon, Eye } from 'lucide-react';

export default async function LearnersAdmin() {
  const learners = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-4xl">
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <UserIcon className="text-indigo-600 w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Learner Submissions</h1>
            <p className="text-slate-500 text-sm">View student activity states and global carry-forward data.</p>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {learners.map((learner) => (
          <div key={learner.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800">{learner.fullName}</p>
              <p className="text-sm text-slate-500">{learner.email || 'No email'}</p>
            </div>
            
            <Link 
              href={`/admin/learners/profile/${learner.id}`}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
            >
              <Eye className="w-4 h-4" />
              View Submissions
            </Link>
          </div>
        ))}

        {learners.length === 0 && (
          <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-500">
            No learners found in the database.
          </div>
        )}
      </div>
    </div>
  );
}

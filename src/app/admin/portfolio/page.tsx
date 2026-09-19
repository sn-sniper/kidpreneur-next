import prisma from '@/lib/db';
import { createPortfolioActivity, updatePortfolioActivity, deletePortfolioActivity } from '../actions';
import { Layers, Plus, Save, Trash2 } from 'lucide-react';

export default async function PortfolioAdmin() {
  const activities = await prisma.portfolioActivity.findMany({
    orderBy: { orderIndex: 'asc' }
  });

  return (
    <div className="max-w-4xl">
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <Layers className="text-teal-600 w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Frontend Activities</h1>
            <p className="text-slate-500 text-sm">Manage the 'Our Activities' dropdown on the Kidpreneur Journey website.</p>
          </div>
        </div>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-teal-600" />
          Add New Activity Link
        </h2>
        <form action={createPortfolioActivity} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input name="name" required placeholder="e.g. Ideation Workshop" className="w-full border-slate-200 rounded-lg p-2 border focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">Link (href)</label>
            <input name="href" required placeholder="e.g. #ideation" className="w-full border-slate-200 rounded-lg p-2 border focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div className="w-24">
            <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
            <input name="orderIndex" type="number" defaultValue="0" className="w-full border-slate-200 rounded-lg p-2 border focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <button type="submit" className="bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors font-medium">
            Add
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex gap-4 items-start">
            <form action={updatePortfolioActivity.bind(null, activity.id)} className="flex-1 flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Name</label>
                <input name="name" defaultValue={activity.name} required className="w-full border-slate-200 rounded-md p-2 text-sm border focus:ring-1 focus:ring-teal-500 outline-none" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Link (href)</label>
                <input name="href" defaultValue={activity.href} required className="w-full border-slate-200 rounded-md p-2 text-sm border focus:ring-1 focus:ring-teal-500 outline-none" />
              </div>
              <div className="w-20">
                <label className="block text-xs text-slate-500 mb-1">Order</label>
                <input name="orderIndex" type="number" defaultValue={activity.orderIndex} className="w-full border-slate-200 rounded-md p-2 text-sm border focus:ring-1 focus:ring-teal-500 outline-none" />
              </div>
              <button type="submit" className="text-slate-500 hover:text-teal-600 p-2 rounded-md hover:bg-teal-50 transition-colors" title="Save Changes">
                <Save className="w-5 h-5" />
              </button>
            </form>
            
            <form action={deletePortfolioActivity.bind(null, activity.id)} className="pt-5">
              <button type="submit" className="text-slate-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors" title="Delete Activity">
                <Trash2 className="w-5 h-5" />
              </button>
            </form>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-500">
            No frontend activities found. Add one above.
          </div>
        )}
      </div>
    </div>
  );
}

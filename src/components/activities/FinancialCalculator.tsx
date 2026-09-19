import React, { useState } from 'react';

export const FinancialCalculator: React.FC = () => {
  const [cost, setCost] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [sales, setSales] = useState<number>(0);

  const revenue = (price * sales).toFixed(2);
  const profit = ((price - cost) * sales).toFixed(2);

  return (
    <div className="grid gap-4 rounded-2xl bg-cream p-5 border border-amber-100 sm:grid-cols-2">
      <label className="block text-sm font-bold text-ink">
        Estimated cost ($)
        <input
          type="number"
          min="0"
          step="0.01"
          value={cost}
          onChange={e => setCost(Math.max(0, parseFloat(e.target.value) || 0))}
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-2.5 font-normal text-ink shadow-sm focus:border-navy"
        />
      </label>

      <label className="block text-sm font-bold text-ink">
        Selling price ($)
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={e => setPrice(Math.max(0, parseFloat(e.target.value) || 0))}
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-2.5 font-normal text-ink shadow-sm focus:border-navy"
        />
      </label>

      <label className="block text-sm font-bold text-ink sm:col-span-2">
        Possible sales (units)
        <input
          type="number"
          min="0"
          step="1"
          value={sales}
          onChange={e => setSales(Math.max(0, parseInt(e.target.value, 10) || 0))}
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-2.5 font-normal text-ink shadow-sm focus:border-navy"
        />
      </label>

      <div className="rounded-xl bg-white p-4 sm:col-span-2 border border-slate-200 flex flex-wrap justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase text-slate-500 block">Expected Revenue</span>
          <strong className="text-xl font-bold text-ink">${revenue}</strong>
        </div>
        <div>
          <span className="text-xs font-semibold uppercase text-slate-500 block">Expected Profit</span>
          <strong className={`text-xl font-bold ${parseFloat(profit) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            ${profit}
          </strong>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

interface StrengthsSelectorProps {
  initialSelected?: string[];
  onChange?: (selected: string[]) => void;
}

const QUALITIES = [
  'Creative',
  'Curious',
  'Kind',
  'Brave',
  'Organised',
  'A good listener'
];

export const StrengthsSelector: React.FC<StrengthsSelectorProps> = ({ initialSelected = [], onChange }) => {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggleQuality = (q: string) => {
    const next = selected.includes(q)
      ? selected.filter(item => item !== q)
      : [...selected, q];
    setSelected(next);
    onChange?.(next);
  };

  return (
    <div className="space-y-3">
      <p className="font-bold text-ink">Choose your qualities:</p>
      <div className="flex flex-wrap gap-2">
        {QUALITIES.map(q => {
          const isActive = selected.includes(q);
          return (
            <button
              key={q}
              type="button"
              onClick={() => toggleQuality(q)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? 'border-navy bg-navy text-white shadow-sm'
                  : 'border-slate-200 bg-white text-ink hover:border-sun'
              }`}
            >
              {isActive ? '✓ ' : '+ '}{q}
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';

interface GenericActivityProps {
  title?: string;
  description?: string;
}

export const GenericActivity: React.FC<GenericActivityProps> = ({
  title = "Quick Activity",
  description = "Talk through your thinking, then save your best notes in the challenge box below."
}) => {
  return (
    <div className="rounded-2xl bg-[#e7f7ff] p-4 border border-sky-100">
      <p className="font-bold text-ink">{title}</p>
      <p className="mt-1 text-sm text-slate-700 leading-relaxed">{description}</p>
    </div>
  );
};

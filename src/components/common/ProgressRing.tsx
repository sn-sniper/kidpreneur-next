import React from 'react';

interface ProgressRingProps {
  completedCount: number;
  totalCount?: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ completedCount, totalCount = 10 }) => {
  const percentage = Math.min(100, Math.round((completedCount / totalCount) * 100));

  return (
    <div
      className="progress-ring-gradient relative h-24 w-24 shrink-0 rounded-full shadow-inner flex items-center justify-center"
      style={{ '--p': percentage } as React.CSSProperties}
    >
      <div className="absolute inset-[15%] rounded-full bg-white flex items-center justify-center shadow-sm">
        <span className="text-xl font-bold text-ink font-display">
          {completedCount}/{totalCount}
        </span>
      </div>
    </div>
  );
};

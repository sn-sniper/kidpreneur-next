import React from 'react';
import { PortfolioManager } from '@/components/admin/PortfolioManager';

export const metadata = {
  title: 'Portfolio & Events CMS - Kidpreneur Admin',
};

export default function AdminPortfolioPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <PortfolioManager />
    </div>
  );
}

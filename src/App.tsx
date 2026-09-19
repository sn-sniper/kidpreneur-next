'use client';
import React from 'react';
import { JourneyProvider, useJourney } from './context/JourneyContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { UnlockModal } from './components/common/UnlockModal';

import { HomeView } from './components/views/HomeView';
import { ProgrammeView } from './components/views/ProgrammeView';
import { JourneyView } from './components/views/JourneyView';
import { SessionsView } from './components/views/SessionsView';
import { WorkspaceView } from './components/views/WorkspaceView';
import { PortfolioView } from './components/views/PortfolioView';
import { ResourcesView } from './components/views/ResourcesView';
import { LiveClassView } from './components/views/LiveClassView';
import { ParentsView } from './components/views/ParentsView';
import { HelpView } from './components/views/HelpView';

const MainContent: React.FC = () => {
  const { activeView } = useJourney();

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'programme':
        return <ProgrammeView />;
      case 'journey':
        return <JourneyView />;
      case 'sessions':
        return <SessionsView />;
      case 'session-workspace':
        return <WorkspaceView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'resources':
        return <ResourcesView />;
      case 'live':
        return <LiveClassView />;
      case 'parents':
        return <ParentsView />;
      case 'help':
        return <HelpView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />
      <Toast />
      <UnlockModal />
    </div>
  );
};

export const App: React.FC<{ initialSessions?: any[] }> = ({ initialSessions = [] }) => {
  return (
    <AuthProvider>
      <JourneyProvider initialSessions={initialSessions}>
        <MainContent />
      </JourneyProvider>
    </AuthProvider>
  );
};

export default App;

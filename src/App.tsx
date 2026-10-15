import React from 'react';
import { UIProvider, useUI } from './context/UIContext';
import { TopAnnouncement } from './components/layout/TopAnnouncement';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { PlanVisitModal } from './components/modals/PlanVisitModal';
import { SermonDetailModal } from './components/modals/SermonDetailModal';
import { EventRsvpModal } from './components/modals/EventRsvpModal';
import { ConnectModal } from './components/modals/ConnectModal';
import { AdminDashboardModal } from './components/modals/AdminDashboardModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MinistriesPage } from './pages/MinistriesPage';
import { SermonsPage } from './pages/SermonsPage';
import { EventsPage } from './pages/EventsPage';
import { VisitPage } from './pages/VisitPage';
import { PrayerPage } from './pages/PrayerPage';
import { ContactPage } from './pages/ContactPage';

const MainContent: React.FC = () => {
  const { currentPage, isAdminOpen, closeAdmin } = useUI();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-900 selection:bg-amber-200 selection:text-amber-950">
      <TopAnnouncement />
      <Navbar />
      
      <div className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'ministries' && <MinistriesPage />}
        {currentPage === 'sermons' && <SermonsPage />}
        {currentPage === 'events' && <EventsPage />}
        {currentPage === 'visit' && <VisitPage />}
        {currentPage === 'prayer' && <PrayerPage />}
        {currentPage === 'contact' && <ContactPage />}
      </div>

      <Footer />

      {/* Global Interactive Modals */}
      <SearchModal />
      <PlanVisitModal />
      <SermonDetailModal />
      <EventRsvpModal />
      <ConnectModal />
      <AdminDashboardModal isOpen={isAdminOpen} onClose={closeAdmin} />
    </div>
  );
};

export default function App() {
  return (
    <UIProvider>
      <MainContent />
    </UIProvider>
  );
}

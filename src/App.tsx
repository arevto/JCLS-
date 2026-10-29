import React, { useState, useEffect } from 'react';
import { UIProvider, useUI } from './context/UIContext';
import { TopAnnouncement } from './components/layout/TopAnnouncement';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { PlanVisitModal } from './components/modals/PlanVisitModal';
import { SermonDetailModal } from './components/modals/SermonDetailModal';
import { EventRsvpModal } from './components/modals/EventRsvpModal';
import { ConnectModal } from './components/modals/ConnectModal';
import { AdminApp } from './components/admin/AdminApp';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MinistriesPage } from './pages/MinistriesPage';
import { SermonsPage } from './pages/SermonsPage';
import { EventsPage } from './pages/EventsPage';
import { VisitPage } from './pages/VisitPage';
import { PrayerPage } from './pages/PrayerPage';
import { ContactPage } from './pages/ContactPage';

/**
 * Detect if the user is on the /admin path.
 * This works for the SPA by checking window.location at load time.
 */
function isAdminRoute(): boolean {
  return window.location.pathname.startsWith('/admin');
}

const MainContent: React.FC = () => {
  const { currentPage } = useUI();

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

      {/* Global Interactive Modals — public facing only */}
      <SearchModal />
      <PlanVisitModal />
      <SermonDetailModal />
      <EventRsvpModal />
      <ConnectModal />
    </div>
  );
};

export default function App() {
  const [showAdmin, setShowAdmin] = useState(isAdminRoute());

  // Listen for navigation events that might change the route
  useEffect(() => {
    const handlePopState = () => {
      setShowAdmin(isAdminRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle the "Staff Login" link from footer — it uses href="/admin"
  // which triggers a full page load. This is handled by isAdminRoute() above.
  // But also watch for hash-based navigation attempts.
  if (showAdmin) {
    return (
      <AdminApp
        onGoBack={() => {
          // Navigate back to the public website
          window.history.pushState({}, '', '/');
          setShowAdmin(false);
        }}
      />
    );
  }

  return (
    <UIProvider>
      <MainContent />
    </UIProvider>
  );
}

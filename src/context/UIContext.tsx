import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PageId, Sermon, ChurchEvent, Ministry } from '../types';

interface UIContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isPlanVisitOpen: boolean;
  openPlanVisit: () => void;
  closePlanVisit: () => void;
  selectedSermon: Sermon | null;
  openSermonModal: (sermon: Sermon) => void;
  closeSermonModal: () => void;
  selectedEvent: ChurchEvent | null;
  openEventModal: (event: ChurchEvent) => void;
  closeEventModal: () => void;
  selectedMinistry: Ministry | null;
  openMinistryModal: (ministry: Ministry) => void;
  closeMinistryModal: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
  navigateTo: (page: PageId) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isPlanVisitOpen, setIsPlanVisitOpen] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const openPlanVisit = () => setIsPlanVisitOpen(true);
  const closePlanVisit = () => setIsPlanVisitOpen(false);

  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => setIsAdminOpen(false);

  const openSermonModal = (sermon: Sermon) => setSelectedSermon(sermon);
  const closeSermonModal = () => setSelectedSermon(null);

  const openEventModal = (event: ChurchEvent) => setSelectedEvent(event);
  const closeEventModal = () => setSelectedEvent(null);

  const openMinistryModal = (ministry: Ministry) => setSelectedMinistry(ministry);
  const closeMinistryModal = () => setSelectedMinistry(null);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <UIContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isPlanVisitOpen,
        openPlanVisit,
        closePlanVisit,
        selectedSermon,
        openSermonModal,
        closeSermonModal,
        selectedEvent,
        openEventModal,
        closeEventModal,
        selectedMinistry,
        openMinistryModal,
        closeMinistryModal,
        isSearchOpen,
        openSearch,
        closeSearch,
        isAdminOpen,
        openAdmin,
        closeAdmin,
        navigateTo
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

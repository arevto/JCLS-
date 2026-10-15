import React from 'react';
import { churchInfo } from '../../data/churchData';
import { useUI } from '../../context/UIContext';
import { Calendar, ArrowRight } from 'lucide-react';

export const TopAnnouncement: React.FC = () => {
  const { openPlanVisit, navigateTo } = useUI();

  return (
    <aside aria-label="Announcement" className="bg-[#0b0d10] border-b border-white/10 text-xs text-neutral-300 py-2.5 px-4 relative z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-white">This Sunday in {churchInfo.city}:</span>
          <span className="text-neutral-400 hidden md:inline">Sunday Celebration Service at 9:00 AM • Family & Youth Welcome</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => navigateTo('events')}
            className="hover:text-amber-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Upcoming Gatherings</span>
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={openPlanVisit}
            className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold group cursor-pointer"
          >
            <span>First Time? Plan a Visit</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </aside>
  );
};

import React, { useState, useEffect } from 'react';
import { useUI } from '../../context/UIContext';
import { churchInfo } from '../../data/churchData';
import type { PageId } from '../../types';
import { Search, Menu, X, ArrowRight, Church, Heart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo, openPlanVisit, openSearch } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'ministries', label: 'Ministries' },
    { id: 'sermons', label: 'Messages' },
    { id: 'events', label: 'Events' },
    { id: 'visit', label: 'Visit Us' },
    { id: 'prayer', label: 'Prayer' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id: PageId) => {
    navigateTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0d0f12]/95 backdrop-blur-md py-3 shadow-lg border-b border-white/5' 
          : 'bg-[#0d0f12]/80 backdrop-blur-xs py-4 md:py-5 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Church Brand / Monogram */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              src="/images/church-logo.png" 
              alt="Jesus Christ Lord & Savior Church Logo" 
              className="w-11 h-11 object-contain rounded-full shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform bg-black/40 ring-1 ring-white/20 p-0.5" 
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-white leading-tight">
                {churchInfo.name}
              </span>
              <span className="text-[10px] tracking-[0.16em] uppercase text-amber-300 font-semibold">
                Batasan Hills • Quezon City
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium tracking-wide transition-all cursor-pointer relative ${
                    isActive
                      ? 'text-white bg-white/10 font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              aria-label="Search church messages and events"
              className="p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bethel-style Plan Your Visit CTA */}
            <button
              onClick={openPlanVisit}
              className="hidden sm:inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide uppercase px-5 py-2.5 rounded-full bg-white text-neutral-900 hover:bg-amber-400 hover:text-neutral-950 transition-all shadow-md group cursor-pointer"
            >
              <span>Plan Your Visit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0f12] border-t border-white/10 px-4 pt-4 pb-6 mt-3 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                  currentPage === link.id
                    ? 'bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20'
                    : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {currentPage === link.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                openPlanVisit();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-sm tracking-wide uppercase shadow-md cursor-pointer"
            >
              <Church className="w-4 h-4" />
              <span>Plan Your Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                handleLinkClick('prayer');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/15 transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Submit a Prayer Request</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

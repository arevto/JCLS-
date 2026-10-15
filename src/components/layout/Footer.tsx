import React from 'react';
import { churchInfo, serviceSchedules } from '../../data/churchData';
import { useUI } from '../../context/UIContext';
import type { PageId } from '../../types';
import { MapPin, Phone, Mail, Clock, ArrowUp, Heart, Lock } from 'lucide-react';
import { FacebookIcon } from '../common/SocialIcons';

export const Footer: React.FC = () => {
  const { navigateTo, openPlanVisit, openAdmin } = useUI();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About JCLS' },
    { id: 'ministries', label: 'Ministries & Teams' },
    { id: 'sermons', label: 'Sermons & Messages' },
    { id: 'events', label: 'Upcoming Gatherings' },
    { id: 'visit', label: 'Plan Your Visit' },
    { id: 'prayer', label: 'Submit Prayer Request' },
    { id: 'contact', label: 'Contact & Location' }
  ];

  return (
    <footer className="bg-[#08090b] text-neutral-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Church Identity & Scripture */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/church-logo.png" 
                alt="JCLS Church Logo" 
                className="w-11 h-11 object-contain rounded-full bg-black/50 ring-1 ring-white/20 p-0.5" 
              />
              <span className="font-serif text-xl font-medium text-white tracking-tight">
                {churchInfo.name}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-neutral-300">
              {churchInfo.missionStatement}
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <p className="font-serif italic text-sm text-neutral-200 leading-snug">
                "{churchInfo.themeScripture.verse}"
              </p>
              <span className="block mt-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
                — {churchInfo.themeScripture.reference}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-5">
              Explore & Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => navigateTo(link.id)}
                    className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Times & Location */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-5">
              Worship Schedule
            </h4>

            <div className="space-y-4 text-sm">
              {serviceSchedules.map((schedule) => (
                <div key={schedule.id} className="border-l-2 border-amber-500/50 pl-3">
                  <div className="text-white font-medium">{schedule.name}</div>
                  <div className="text-xs text-amber-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{schedule.day} • {schedule.time}</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">{schedule.location}</div>
                </div>
              ))}

              <div className="pt-2">
                <button
                  onClick={openPlanVisit}
                  className="text-xs font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
                >
                  Need VIP seating or directions? Plan your visit →
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Official Facebook */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-5">
              Official Channels
            </h4>

            <div className="space-y-3.5 text-sm mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="text-xs leading-relaxed text-neutral-300">
                  {churchInfo.addressLine1}, {churchInfo.addressLine2}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${churchInfo.phone}`} className="hover:text-white transition-colors">{churchInfo.phone}</a>
              </div>

              <div className="flex items-center gap-2.5 text-xs">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${churchInfo.email}`} className="hover:text-white transition-colors truncate">{churchInfo.email}</a>
              </div>
            </div>

            {/* Social Links including Verified Official Facebook */}
            <div className="space-y-2">
              <span className="block text-xs font-medium text-neutral-400">
                Official Facebook Page:
              </span>
              <a
                href={churchInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-300 hover:bg-blue-600/25 transition-colors text-xs font-medium group"
              >
                <FacebookIcon className="w-4 h-4 text-blue-400" />
                <span>Connect on Facebook</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} {churchInfo.name}. All rights reserved.
            <span className="block sm:inline sm:ml-2 text-neutral-400">
              "{churchInfo.tagline}" • Matthew 28:19–20
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={openAdmin}
              className="hover:text-amber-300 text-neutral-400 transition-colors cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px]"
              title="View visitor guest list and prayer requests"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Host & Admin Dashboard</span>
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Statement of Faith
            </button>
            <button
              onClick={() => navigateTo('prayer')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>Prayer</span>
            </button>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

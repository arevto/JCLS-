import React from 'react';
import { useUI } from '../../context/UIContext';
import { ministriesData } from '../../data/churchData';
import { ButtonArrow } from '../common/ButtonArrow';
import { ArrowRight } from 'lucide-react';

export const MinistriesPreviewSection: React.FC = () => {
  const { openMinistryModal, navigateTo } = useUI();

  return (
    <section className="py-24 sm:py-32 bg-[#090b0e] text-white overflow-hidden relative">
      {/* Subtle ambient light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bethel-style Massive Headline Block */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <span className="block text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-400 mb-4">
            Ministries & Community
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08] mb-8">
            There’s a place for you in what God is doing in our house.
          </h2>
          <ButtonArrow onClick={() => navigateTo('ministries')} variant="white">
            Explore All Ministries
          </ButtonArrow>
        </div>

        {/* Ministries Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ministriesData.slice(0, 6).map((ministry) => (
            <div
              key={ministry.id}
              onClick={() => openMinistryModal(ministry)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-amber-400/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image banner with zoom */}
              <div className="relative aspect-16/10 overflow-hidden img-zoom-container">
                <img
                  src={ministry.image}
                  alt={ministry.name}
                  className="w-full h-full object-cover img-zoom brightness-85 group-hover:brightness-100 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase bg-neutral-950/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-md border border-white/10">
                  {ministry.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-light text-white group-hover:text-amber-300 transition-colors mb-2">
                    {ministry.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed line-clamp-2">
                    {ministry.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-medium text-amber-400/90">{ministry.schedule}</span>
                  <span className="group-hover:translate-x-1 transition-transform text-white font-medium inline-flex items-center gap-1">
                    Connect <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

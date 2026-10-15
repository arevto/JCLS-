import React from 'react';
import { useUI } from '../../context/UIContext';
import { churchInfo, sermonsData } from '../../data/churchData';
import { ButtonArrow } from '../common/ButtonArrow';
import { Play, Sparkles, MapPin, Calendar } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { openPlanVisit, openSermonModal, navigateTo } = useUI();
  const latestSermon = sermonsData.find(s => s.isFeatured) || sermonsData[0];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-[#090b0e] text-white overflow-hidden">
      {/* Background Cinematic Image with Subtle Zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-worship.jpg"
          alt="Church Worship"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000 brightness-75"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/60 to-[#090b0e]/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#090b0e]/40 to-[#090b0e]/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center">
        
        {/* Subtle Pretitle / Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{churchInfo.tagline} • {churchInfo.themeScripture.reference}</span>
        </div>

        {/* Grand Headline inspired by Bethel's Editorial Aesthetics */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight max-w-5xl leading-[1.05] text-white mb-6 drop-shadow-sm">
          Glorifying Jesus Christ.<br />
          <span className="italic font-normal text-amber-100">Making Disciples.</span><br />
          Transforming Lives.
        </h1>

        {/* Narrative Description */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl font-light text-neutral-200/90 leading-relaxed mb-10">
          Welcome to <strong className="font-semibold text-white">{churchInfo.name}</strong> in {churchInfo.city}. We are a Christ-centered family committed to passionate worship, biblical truth, and living out the Great Commission.
        </p>

        {/* Dual Call To Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <ButtonArrow 
            onClick={openPlanVisit} 
            variant="white" 
            size="lg"
            className="w-full sm:w-auto shadow-2xl"
          >
            Plan Your Visit
          </ButtonArrow>

          <button
            onClick={() => openSermonModal(latestSermon)}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium text-base tracking-wide transition-all backdrop-blur-md cursor-pointer active:scale-95"
          >
            <Play className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Watch Latest Message</span>
          </button>
        </div>

        {/* Bottom Location & Schedule Teaser Bar */}
        <div className="mt-16 sm:mt-24 pt-6 border-t border-white/15 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wider uppercase text-neutral-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>71 Hills St, Batasan Hills, QC</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Sunday Celebration: 9:00 AM – 12:00 NN</span>
          </div>

          <button
            onClick={() => navigateTo('visit')}
            className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer"
          >
            Visitor Info & Map →
          </button>
        </div>

      </div>
    </section>
  );
};

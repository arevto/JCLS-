import React from 'react';
import { useUI } from '../../context/UIContext';
import { sermonsData } from '../../data/churchData';
import { SectionHeader } from '../common/SectionHeader';
import { ButtonArrow } from '../common/ButtonArrow';
import { PlaceholderBadge } from '../common/PlaceholderBadge';
import { Play, BookOpen, Clock, Calendar, User } from 'lucide-react';

export const FeaturedSermonSection: React.FC = () => {
  const { openSermonModal, navigateTo } = useUI();
  const featured = sermonsData.find(s => s.isFeatured) || sermonsData[0];

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f6] text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeader
            label="Sermons & Teaching"
            title="Latest Message"
            subtitle="Engage with sound biblical teaching aimed at stirring your spirit and equipping you for everyday discipleship."
          />

          <div className="shrink-0 flex items-center gap-3">
            <PlaceholderBadge label="Editable Preacher/Notes" />
            <ButtonArrow onClick={() => navigateTo('sermons')} variant="outline" size="sm">
              All Messages
            </ButtonArrow>
          </div>
        </div>

        {/* Featured Sermon Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-200/70">
          
          {/* Thumbnail / Video trigger */}
          <div className="lg:col-span-7">
            <div 
              onClick={() => openSermonModal(featured)}
              className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer shadow-lg bg-neutral-950"
            >
              <img
                src={featured.thumbnail}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-neutral-950/30 group-hover:bg-neutral-950/15 transition-colors" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white/95 text-neutral-950 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-amber-400 transition-all">
                  <Play className="w-8 h-8 fill-neutral-950 ml-1" />
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md text-amber-300 text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-white/10">
                Featured Message
              </div>

              <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{featured.duration}</span>
              </div>
            </div>
          </div>

          {/* Sermon Details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
              <span>Series:</span>
              <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">{featured.series}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-neutral-950 leading-tight">
              {featured.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              {featured.description}
            </p>

            <div className="space-y-2 py-3 border-y border-neutral-100 text-xs sm:text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                <span>Preacher: <strong>{featured.speaker}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Passage: <strong className="text-neutral-800">{featured.passage}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Date Delivered: {featured.date}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ButtonArrow onClick={() => openSermonModal(featured)} variant="dark">
                Watch Message Now
              </ButtonArrow>

              <button
                onClick={() => navigateTo('sermons')}
                className="text-xs sm:text-sm font-semibold text-neutral-700 hover:text-neutral-950 px-4 py-2 cursor-pointer"
              >
                Browse All Sermons →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

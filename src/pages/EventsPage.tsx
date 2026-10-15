import React, { useState } from 'react';
import { churchEvents } from '../data/churchData';
import { useUI } from '../context/UIContext';
import { ButtonArrow } from '../components/common/ButtonArrow';
import { PlaceholderBadge } from '../components/common/PlaceholderBadge';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { openEventModal } = useUI();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Gatherings' },
    { id: 'conference', label: 'Conferences & Anniversaries' },
    { id: 'youth', label: 'Youth & Young Pro (#JCLSYoungPro)' },
    { id: 'fellowship', label: 'Fellowship & Classes' },
    { id: 'prayer', label: 'Prayer Summits' }
  ];

  const filteredEvents = activeCategory === 'all'
    ? churchEvents
    : churchEvents.filter(e => e.category === activeCategory);

  const featured = churchEvents.find(e => e.highlight) || churchEvents[0];

  return (
    <div className="bg-[#faf9f6] text-neutral-900 min-h-screen">
      
      {/* Header Banner */}
      <section className="relative py-24 sm:py-32 bg-[#090b0e] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-worship.jpg"
            alt="Events"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-400 block">
            Calendar & Gatherings
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight">
            Upcoming Church Events
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Stay connected and grow in fellowship through our conferences, youth nights, prayer summits, and special gatherings.
          </p>
        </div>
      </section>

      {/* Featured Event Hero */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-200/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6">
              <div
                onClick={() => openEventModal(featured)}
                className="relative aspect-16/10 rounded-2xl overflow-hidden group cursor-pointer shadow-md img-zoom-container"
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-[11px] font-semibold tracking-wider uppercase bg-amber-500 text-neutral-950 px-3 py-1 rounded-full shadow">
                  Featured Event
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  {featured.category}
                </span>
                {featured.isPlaceholder && (
                  <PlaceholderBadge label="Editable Event Details" />
                )}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-neutral-950 leading-tight">
                {featured.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {featured.description}
              </p>

              <div className="space-y-1.5 text-xs sm:text-sm text-neutral-600 py-3 border-y border-neutral-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-medium text-neutral-900">{featured.dateDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{featured.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{featured.location}</span>
                </div>
              </div>

              <div className="pt-2">
                <ButtonArrow onClick={() => openEventModal(featured)} variant="dark">
                  Register / RSVP for this Event
                </ButtonArrow>
              </div>
            </div>

          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => openEventModal(evt)}
              className="rounded-3xl overflow-hidden bg-white border border-neutral-200/80 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-neutral-900 img-zoom-container">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase bg-white/90 text-neutral-900 px-2.5 py-0.5 rounded-full">
                  {evt.category}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-950 group-hover:text-amber-800 transition-colors mb-2 leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-neutral-100 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-medium text-neutral-900">{evt.dateDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-neutral-900 group-hover:text-amber-700 flex items-center justify-between">
                    <span>Reserve Your Seat</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};

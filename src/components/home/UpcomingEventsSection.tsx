import React from 'react';
import { useUI } from '../../context/UIContext';
import { churchEvents } from '../../data/churchData';
import { SectionHeader } from '../common/SectionHeader';
import { ButtonArrow } from '../common/ButtonArrow';
import { PlaceholderBadge } from '../common/PlaceholderBadge';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const UpcomingEventsSection: React.FC = () => {
  const { openEventModal, navigateTo } = useUI();
  const featuredEvent = churchEvents.find(e => e.highlight) || churchEvents[0];
  const otherEvents = churchEvents.filter(e => e.id !== featuredEvent.id).slice(0, 2);

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f6] text-neutral-900 border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeader
            label="Church Gatherings"
            title="Upcoming Events & Conferences"
            subtitle="Connect with the church family through special conferences, nights of worship, prayer summits, and fellowship gatherings."
          />

          <div className="shrink-0 flex items-center gap-3">
            <PlaceholderBadge label="Editable Events" />
            <ButtonArrow onClick={() => navigateTo('events')} variant="outline" size="sm">
              Event Calendar
            </ButtonArrow>
          </div>
        </div>

        {/* Bethel-Inspired Featured Event Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-200/80 mb-10">
          
          <div className="lg:col-span-6">
            <div 
              onClick={() => openEventModal(featuredEvent)}
              className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden group cursor-pointer shadow-md img-zoom-container"
            >
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[11px] font-semibold tracking-widest uppercase bg-amber-500 text-neutral-950 px-3 py-1 rounded-full shadow">
                  Featured Event
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                {featuredEvent.category}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-neutral-950 leading-tight">
              {featuredEvent.title}
            </h3>

            <div className="space-y-1.5 text-xs sm:text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-medium text-neutral-900">{featuredEvent.dateDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{featuredEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{featuredEvent.location}</span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              {featuredEvent.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <ButtonArrow onClick={() => openEventModal(featuredEvent)} variant="dark">
                Register & RSVP
              </ButtonArrow>
              <ButtonArrow onClick={() => navigateTo('events')} variant="sand">
                View All Events
              </ButtonArrow>
            </div>
          </div>

        </div>

        {/* Secondary Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => openEventModal(evt)}
              className="p-6 rounded-2xl bg-white border border-neutral-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {evt.category}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    {evt.dateDisplay}
                  </span>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl font-light text-neutral-900 group-hover:text-amber-800 transition-colors mb-2">
                  {evt.title}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-600 font-light line-clamp-2 mb-4">
                  {evt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {evt.time}
                </span>
                <span className="text-neutral-900 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  RSVP Details →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

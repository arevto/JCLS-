import React from 'react';
import { churchEvents } from '../data/churchData';
import { useUI } from '../context/UIContext';
import { ButtonArrow } from '../components/common/ButtonArrow';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { openEventModal } = useUI();

  // Filter events: upcoming = isoDate >= today, past = isoDate < today
  const today = new Date().toISOString().slice(0, 10);
  const upcomingEvents = churchEvents
    .filter(e => e.isoDate >= today)
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  const pastEvents = churchEvents
    .filter(e => e.isoDate < today)
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate));

  const featuredEvent = upcomingEvents.find(e => e.highlight) || upcomingEvents[0];

  return (
    <div className="bg-[#faf9f6] text-neutral-900 min-h-screen">
      
      {/* Header Banner */}
      <section className="relative py-24 sm:py-32 bg-[#090b0e] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/church-thanksgiving.jpg"
            alt="Church Events"
            className="w-full h-full object-cover opacity-25"
            onError={(e) => { e.currentTarget.src = '/images/hero-worship.jpg'; }}
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
            Stay connected and grow in fellowship through our conferences, prayer summits, and special gatherings.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 ? (
          <>
            <div className="mb-10">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-700 block mb-1">Upcoming</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-950">Events & Conferences</h2>
            </div>

            {/* Featured Event */}
            {featuredEvent && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-200/80 mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-6">
                    <div
                      onClick={() => openEventModal(featuredEvent)}
                      className="relative aspect-16/10 rounded-2xl overflow-hidden group cursor-pointer shadow-md img-zoom-container"
                    >
                      <img
                        src={featuredEvent.image}
                        alt={featuredEvent.title}
                        className="w-full h-full object-cover img-zoom"
                        onError={(e) => { e.currentTarget.src = '/images/church-hero.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 text-[11px] font-semibold tracking-wider uppercase bg-amber-500 text-neutral-950 px-3 py-1 rounded-full shadow">
                        Featured Event
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-semibold tracking-wider uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full inline-block">
                      {featuredEvent.category}
                    </span>

                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-neutral-950 leading-tight">
                      {featuredEvent.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                      {featuredEvent.description}
                    </p>

                    <div className="space-y-1.5 text-xs sm:text-sm text-neutral-600 py-3 border-y border-neutral-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="font-medium text-neutral-900">{featuredEvent.dateDisplay}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{featuredEvent.location}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <ButtonArrow onClick={() => openEventModal(featuredEvent)} variant="dark">
                        Event Details
                      </ButtonArrow>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Other Upcoming Events Grid */}
            {upcomingEvents.filter(e => e.id !== featuredEvent?.id).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {upcomingEvents.filter(e => e.id !== featuredEvent?.id).map((evt) => (
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
                        onError={(e) => { e.currentTarget.src = '/images/church-hero.jpg'; }}
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="truncate">{evt.location}</span>
                          </div>
                          <span className="text-neutral-900 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            Details <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center space-y-4 mb-16">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8 text-neutral-400" />
            </div>
            <h2 className="font-serif text-2xl text-neutral-700">No Upcoming Events</h2>
            <p className="text-neutral-500 text-sm max-w-md mx-auto">
              There are no upcoming events scheduled at this time. Please check back soon or follow our Facebook page for the latest announcements.
            </p>
          </div>
        )}

        {/* Past Events Archive */}
        {pastEvents.length > 0 && (
          <div className="border-t border-neutral-200 pt-12">
            <div className="mb-8">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-1">Archive</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-700">Past Events</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs opacity-75 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full inline-block mb-2">
                      {evt.category}
                    </span>
                    <h3 className="font-serif text-lg font-light text-neutral-700 mb-1 leading-snug">{evt.title}</h3>
                    <p className="text-xs text-neutral-400 line-clamp-2">{evt.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 pt-3 border-t border-neutral-100 mt-3">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{evt.dateDisplay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

    </div>
  );
};

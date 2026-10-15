import React, { useState } from 'react';
import { ministriesData, churchInfo } from '../data/churchData';
import { useUI } from '../context/UIContext';
import { ButtonArrow } from '../components/common/ButtonArrow';
import { Users, Clock, ArrowRight } from 'lucide-react';

export const MinistriesPage: React.FC = () => {
  const { openMinistryModal, openPlanVisit } = useUI();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Ministries' },
    { id: 'generation', label: 'Youth & Kids' },
    { id: 'worship', label: 'Worship & Creative' },
    { id: 'discipleship', label: 'Discipleship & Life Groups' },
    { id: 'care', label: 'Pastoral Care & Prayer' },
    { id: 'outreach', label: 'Missions & Outreach' }
  ];

  const filtered = activeCategory === 'all'
    ? ministriesData
    : ministriesData.filter(m => m.category === activeCategory);

  return (
    <div className="bg-[#faf9f6] text-neutral-900 min-h-screen">
      
      {/* Header Banner */}
      <section className="relative py-24 sm:py-32 bg-[#090b0e] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/youth-ministry.jpg"
            alt="Ministries"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-400 block">
            Get Involved
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight">
            Find Your Place to Belong & Serve
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            God has uniquely gifted you to contribute to His Kingdom. Explore the vibrant ministries of {churchInfo.name}.
          </p>
        </div>
      </section>

      {/* Filter and Content Area */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((ministry) => (
            <div
              key={ministry.id}
              className="rounded-3xl overflow-hidden bg-white border border-neutral-200/80 shadow-md hover:shadow-xl hover:border-amber-400/50 transition-all flex flex-col justify-between group"
            >
              {/* Image Banner */}
              <div className="relative aspect-16/10 overflow-hidden img-zoom-container bg-neutral-900">
                <img
                  src={ministry.image}
                  alt={ministry.name}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-wider uppercase bg-white/90 text-neutral-900 px-3 py-1 rounded-full shadow-xs">
                  {ministry.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-light text-neutral-950 mb-2 group-hover:text-amber-800 transition-colors">
                    {ministry.name}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 tracking-wide mb-3">
                    {ministry.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {ministry.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>Schedule:</strong> {ministry.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>Audience:</strong> {ministry.audience}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => openMinistryModal(ministry)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm cursor-pointer group-hover:bg-amber-600"
                  >
                    <span>Connect or Volunteer</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Volunteer Callout */}
      <section className="py-20 bg-neutral-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-5">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-400 block">
            Serve The Lord
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            Use Your God-Given Talents
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base font-light max-w-lg mx-auto">
            Whether in music, welcoming visitors, audio-visual technology, prayer, or teaching children, there is a role for you in our church family.
          </p>
          <div className="pt-2">
            <ButtonArrow onClick={openPlanVisit} variant="white">
              Connect with Leadership This Sunday
            </ButtonArrow>
          </div>
        </div>
      </section>

    </div>
  );
};

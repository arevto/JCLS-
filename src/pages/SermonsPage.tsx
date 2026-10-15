import React, { useState } from 'react';
import { sermonsData, churchInfo } from '../data/churchData';
import { useUI } from '../context/UIContext';
import { ButtonArrow } from '../components/common/ButtonArrow';
import { PlaceholderBadge } from '../components/common/PlaceholderBadge';
import { Play, Search, BookOpen, Clock, Calendar, User } from 'lucide-react';

export const SermonsPage: React.FC = () => {
  const { openSermonModal } = useUI();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSeries, setActiveSeries] = useState<string>('all');

  const seriesList = ['all', ...new Set(sermonsData.map(s => s.series))];

  const filteredSermons = sermonsData.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.passage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeries = activeSeries === 'all' || s.series === activeSeries;
    return matchesSearch && matchesSeries;
  });

  const featured = sermonsData.find(s => s.isFeatured) || sermonsData[0];

  return (
    <div className="bg-[#faf9f6] text-neutral-900 min-h-screen">
      
      {/* Editorial Sermons Hero */}
      <section className="relative py-24 sm:py-32 bg-[#0d0f12] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/pastor-preaching.jpg"
            alt="Preaching the Word"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-[#0d0f12]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-400 block">
            Media & Messages
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight">
            The Living Word of God
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Faith comes by hearing, and hearing by the Word of God. Catch up on Sunday sermons and biblical teaching from {churchInfo.name}.
          </p>
        </div>
      </section>

      {/* Featured Sermon Highlight */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-200/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div
                onClick={() => openSermonModal(featured)}
                className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer shadow-lg bg-neutral-950 img-zoom-container"
              >
                <img
                  src={featured.thumbnail}
                  alt={featured.title}
                  className="w-full h-full object-cover img-zoom brightness-85 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-amber-400 transition-all">
                    <Play className="w-8 h-8 fill-neutral-950 ml-1" />
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold tracking-widest uppercase bg-amber-500 text-neutral-950 px-3 py-1 rounded-full shadow">
                    Featured Message
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{featured.duration}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  Series: {featured.series}
                </span>
                {featured.isPlaceholder && (
                  <PlaceholderBadge label="Video Placeholder" />
                )}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-neutral-950 leading-tight">
                {featured.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {featured.description}
              </p>

              <div className="space-y-1.5 text-xs text-neutral-500 py-3 border-y border-neutral-100">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  <span>Preacher: <strong>{featured.speaker}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Passage: <strong className="text-neutral-800">{featured.passage}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>{featured.date}</span>
                </div>
              </div>

              <div className="pt-2">
                <ButtonArrow onClick={() => openSermonModal(featured)} variant="dark">
                  Watch Featured Message
                </ButtonArrow>
              </div>
            </div>

          </div>
        </div>

        {/* Search & Series Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-200">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="search"
              placeholder="Search by title, speaker, or scripture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-200 bg-white text-xs sm:text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Series Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
            {seriesList.map((series) => (
              <button
                key={series}
                onClick={() => setActiveSeries(series)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  activeSeries === series
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {series === 'all' ? 'All Series' : series}
              </button>
            ))}
          </div>

        </div>

        {/* Sermon Grid */}
        {filteredSermons.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 text-sm">
            No sermons found matching your query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((sermon) => (
              <div
                key={sermon.id}
                onClick={() => openSermonModal(sermon)}
                className="rounded-3xl overflow-hidden bg-white border border-neutral-200/80 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-neutral-900 img-zoom-container">
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-full object-cover img-zoom brightness-85 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/10 transition-colors" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-amber-400 transition-all">
                      <Play className="w-5 h-5 fill-neutral-950 ml-0.5" />
                    </div>
                  </div>

                  <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase bg-neutral-950/80 backdrop-blur-md text-amber-300 px-2.5 py-0.5 rounded border border-white/10">
                    {sermon.series}
                  </span>

                  <span className="absolute bottom-3 right-3 text-[11px] bg-neutral-950/80 text-white px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {sermon.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-950 group-hover:text-amber-800 transition-colors mb-2 leading-snug">
                      {sermon.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-light line-clamp-2 leading-relaxed">
                      {sermon.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 text-xs text-neutral-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-neutral-800">{sermon.speaker}</span>
                      <span className="text-neutral-400">{sermon.date}</span>
                    </div>
                    <div className="text-amber-700 font-medium">
                      {sermon.passage}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

    </div>
  );
};

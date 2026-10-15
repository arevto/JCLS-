import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { sermonsData, churchEvents, ministriesData, beliefsData } from '../../data/churchData';
import { Search, X, Video, Calendar, Users, BookOpen, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, openSermonModal, openEventModal, openMinistryModal, navigateTo } = useUI();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredSermons = q ? sermonsData.filter(s => 
    s.title.toLowerCase().includes(q) || 
    s.speaker.toLowerCase().includes(q) || 
    s.passage.toLowerCase().includes(q)
  ) : [];

  const filteredEvents = q ? churchEvents.filter(e => 
    e.title.toLowerCase().includes(q) || 
    e.description.toLowerCase().includes(q)
  ) : [];

  const filteredMinistries = q ? ministriesData.filter(m => 
    m.name.toLowerCase().includes(q) || 
    m.description.toLowerCase().includes(q)
  ) : [];

  const filteredBeliefs = q ? beliefsData.filter(b => 
    b.topic.toLowerCase().includes(q) || 
    b.summary.toLowerCase().includes(q)
  ) : [];

  const totalResults = filteredSermons.length + filteredEvents.length + filteredMinistries.length + filteredBeliefs.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      <div 
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-amber-400 shrink-0 mr-3" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages, upcoming events, ministries, or beliefs..."
            autoFocus
            className="w-full bg-transparent text-white placeholder-neutral-500 text-base outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-white p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="ml-3 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {!q ? (
            <div className="py-8 text-center">
              <p className="text-neutral-400 text-sm">
                Try searching for <span className="text-amber-400 cursor-pointer" onClick={() => setQuery('worship')}>"worship"</span>,{' '}
                <span className="text-amber-400 cursor-pointer" onClick={() => setQuery('disciples')}>"disciples"</span>,{' '}
                <span className="text-amber-400 cursor-pointer" onClick={() => setQuery('youth')}>"youth"</span>, or{' '}
                <span className="text-amber-400 cursor-pointer" onClick={() => setQuery('prayer')}>"prayer"</span>.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-neutral-400 text-sm">
              No results found for "<span className="text-white">{query}</span>".
            </div>
          ) : (
            <>
              {/* Sermons */}
              {filteredSermons.length > 0 && (
                <div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" /> Sermons & Messages ({filteredSermons.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredSermons.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          closeSearch();
                          openSermonModal(s);
                        }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-white">{s.title}</div>
                          <div className="text-xs text-neutral-400">{s.speaker} • {s.passage}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {filteredEvents.length > 0 && (
                <div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Events ({filteredEvents.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredEvents.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          closeSearch();
                          openEventModal(e);
                        }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-white">{e.title}</div>
                          <div className="text-xs text-neutral-400">{e.dateDisplay} • {e.location}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ministries */}
              {filteredMinistries.length > 0 && (
                <div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Ministries ({filteredMinistries.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredMinistries.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          closeSearch();
                          openMinistryModal(m);
                        }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-white">{m.name}</div>
                          <div className="text-xs text-neutral-400">{m.schedule}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Beliefs */}
              {filteredBeliefs.length > 0 && (
                <div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Beliefs & Doctrine ({filteredBeliefs.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredBeliefs.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          closeSearch();
                          navigateTo('about');
                        }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-white">{b.topic}</div>
                          <div className="text-xs text-neutral-400">{b.summary}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

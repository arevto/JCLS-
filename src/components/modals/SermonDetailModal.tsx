import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { Modal } from '../common/Modal';
import { PlaceholderBadge } from '../common/PlaceholderBadge';
import { Play, BookOpen, Clock, Calendar, User, Share2, Check } from 'lucide-react';

export const SermonDetailModal: React.FC = () => {
  const { selectedSermon, closeSermonModal } = useUI();
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!selectedSermon) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Modal isOpen={!!selectedSermon} onClose={closeSermonModal} maxWidth="2xl">
      <div className="space-y-6">
        {/* Media / Video Player */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-inner flex items-center justify-center">
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src={`${selectedSermon.videoUrl || 'https://www.youtube.com/embed/dQ1xxoP7NJk'}?autoplay=1`}
              title={selectedSermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
              <img
                src={selectedSermon.thumbnail}
                alt={selectedSermon.title}
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-amber-400 transition-all">
                  <Play className="w-7 h-7 fill-neutral-950 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedSermon.duration}</span>
              </div>
            </div>
          )}
        </div>

        {/* Sermon Meta & Details */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
              Series: {selectedSermon.series}
            </span>
            {selectedSermon.isPlaceholder && (
              <PlaceholderBadge label="Video Placeholder" />
            )}
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900 mb-3">
            {selectedSermon.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-500 pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-600" />
              <span>{selectedSermon.speaker} ({selectedSermon.speakerRole})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>{selectedSermon.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span className="font-medium text-neutral-800">{selectedSermon.passage}</span>
            </div>
          </div>
        </div>

        {/* Summary Description */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
            Message Overview
          </h4>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {selectedSermon.description}
          </p>
        </div>

        {/* Sermon Notes / Key Takeaways */}
        {selectedSermon.notes && selectedSermon.notes.length > 0 && (
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Key Message Takeaways
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-600">
              {selectedSermon.notes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Row */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Message'}</span>
            </button>
          </div>

          <button
            onClick={closeSermonModal}
            className="px-5 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

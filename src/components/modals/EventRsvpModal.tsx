import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { Modal } from '../common/Modal';
import { ButtonArrow } from '../common/ButtonArrow';
import { Calendar, Clock, MapPin, CheckCircle2, User, Mail, Ticket } from 'lucide-react';
import { submissionService } from '../../services/submissionService';

export const EventRsvpModal: React.FC = () => {
  const { selectedEvent, closeEventModal } = useUI();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tickets: '1',
    note: ''
  });

  if (!selectedEvent) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    submissionService.addRsvp({
      eventTitle: selectedEvent.title,
      name: formData.name.trim(),
      email: formData.email.trim(),
      tickets: formData.tickets,
      note: formData.note.trim()
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', tickets: '1', note: '' });
    closeEventModal();
  };

  return (
    <Modal isOpen={!!selectedEvent} onClose={handleClose} title={submitted ? 'RSVP Confirmed!' : 'Event Registration'}>
      {!submitted ? (
        <div className="space-y-5">
          {/* Event Header Banner */}
          <div className="rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 text-white relative">
            <div className="h-32 relative">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {selectedEvent.category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-normal text-white mt-1 leading-snug">
                  {selectedEvent.title}
                </h3>
              </div>
            </div>

            <div className="p-3.5 bg-neutral-950 text-xs text-neutral-300 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{selectedEvent.dateDisplay}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:col-span-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{selectedEvent.location}</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {selectedEvent.description}
          </p>

          {/* RSVP Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Total Attendees
                </label>
                <div className="relative">
                  <Ticket className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <select
                    value={formData.tickets}
                    onChange={(e) => setFormData({ ...formData, tickets: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500 bg-white"
                  >
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4+">4+ people</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Need childcare, ride info, etc."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                Cancel
              </button>
              <ButtonArrow type="submit" variant="dark" size="sm">
                Confirm Registration
              </ButtonArrow>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="font-serif text-2xl font-light text-neutral-900">
            Registration Confirmed!
          </h3>

          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Thank you, <strong>{formData.name}</strong>. You have registered <strong>{formData.tickets} {parseInt(formData.tickets) > 1 ? 'attendees' : 'attendee'}</strong> for <em>{selectedEvent.title}</em>.
          </p>

          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-1 text-left max-w-sm mx-auto">
            <div><strong>Date:</strong> {selectedEvent.dateDisplay}</div>
            <div><strong>Time:</strong> {selectedEvent.time}</div>
            <div><strong>Location:</strong> {selectedEvent.location}</div>
          </div>

          <div className="pt-3">
            <ButtonArrow onClick={handleClose} variant="dark" size="sm">
              Done
            </ButtonArrow>
          </div>
        </div>
      )}
    </Modal>
  );
};

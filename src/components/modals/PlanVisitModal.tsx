import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { churchInfo, serviceSchedules } from '../../data/churchData';
import { submissionService } from '../../services/submissionService';
import { Modal } from '../common/Modal';
import { ButtonArrow } from '../common/ButtonArrow';
import { Calendar, Clock, MapPin, CheckCircle2, User, Mail, Phone, Users, Sparkles, Heart } from 'lucide-react';

export const PlanVisitModal: React.FC = () => {
  const { isPlanVisitOpen, closePlanVisit } = useUI();
  const [step, setStep] = useState<'form' | 'success'>('form');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceId: serviceSchedules[0]?.id || '',
    date: 'Upcoming Sunday',
    partySize: '1',
    hasKids: false,
    specialRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const selectedSchedule = serviceSchedules.find(s => s.id === formData.serviceId);
    submissionService.addVisit({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceName: selectedSchedule ? `${selectedSchedule.name} (${selectedSchedule.time})` : 'Sunday Morning Service',
      partySize: formData.partySize,
      hasKids: formData.hasKids,
      specialRequests: formData.specialRequests
    });

    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceId: serviceSchedules[0]?.id || '',
      date: 'Upcoming Sunday',
      partySize: '1',
      hasKids: false,
      specialRequests: ''
    });
    closePlanVisit();
  };

  return (
    <Modal isOpen={isPlanVisitOpen} onClose={handleReset} title={step === 'form' ? 'Plan Your Visit' : 'We Can’t Wait to Meet You!'}>
      {step === 'form' ? (
        <div>
          <div className="mb-6">
            <p className="text-sm text-neutral-600 leading-relaxed">
              We know visiting a new church can be intimidating. When you plan your visit in advance, our welcome team will meet you at the front doors, save you seats, and introduce you to our pastors!
            </p>
          </div>

          {/* Perks Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-neutral-700">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Dedicated Host at Entrance</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Reserved Family Seating</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Complimentary Welcome Gift</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Santos"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="maria@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Mobile / Viber Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="+63 9XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Select Worship Service
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500 bg-white"
                >
                  {serviceSchedules.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.day} • {s.time} ({s.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  How many people in your group?
                </label>
                <select
                  value={formData.partySize}
                  onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500 bg-white"
                >
                  <option value="1">Just me (1)</option>
                  <option value="2">2 people</option>
                  <option value="3-4">3 – 4 people (Family)</option>
                  <option value="5+">5+ people</option>
                </select>
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={formData.hasKids}
                    onChange={(e) => setFormData({ ...formData, hasKids: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-neutral-300"
                  />
                  <span>I'm bringing children (Kids Ministry check-in)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Questions or special needs (optional)
              </label>
              <textarea
                rows={2}
                placeholder="Accessibility needs, prayer requests, or questions..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full p-3 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closePlanVisit}
                className="px-5 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                Cancel
              </button>
              <ButtonArrow type="submit" variant="dark">
                Confirm My Visit Plan
              </ButtonArrow>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900">
            You're on the Guest List, {formData.name}!
          </h3>

          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            We are honored and overjoyed to welcome you to <strong>{churchInfo.name}</strong> this Sunday in {churchInfo.city}. Our hospitality team has been notified and will be ready to greet you with a warm smile!
          </p>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 text-left text-xs text-neutral-700 space-y-2 max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span><strong>Day:</strong> This Sunday</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span><strong>Time:</strong> Service begins at 9:00 AM (Doors open at 8:30 AM)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span><strong>Location:</strong> {churchInfo.locationName}</span>
            </div>
          </div>

          <div className="pt-4">
            <ButtonArrow onClick={handleReset} variant="dark">
              Done & Return to Site
            </ButtonArrow>
          </div>
        </div>
      )}
    </Modal>
  );
};

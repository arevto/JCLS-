import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { Modal } from '../common/Modal';
import { ButtonArrow } from '../common/ButtonArrow';
import { CheckCircle2, User, Mail, Phone, Sparkles } from 'lucide-react';

export const ConnectModal: React.FC = () => {
  const { selectedMinistry, closeMinistryModal } = useUI();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'attend',
    message: ''
  });

  if (!selectedMinistry) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', interest: 'attend', message: '' });
    closeMinistryModal();
  };

  return (
    <Modal isOpen={!!selectedMinistry} onClose={handleClose} title={submitted ? 'Message Received!' : `Connect with ${selectedMinistry.name}`}>
      {!submitted ? (
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong>Schedule:</strong> {selectedMinistry.schedule}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {selectedMinistry.description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
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
                  Mobile / Viber
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="+63 9XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  I want to:
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500 bg-white"
                >
                  <option value="attend">Attend a meeting / fellowship</option>
                  <option value="volunteer">Volunteer or serve on the team</option>
                  <option value="questions">Ask questions</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                Tell us a bit about yourself (optional)
              </label>
              <textarea
                rows={2}
                placeholder="Background, skills, or anything you'd like to share..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
              />
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
                Connect with Ministry
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
            Thank You, {formData.name}!
          </h3>

          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Your inquiry for <strong>{selectedMinistry.name}</strong> has been received. Our ministry leaders will be in touch with you shortly to welcome you and share next steps!
          </p>

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

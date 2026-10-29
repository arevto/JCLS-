import React, { useState } from 'react';
import { churchInfo } from '../data/churchData';
import { ButtonArrow } from '../components/common/ButtonArrow';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { FacebookIcon } from '../components/common/SocialIcons';
import { submissionService } from '../services/submissionService';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Your message must be at least 10 characters.';
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Your message must not exceed 2000 characters.';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      submissionService.addContactInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        topic: formData.topic,
        message: formData.message.trim()
      });
      setSubmitted(true);
    } catch {
      setError('There was an error submitting your message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#faf9f6] text-neutral-900 min-h-screen">

      {/* Header Banner */}
      <section className="relative py-24 sm:py-32 bg-[#090b0e] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/church-visit.jpg"
            alt="Contact JCLS Church"
            className="w-full h-full object-cover opacity-25"
            onError={(e) => { e.currentTarget.src = '/images/community-fellowship.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-400 block">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight">
            We Would Love to Hear From You
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Have questions about services, water baptism, child dedications, or getting involved? Our team is here to assist.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Info */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/80 shadow-xl">
            <h2 className="font-serif text-3xl font-light text-neutral-950 mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light mb-8">
              Fill out the form below and a pastoral or ministry representative will reach out to you within 24 to 48 hours.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-1 ${errors.name ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-400' : 'border-neutral-200 focus:border-amber-500 focus:ring-amber-400'}`}
                    />
                    {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-1 ${errors.email ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-400' : 'border-neutral-200 focus:border-amber-500 focus:ring-amber-400'}`}
                    />
                    {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Mobile / Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+63 9XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-400 bg-white"
                    >
                      <option value="General Inquiry">General Church Inquiry</option>
                      <option value="Pastoral Care">Pastoral Care & Counseling</option>
                      <option value="Water Baptism">Water Baptism / Dedication</option>
                      <option value="Ministries">Volunteering in Ministry</option>
                      <option value="Giving">Tithes & Offerings Guidance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Your Message * <span className="text-neutral-400 font-normal normal-case tracking-normal">({formData.message.length}/2000)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="How can we assist or pray for you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    maxLength={2000}
                    className={`w-full p-4 rounded-xl border text-sm focus:outline-none focus:ring-1 ${errors.message ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-400' : 'border-neutral-200 focus:border-amber-500 focus:ring-amber-400'}`}
                  />
                  {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <ButtonArrow type="submit" variant="dark" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </ButtonArrow>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-light text-neutral-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Our church ministry team has received your inquiry and will be in touch with you soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', topic: 'General Inquiry', message: '' });
                  }}
                  className="text-xs text-amber-700 font-medium hover:underline pt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Contact Details & Social */}
          <div className="lg:col-span-5 space-y-6">

            {/* Direct Details Box */}
            <div className="bg-[#101217] text-white rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
                  Church Contact
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                  ✓ Official Directory
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Physical Campus:</strong>
                    <span>{churchInfo.addressLine1}</span>
                    <span className="block text-neutral-400">{churchInfo.addressLine2}</span>
                    <a
                      href={churchInfo.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2"
                    >
                      Pin on Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Contact No.:</strong>
                    <a href={`tel:${churchInfo.phone}`} className="hover:text-amber-400 transition-colors font-medium">
                      {churchInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Email Inquiries:</strong>
                    <a href={`mailto:${churchInfo.email}`} className="hover:text-amber-400 transition-colors break-all">
                      {churchInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Church Office Hours:</strong>
                    <span>{churchInfo.officeHours}</span>
                  </div>
                </div>
              </div>

              {/* Map Embed Preview */}
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-inner">
                <iframe
                  title="JCLS Location Map"
                  src="https://maps.google.com/maps?q=Jesus+Christ+Lord+and+Savior+Church+71+Hills+Street+Talanay+Area+C+Batasan+Hills+Quezon+City&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Official Verified Facebook Box */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <span className="text-xs font-semibold text-white block uppercase tracking-wider">
                  Official Facebook Page:
                </span>
                <a
                  href={churchInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-600/15 border border-blue-500/30 text-blue-300 hover:bg-blue-600/25 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FacebookIcon className="w-5 h-5 text-blue-400" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-white">Jesus Christ Lord and Savior Church</div>
                      <div className="text-[11px] text-blue-300">Quezon City Community Page</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold group-hover:translate-x-1 transition-transform">
                    Visit →
                  </span>
                </a>
              </div>
            </div>

            {/* Sunday Service & Rehearsal Schedule */}
            <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-neutral-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                Weekly Worship & Fellowship Schedule
              </span>
              <ul className="text-xs text-neutral-700 space-y-1.5 leading-relaxed">
                <li><strong className="text-neutral-900 font-semibold">• Main Service:</strong> Sunday 9:00 AM – 12:00 NN</li>
                <li><strong className="text-neutral-900 font-semibold">• Women's Ministry:</strong> 1st & 4th Sunday, 1:30 PM – 3:00 PM</li>
                <li><strong className="text-neutral-900 font-semibold">• Young Professionals:</strong> 2nd & 3rd Sunday, 1:30 PM – 3:00 PM</li>
                <li><strong className="text-neutral-900 font-semibold">• Men's Ministry:</strong> 2nd & 3rd Sunday, 1:30 PM – 3:00 PM</li>
                <li><strong className="text-neutral-900 font-semibold">• Youth Fellowship (GIMIK):</strong> Sunday, 3:00 PM – 5:00 PM</li>
                <li><strong className="text-neutral-900 font-semibold">• Children Ministry:</strong> Sunday, 10:00 AM – 11:00 AM</li>
                <li><strong className="text-neutral-900 font-semibold">• Worship Devotion:</strong> Saturday, 5:00 PM – 6:00 PM</li>
                <li><strong className="text-neutral-900 font-semibold">• Worship Rehearsal:</strong> Saturday, 6:00 PM – 9:00 PM</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

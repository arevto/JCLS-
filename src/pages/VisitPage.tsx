import React, { useState } from 'react';
import { churchInfo, serviceSchedules } from '../data/churchData';
import { submissionService } from '../services/submissionService';
import { SectionHeader } from '../components/common/SectionHeader';
import { ButtonArrow } from '../components/common/ButtonArrow';
import { MapPin, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const VisitPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceSchedules[0]?.id || '',
    partySize: '1',
    hasKids: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const selectedSchedule = serviceSchedules.find(s => s.id === formData.service);
    submissionService.addVisit({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceName: selectedSchedule ? `${selectedSchedule.name} (${selectedSchedule.time})` : 'Sunday Service',
      partySize: formData.partySize,
      hasKids: formData.hasKids
    });

    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'What should I wear to church?',
      a: 'Come as you are! You’ll see everything from casual jeans and t-shirts to smart casual attire. We care about having you with us, not what you wear.'
    },
    {
      q: 'What happens during a Sunday service?',
      a: 'Our services typically last around 90 minutes. We begin with energetic, Spirit-led contemporary praise and worship, followed by church family announcements, an inspiring and biblically grounded message, and time for personal prayer.'
    },
    {
      q: 'Is there something for my children?',
      a: 'Yes! Our JCLS Kids Ministry provides safe, fun, and age-tailored Bible lessons, crafts, and games for children from toddlers through grade 6 during our Sunday morning service.'
    },
    {
      q: 'Where do I park when I arrive?',
      a: 'Our church does not have a designated parking lot. Limited street parking may be available in front of the church, depending on local parking rules and availability. Most of our members travel by motorcycle. If you choose to park in front of the church, please park at your own risk, keep entrances and access routes clear, and follow all applicable parking and traffic regulations. We encourage everyone to exercise caution and prioritize their safety.'
    },
    {
      q: 'Will I be singled out as a visitor during the service?',
      a: 'Never! We will not put you on the spot or make you stand up. We simply want you to feel warmly welcomed and able to experience God’s presence at your own comfort level.'
    }
  ];

  return (
    <div className="bg-[#faf9f6] text-neutral-900 min-h-screen">
      
      {/* Header Banner */}
      <section className="relative py-24 sm:py-32 bg-[#090b0e] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/church-visit.jpg"
            alt="Welcome to Church"
            onError={(e) => {
              e.currentTarget.src = '/images/community-fellowship.jpg';
            }}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-400 block">
            Welcome Newcomers
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight">
            Plan Your Visit to JCLS
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Visiting a church for the first time should be an uplifting experience. Let us know you’re coming, and we’ll roll out the red carpet for you!
          </p>
        </div>
      </section>

      {/* 5-Step VIP Visitor Experience */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          align="center"
          label="Your Sunday Experience"
          title="What to Expect as Our Guest"
          subtitle="From the moment you step onto our campus in Quezon City, you are family."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-serif font-bold text-lg">
              1
            </div>
            <h3 className="font-serif text-xl font-light text-neutral-900">Warm Arrival</h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Friendly greeters welcome you at the entrance. Limited street parking is available in front of the church.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-serif font-bold text-lg">
              2
            </div>
            <h3 className="font-serif text-xl font-light text-neutral-900">VIP Host</h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Your host guides you through the lobby, helps find great seats, and answers questions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-serif font-bold text-lg">
              3
            </div>
            <h3 className="font-serif text-xl font-light text-neutral-900">Kids Check-In</h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Quick, secure registration for children to enjoy fun Bible adventures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-serif font-bold text-lg">
              4
            </div>
            <h3 className="font-serif text-xl font-light text-neutral-900">Inspiring Service</h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Passionate contemporary praise and life-giving biblical preaching.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-serif font-bold text-lg">
              5
            </div>
            <h3 className="font-serif text-xl font-light text-neutral-900">Fellowship</h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Enjoy complimentary coffee, refreshments, and meet our pastoral team.
            </p>
          </div>
        </div>

        {/* Form and Location Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: VIP Pre-Registration Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-700">
                VIP Visitor Registration
              </span>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>

            <h2 className="font-serif text-3xl font-light text-neutral-950 mb-2">
              Let Us Know You're Coming
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light mb-8">
              Fill out this quick form so our hospitality team can prepare a personal welcome packet and save your family seats.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Juan dela Cruz"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="juan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Mobile / Viber Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+63 9XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Service Choice
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500 bg-white"
                    >
                      {serviceSchedules.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.day} • {s.time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={formData.hasKids}
                      onChange={(e) => setFormData({ ...formData, hasKids: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-neutral-300"
                    />
                    <span>I will be bringing children (Request Kids Ministry Check-In)</span>
                  </label>
                </div>

                <div className="pt-4">
                  <ButtonArrow type="submit" variant="dark" className="w-full sm:w-auto">
                    Confirm Visit Reservation
                  </ButtonArrow>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-light text-neutral-900">
                  We'll See You this Sunday, {formData.name}!
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Your reservation is saved. One of our hospitality hosts will look out for you at the entrance!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-amber-700 font-medium hover:underline pt-2 cursor-pointer"
                >
                  Register another guest
                </button>
              </div>
            )}
          </div>

          {/* Right: Location & Schedules Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#101217] text-white rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
                  Campus Details
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                  ✓ Verified Campus
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-light text-white mb-2">
                  {churchInfo.name}
                </h3>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {churchInfo.addressLine1}, {churchInfo.addressLine2}
                  </span>
                </div>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-inner">
                <iframe
                  title="Jesus Christ Lord & Savior Church Location Map"
                  src="https://maps.google.com/maps?q=Jesus+Christ+Lord+and+Savior+Church+71+Hills+Street+Talanay+Area+C+Batasan+Hills+Quezon+City&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div>
                <a
                  href={churchInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs tracking-wide transition-all shadow-md active:scale-95 text-center cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps / Directions</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-3 text-xs text-neutral-300">
                <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  Weekly Worship Schedule:
                </div>
                {serviceSchedules.map((s) => (
                  <div key={s.id} className="flex items-center justify-between">
                    <span>{s.name}</span>
                    <span className="text-amber-400 font-medium">{s.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-24 max-w-4xl mx-auto">
          <SectionHeader
            align="center"
            label="Common Questions"
            title="Frequently Asked Questions"
            subtitle="Have questions before stepping through our doors? Here is what you should know."
            className="mb-12"
          />

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/70"
                  >
                    <span className="font-serif text-lg sm:text-xl font-normal text-neutral-900">
                      {faq.q}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-neutral-100 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
};

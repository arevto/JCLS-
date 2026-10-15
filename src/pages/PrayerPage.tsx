import React, { useState } from 'react';
import { ButtonArrow } from '../components/common/ButtonArrow';
import { submissionService } from '../services/submissionService';
import { CheckCircle2, Lock, Sparkles } from 'lucide-react';

export const PrayerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    category: 'Healing & Health',
    request: '',
    confidentiality: 'pastoral', // 'pastoral' or 'prayer-team'
    wantsFollowUp: false
  });

  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Healing & Health',
    'Family & Relationships',
    'Financial Breakthrough',
    'Salvation of Loved Ones',
    'Spiritual Direction & Guidance',
    'Thanksgiving & Praise'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.request.trim()) return;

    submissionService.addPrayer({
      name: formData.name || 'Anonymous',
      contact: formData.contact,
      category: formData.category,
      request: formData.request,
      confidentiality: formData.confidentiality as 'pastoral' | 'prayer-team'
    });

    setSubmitted(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      contact: '',
      category: 'Healing & Health',
      request: '',
      confidentiality: 'pastoral',
      wantsFollowUp: false
    });
  };

  return (
    <div className="bg-[#faf9f6] text-neutral-900 min-h-screen">
      
      {/* Editorial Header */}
      <section className="relative py-24 sm:py-32 bg-[#090b0e] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/prayer-ministry.jpg"
            alt="Prayer and Intercession"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-400 block">
            We Are Standing with You
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight">
            How Can We Pray for You?
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." — Philippians 4:6
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/80 shadow-xl space-y-8">
            
            <div className="space-y-3 pb-6 border-b border-neutral-100">
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 block">
                Sacred & Confidential Request
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-950">
                Share Your Request with Our Prayer Team
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Whether you need physical healing, peace over a family struggle, or wisdom for a major decision, our pastoral team and intercessors count it a privilege to bring your request before God’s throne of grace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                  Select Prayer Need Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        formData.category === cat
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prayer Request Text Area */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Your Prayer Request *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.request}
                  onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                  placeholder="Tell us what you are walking through, or share a praise report of what God has done..."
                  className="w-full p-4 rounded-2xl border border-neutral-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Optional Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Leave blank to submit anonymously"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Email or Mobile (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Provide if you'd like pastoral follow-up"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Confidentiality Options */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Confidentiality Level
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                    formData.confidentiality === 'pastoral' 
                      ? 'border-neutral-900 bg-neutral-900/[0.03]' 
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}>
                    <input
                      type="radio"
                      name="confidentiality"
                      value="pastoral"
                      checked={formData.confidentiality === 'pastoral'}
                      onChange={() => setFormData({ ...formData, confidentiality: 'pastoral' })}
                      className="mt-0.5 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="font-semibold text-neutral-900 block">Pastoral Staff Only</span>
                      <span className="text-neutral-500">Shared strictly with our senior and pastoral elders.</span>
                    </div>
                  </label>

                  <label className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                    formData.confidentiality === 'prayer-team' 
                      ? 'border-neutral-900 bg-neutral-900/[0.03]' 
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}>
                    <input
                      type="radio"
                      name="confidentiality"
                      value="prayer-team"
                      checked={formData.confidentiality === 'prayer-team'}
                      onChange={() => setFormData({ ...formData, confidentiality: 'prayer-team' })}
                      className="mt-0.5 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="font-semibold text-neutral-900 block">JCLS Intercessory Team</span>
                      <span className="text-neutral-500">Shared with our trusted church prayer warriors.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Privacy Notice Banner */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-600">
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Privacy Pledge:</strong> Your personal information and requests are handled with deep pastoral care and confidentiality. We will never share or sell your details.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">
                  * All requests receive dedicated prayer during our weekly intercession.
                </span>
                <ButtonArrow type="submit" variant="dark" size="lg">
                  Submit Prayer Request
                </ButtonArrow>
              </div>

            </form>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-neutral-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-950">
              Your Prayer Request Has Been Received
            </h2>

            <p className="text-base text-neutral-600 max-w-lg mx-auto font-light leading-relaxed">
              {formData.name ? `Dear ${formData.name}, ` : ''}our pastoral leaders and intercessors are holding your request before the Lord Jesus. You are never alone in what you are walking through.
            </p>

            {/* Scripture of Comfort */}
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 max-w-md mx-auto text-center space-y-2">
              <Sparkles className="w-5 h-5 text-amber-700 mx-auto" />
              <p className="font-serif italic text-neutral-900 text-base">
                "The Lord is near to all who call on him, to all who call on him in truth. He fulfills the desires of those who fear him; he hears their cry and saves them."
              </p>
              <span className="block text-xs font-bold tracking-wider uppercase text-amber-800">
                — Psalm 145:18–19
              </span>
            </div>

            <div className="pt-4 flex justify-center">
              <ButtonArrow onClick={handleReset} variant="dark">
                Submit Another Request
              </ButtonArrow>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};

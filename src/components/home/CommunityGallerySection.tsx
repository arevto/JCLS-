import React, { useState } from 'react';
import { churchInfo } from '../../data/churchData';
import { SectionHeader } from '../common/SectionHeader';
import { Mail, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { FacebookIcon } from '../common/SocialIcons';

export const CommunityGallerySection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  const galleryItems = [
    {
      title: 'Passionate Corporate Worship',
      caption: 'Gathering to magnify Jesus with one voice.',
      image: '/images/hero-worship.jpg',
      span: 'col-span-1 md:col-span-2'
    },
    {
      title: 'Next Gen Discipleship',
      caption: '#JCLSYoungPro fellowship and praise.',
      image: '/images/youth-ministry.jpg',
      span: 'col-span-1'
    },
    {
      title: 'Family & Fellowship',
      caption: 'Doing life together in authentic community.',
      image: '/images/community-fellowship.jpg',
      span: 'col-span-1'
    },
    {
      title: 'Kids Kingdom',
      caption: 'Planting seeds of God’s truth in young hearts.',
      image: '/images/kids-ministry.jpg',
      span: 'col-span-1'
    },
    {
      title: 'Intercession & Care',
      caption: 'Carrying one another’s burdens in earnest prayer.',
      image: '/images/prayer-ministry.jpg',
      span: 'col-span-1'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f6] text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeader
            label="Church Life & Fellowship"
            title="A Living, Loving Community"
            subtitle="Catch a glimpse of what God is doing through our family of believers in Quezon City."
          />

          <a
            href={churchInfo.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs sm:text-sm font-semibold tracking-wide hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FacebookIcon className="w-4 h-4 fill-white" />
            <span>Visit Facebook Community</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Dynamic Image Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden group shadow-md img-zoom-container ${item.span} h-64 sm:h-80`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover img-zoom brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-serif text-lg sm:text-xl font-normal leading-tight mb-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-300 font-light">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bethel-Inspired "Stay Connected" Newsletter Box */}
        <div className="rounded-3xl bg-[#0f1115] text-white p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-400 block">
              Email Updates & Encouragement
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Stay Connected with JCLS Church
            </h3>
            <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-lg mx-auto">
              Subscribe to receive weekly sermon notes, upcoming gathering notices, and pastoral encouragement directly in your inbox.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <div className="relative w-full">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/15"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-sm tracking-wide transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Thank you! You are now subscribed to JCLS Church updates.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

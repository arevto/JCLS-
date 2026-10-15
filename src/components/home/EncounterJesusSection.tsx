import React from 'react';
import { useUI } from '../../context/UIContext';
import { ArrowRight, Heart, Sparkles, Shield, Users } from 'lucide-react';

export const EncounterJesusSection: React.FC = () => {
  const { navigateTo } = useUI();

  const pathways = [
    {
      id: 'meet-jesus',
      title: 'Meet Jesus',
      subtitle: 'Discover forgiveness, salvation, and a brand new start in Christ.',
      icon: Heart,
      action: () => navigateTo('prayer')
    },
    {
      id: 'healing-prayer',
      title: 'Receive Prayer for Healing & Need',
      subtitle: 'Our pastoral and prayer teams would love to stand in agreement for you.',
      icon: Sparkles,
      action: () => navigateTo('prayer')
    },
    {
      id: 'counseling-care',
      title: 'Pastoral Care & Family Guidance',
      subtitle: 'Confidential Christ-centered encouragement for seasons of trial or transition.',
      icon: Shield,
      action: () => navigateTo('contact')
    },
    {
      id: 'life-groups',
      title: 'Belong in a Life Group',
      subtitle: 'Connect with believers in Quezon City for weekly fellowship, prayer, and study.',
      icon: Users,
      action: () => navigateTo('ministries')
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#f4efe6] text-neutral-900 border-y border-[#e5ddd0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        
        <span className="block text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-neutral-500 mb-4">
          Spiritual Care & Next Steps
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-neutral-950 leading-tight mb-6">
          Encounter Jesus
        </h2>

        <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed mb-12 max-w-xl mx-auto">
          Do you know Jesus? Do you need physical healing, emotional restoration, or spiritual renewal? God desires to transform your life with His unfailing love and power.
        </p>

        {/* Pathway Rows */}
        <div className="divide-y divide-neutral-300/80 border-y border-neutral-300/80 text-left">
          {pathways.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="py-6 sm:py-7 flex items-center justify-between gap-4 group cursor-pointer hover:bg-neutral-900/[0.03] px-4 -mx-4 rounded-xl transition-all"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-neutral-200/80 flex items-center justify-center text-amber-700 shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-900 group-hover:text-amber-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-light mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-white group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center transition-colors shadow-xs shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

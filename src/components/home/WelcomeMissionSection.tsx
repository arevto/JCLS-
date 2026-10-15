import React from 'react';
import { useUI } from '../../context/UIContext';
import { churchInfo } from '../../data/churchData';
import { ButtonArrow } from '../common/ButtonArrow';
import { Sparkles, Users, Compass } from 'lucide-react';

export const WelcomeMissionSection: React.FC = () => {
  const { navigateTo } = useUI();

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#faf9f6] text-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Statement */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <span className="block text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-neutral-500 mb-4">
            Welcome to Our Church Family
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-950 leading-[1.12]">
            {churchInfo.name} is a congregation rooted in the love of God, dedicated to making disciples and pursuing regional revival.
          </h2>
        </div>

        {/* Side-by-Side Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-800 leading-snug italic">
              "Every believer was created to belong to a community. It was never God’s heart for us to do this life alone."
            </h3>

            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              Based in {churchInfo.city}, we gather as worshippers of Jesus Christ who long to see hearts ignited by His Holy Spirit and lives transformed by His truth. Whether you are exploring faith for the first time or seeking a spiritual family to run with, there is an open seat at the table for you.
            </p>

            {/* Pillar highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-neutral-200">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-neutral-900">Spirit & Truth</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Passionate praise and sound biblical exposition.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-neutral-900">Discipleship</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Walking in the Great Commission of Matthew 28.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-neutral-900">Authentic Family</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Intergenerational community and active fellowship.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <ButtonArrow onClick={() => navigateTo('about')} variant="dark">
                About Our Church & Mission
              </ButtonArrow>

              <ButtonArrow onClick={() => navigateTo('about')} variant="sand">
                Our Statement of Faith
              </ButtonArrow>
            </div>
          </div>

          {/* Right Column: High Quality Encounter Photo Block */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group img-zoom-container">
              <img
                src="/images/community-fellowship.jpg"
                alt="Church Community Fellowship"
                className="w-full h-[460px] sm:h-[540px] object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-amber-300 block mb-1">
                  Fellowship & Community Life
                </span>
                <p className="font-serif text-xl sm:text-2xl font-light leading-snug">
                  Experience genuine fellowship where you are known, loved, and encouraged to grow.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

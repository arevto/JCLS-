import React from 'react';
import { useUI } from '../../context/UIContext';
import { serviceSchedules } from '../../data/churchData';
import { SectionHeader } from '../common/SectionHeader';
import { ButtonArrow } from '../common/ButtonArrow';
import { Clock, MapPin, Video, Car, Coffee, Users } from 'lucide-react';

export const ServiceTimesSection: React.FC = () => {
  const { openPlanVisit } = useUI();

  return (
    <section className="py-20 sm:py-28 bg-[#101217] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeader
            theme="dark"
            label="Service Times & Location"
            title="Gather with Us this Week"
            subtitle="Everyone is welcome. We gather weekly to praise Jesus Christ, sit under sound biblical preaching, and encourage one another."
          />

          <div className="shrink-0 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
              ✓ Official Weekly Schedule
            </span>
            <ButtonArrow onClick={openPlanVisit} variant="white" size="sm">
              Plan Your Visit
            </ButtonArrow>
          </div>
        </div>

        {/* Schedule Cards Grid - 4 Columns for 4 Gatherings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {serviceSchedules.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 transition-all hover:-translate-y-1 group relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
                    {service.day}
                  </span>
                  {service.isOnlineStreamed && (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Video className="w-3 h-3" /> Livestreamed
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-light text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {service.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-neutral-300 font-medium mb-4">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{service.time}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{service.location}</span>
                </div>
                <button
                  onClick={openPlanVisit}
                  className="text-amber-400 hover:text-amber-300 font-medium group-hover:underline cursor-pointer"
                >
                  Join us →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Visitor Expectations Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block mb-1">
                Visiting For The First Time?
              </span>
              <h4 className="font-serif text-2xl font-light text-white">
                What You Can Expect
              </h4>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-0.5">Warm Welcome</h5>
                  <p className="text-neutral-400 leading-relaxed">Relaxed atmosphere, friendly hosts, and warm fellowship.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-0.5">Kids Ministry</h5>
                  <p className="text-neutral-400 leading-relaxed">Fun, secure, and Christ-centered classes during Sunday morning.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-0.5">Easy Access</h5>
                  <p className="text-neutral-400 leading-relaxed">Parking assistance and convenient transit in Quezon City.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

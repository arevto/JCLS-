import React, { useState } from 'react';
import { churchInfo, coreValues, beliefsData, leadershipTeam } from '../data/churchData';
import { useUI } from '../context/UIContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { ButtonArrow } from '../components/common/ButtonArrow';
import { ChevronDown, ChevronUp, BookOpen, User } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openPlanVisit } = useUI();
  const [openBeliefs, setOpenBeliefs] = useState<Record<string, boolean>>({
    'truth-1': true,
    'truth-2': true,
    'truth-3': true
  });

  const toggleBelief = (id: string) => {
    setOpenBeliefs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    beliefsData.forEach(b => { all[b.id] = true; });
    setOpenBeliefs(all);
  };

  const collapseAll = () => {
    setOpenBeliefs({});
  };

  return (
    <div className="bg-[#faf9f6] text-neutral-900 min-h-screen">
      
      {/* Editorial Page Hero */}
      <section className="relative py-24 sm:py-32 bg-[#0d0f12] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/church-about.jpg"
            alt="JCLS Church"
            onError={(e) => {
              e.currentTarget.src = '/images/hero-worship.jpg';
            }}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-[#0d0f12]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-400 block">
            Who We Are
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight">
            Rooted in Christ. Built on Truth. Passionate for Revival.
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Discover the heart, vision, and biblical foundations behind {churchInfo.name} in {churchInfo.city}.
          </p>
        </div>
      </section>

      {/* Vision & Mission Highlight */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500">
              Our Calling & Heartbeat
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-neutral-950 leading-[1.15]">
              Empowering believers to walk as authentic disciples of Jesus Christ.
            </h2>
            <p className="text-base text-neutral-600 font-light leading-relaxed">
              At {churchInfo.name}, our supreme aim is to glorify Jesus Christ. We are not just holding weekly services—we are cultivating a spiritual home where individuals encounter God's tangible presence, discover biblical truth, and are equipped to minister in their homes, campuses, and workplaces.
            </p>

            {/* Scripture Callout */}
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-neutral-800">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-800 block mb-2">
                Our Foundation Scripture • {churchInfo.themeScripture.reference}
              </span>
              <p className="font-serif italic text-lg text-neutral-900 leading-snug">
                "{churchInfo.themeScripture.verse}"
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl img-zoom-container">
              <img
                src="/images/church-community.jpg"
                alt="JCLS Church Community"
                onError={(e) => {
                  e.currentTarget.src = '/images/community-fellowship.jpg';
                }}
                className="w-full h-[480px] object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-300 block mb-1">
                  Our Community
                </span>
                <p className="font-serif text-2xl font-light">
                  A multi-generational household of worshippers in {churchInfo.city}.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 sm:py-28 bg-[#101217] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            theme="dark"
            align="center"
            label="What Guides Us"
            title="Our Core Values"
            subtitle="These convictions shape how we worship, lead, build relationships, and minister to our city."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 font-serif text-lg font-semibold border border-amber-500/20">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-2xl font-light text-white mb-1">
                  {val.title}
                </h3>
                <span className="text-xs text-amber-400 font-medium tracking-wide uppercase block mb-3">
                  {val.subtitle}
                </span>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Leadership & Pastoral Team */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <SectionHeader
            label="Pastoral Shepherds"
            title="Leadership Team"
            subtitle="Servant leaders committed to teaching God's Word, praying for the flock, and equipping the church."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadershipTeam.map((leader) => (
            <div
              key={leader.id}
              className="rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-md hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-neutral-200">
                {leader.image ? (
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const next = target.nextElementSibling as HTMLElement;
                      if (next) next.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Neutral placeholder shown when photo is not yet uploaded */}
                <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 items-center justify-center" style={{ display: 'none' }}>
                  <User className="w-16 h-16 text-neutral-400" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6 flex-1 space-y-2">
                <h3 className="font-serif text-xl font-light text-neutral-900 group-hover:text-amber-800 transition-colors">
                  {leader.name}
                </h3>
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-700 block">
                  {leader.role}
                </span>
                <p className="text-xs text-neutral-500 font-light leading-relaxed pt-1">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statement of Faith / The 16 Fundamental Truths */}
      <section className="py-20 sm:py-28 bg-[#faf9f6] border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            label="Assemblies of God Heritage & Doctrine"
            title="The 16 Fundamental Truths of the Assemblies of God"
            subtitle="Our unswerving doctrinal foundation rooted in the Holy Scriptures, guiding our faith, worship, discipleship, and mission at Jesus Christ Lord & Savior Church in Batasan Hills."
            className="mb-8"
          />

          <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>16 Core Doctrinal Statements</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={expandAll}
                className="text-amber-800 hover:text-amber-900 font-semibold underline underline-offset-2 cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-neutral-300">•</span>
              <button
                onClick={collapseAll}
                className="text-neutral-500 hover:text-neutral-700 font-medium cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {beliefsData.map((belief) => {
              const isOpen = !!openBeliefs[belief.id];
              return (
                <div
                  key={belief.id}
                  className="rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleBelief(belief.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/80 transition-colors"
                  >
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-900">
                        {belief.topic}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1">
                        {belief.summary}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-neutral-100 bg-neutral-50/50 space-y-3">
                      <p className="text-sm text-neutral-700 font-light leading-relaxed">
                        {belief.details}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                          Scriptures:
                        </span>
                        {belief.scriptureReferences.map((ref, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 font-medium"
                          >
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 bg-amber-500/10 border-t border-amber-500/20 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-950">
            We Would Love to Meet You in Person
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Plan your visit to our next Sunday gathering in {churchInfo.city}. We can't wait to welcome you into our family!
          </p>
          <div className="pt-2">
            <ButtonArrow onClick={openPlanVisit} variant="dark">
              Plan Your Visit This Sunday
            </ButtonArrow>
          </div>
        </div>
      </section>

    </div>
  );
};

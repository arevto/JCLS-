import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { WelcomeMissionSection } from '../components/home/WelcomeMissionSection';
import { ServiceTimesSection } from '../components/home/ServiceTimesSection';
import { FeaturedSermonSection } from '../components/home/FeaturedSermonSection';
import { MinistriesPreviewSection } from '../components/home/MinistriesPreviewSection';
import { UpcomingEventsSection } from '../components/home/UpcomingEventsSection';
import { EncounterJesusSection } from '../components/home/EncounterJesusSection';
import { CommunityGallerySection } from '../components/home/CommunityGallerySection';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WelcomeMissionSection />
      <ServiceTimesSection />
      <FeaturedSermonSection />
      <MinistriesPreviewSection />
      <UpcomingEventsSection />
      <EncounterJesusSection />
      <CommunityGallerySection />
    </main>
  );
};

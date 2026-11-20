import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import AboutPreview from '@/components/sections/AboutPreview';
import ServicesGrid from '@/components/sections/ServicesGrid';
import FounderSection from '@/components/sections/FounderSection';
import PlatformsSection from '@/components/sections/PlatformsSection';
import CtaBanner from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'EDU YODHA LLP | Education & Technology Company',
  description:
    'EDU YODHA LLP is an Indian education and technology company focused on building opportunities through digital learning, skill development, internships, and innovative technology solutions.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ServicesGrid />
      <FounderSection />
      <PlatformsSection />
      <CtaBanner />
    </>
  );
}

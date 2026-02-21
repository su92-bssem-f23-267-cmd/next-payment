import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Rank Boost Pro – Affordable SEO Solutions to Boost Your Rankings',
  description:
    'Professional SEO plans starting at $10/mo. Keyword research, backlinks, on-page optimization, and more. Rank higher on Google today.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PricingSection />
      <ContactSection />
    </>
  );
}

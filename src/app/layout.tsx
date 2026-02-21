import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Rank Boost Pro – Affordable SEO Solutions',
    template: '%s | Rank Boost Pro',
  },
  description:
    'Rank Boost Pro offers affordable, results-driven SEO solutions to skyrocket your website rankings. Choose from 5 tailored SEO plans.',
  keywords: ['SEO', 'search engine optimization', 'rank boost', 'backlinks', 'organic traffic'],
  openGraph: {
    title: 'Rank Boost Pro – Affordable SEO Solutions',
    description: 'Boost your online rankings with professional SEO services starting at just $10/mo.',
    type: 'website',
    siteName: 'Rank Boost Pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rank Boost Pro',
    description: 'Affordable SEO Solutions to Boost Your Rankings',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

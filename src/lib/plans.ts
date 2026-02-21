export interface Plan {
  slug: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    slug: 'starter',
    name: 'Starter Spark',
    price: 10,
    description: 'Perfect for small businesses just starting their SEO journey.',
    features: [
      '5 Target Keywords',
      'On-Page SEO Audit',
      'Google My Business Setup',
      'Monthly Report',
      'Email Support',
    ],
  },
  {
    slug: 'growth',
    name: 'Growth Engine',
    price: 20,
    description: 'Ideal for growing businesses ready to scale their online presence.',
    features: [
      '15 Target Keywords',
      'Technical SEO Audit',
      'Backlink Building (5/mo)',
      'Content Optimization',
      'Bi-weekly Reports',
      'Priority Email Support',
    ],
  },
  {
    slug: 'pro',
    name: 'Pro Ranker',
    price: 40,
    description: 'Our most popular plan for serious businesses wanting top rankings.',
    features: [
      '30 Target Keywords',
      'Full Technical SEO',
      'Backlink Building (15/mo)',
      'Blog Content (2/mo)',
      'Competitor Analysis',
      'Weekly Reports',
      'Chat & Email Support',
    ],
    popular: true,
  },
  {
    slug: 'business',
    name: 'Business Dominator',
    price: 80,
    description: 'Comprehensive SEO domination for established businesses.',
    features: [
      '60 Target Keywords',
      'Advanced Technical SEO',
      'Backlink Building (30/mo)',
      'Blog Content (4/mo)',
      'Local SEO Optimization',
      'Schema Markup',
      'Daily Reports',
      'Dedicated Account Manager',
    ],
  },
  {
    slug: 'ultimate',
    name: 'Ultimate Authority',
    price: 100,
    description: 'Maximum authority — the complete SEO powerhouse package.',
    features: [
      'Unlimited Keywords',
      'Enterprise Technical SEO',
      'Backlink Building (60/mo)',
      'Blog Content (8/mo)',
      'National & Local SEO',
      'Video SEO & Schema',
      'Real-time Dashboard',
      'Dedicated SEO Team',
      '24/7 Priority Support',
    ],
  },
];

export function getPlanBySlug(slug: string): Plan | undefined {
  return PLANS.find((p) => p.slug === slug);
}

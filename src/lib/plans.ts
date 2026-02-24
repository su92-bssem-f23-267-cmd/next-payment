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
    name: 'Starter SEO',
    price: 100,
    description: 'Entry-level SEO support for small businesses and startups.',
    features: [
      '10 Target Keywords',
      'On-Page SEO Audit',
      'Google My Business Setup',
      'Monthly Ranking Reports',
      'Email Support',
    ],
  },
  {
    slug: 'growth',
    name: 'Growth SEO',
    price: 110,
    description: 'Accelerate your online presence with professional optimization.',
    features: [
      '25 Target Keywords',
      'Technical SEO Audit',
      'Backlink Building (10/mo)',
      'Content Strategy',
      'Bi-weekly Reports',
      'Priority Email Support',
    ],
  },
  {
    slug: 'advanced',
    name: 'Advanced SEO',
    price: 120,
    description: 'Comprehensive SEO strategy for medium to large enterprises.',
    features: [
      '50 Target Keywords',
      'Advanced Technical SEO',
      'Backlink Building (25/mo)',
      'Core Web Vitals Optimization',
      'Competitor Analysis',
      'Weekly Reports',
      'Chat & Email Support',
    ],
  },
  {
    slug: 'professional',
    name: 'Professional Ranker',
    price: 130,
    description: 'High-tier strategy for competitive markets.',
    features: [
      '75 Target Keywords',
      'Custom Content Plan',
      'Backlink Building (40/mo)',
      'Schema Markup Implementation',
      'In-depth Keyword Research',
      'Dedicated Account Manager',
    ],
    popular: true,
  },
  {
    slug: 'elite',
    name: 'Elite Market Leader',
    price: 140,
    description: 'Dominate your niche with elite authority building.',
    features: [
      '100 Target Keywords',
      'Premium PR Backlinks',
      'Monthly Content Assets',
      'Local & International SEO',
      'Conversion Rate Optimization',
      '24/7 Priority Support',
    ],
  },
  {
    slug: 'authority',
    name: 'Authority Builder',
    price: 150,
    description: 'Scale your business globally with massive SEO power.',
    features: [
      '200 Target Keywords',
      'Global Backlink Strategy',
      'Multi-language SEO Support',
      'Advanced Data Analytics',
      'Quarterly Strategy Sessions',
      'Dedicated SEO Team',
    ],
  },
  {
    slug: 'dominator',
    name: 'Ultimate Dominator',
    price: 160,
    description: 'The absolute pinnacle of SEO authority and market control.',
    features: [
      'Unlimited Keywords',
      'Enterprise-Grade Links',
      'Full Site Content Management',
      'PPC & SEO Synergy',
      'Real-time Dashboard Access',
      'VIP Dedicated Account Lead',
    ],
  },
];

export function getPlanBySlug(slug: string): Plan | undefined {
  return PLANS.find((p) => p.slug === slug);
}

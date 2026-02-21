import Link from 'next/link';
import { PLANS } from '@/lib/plans';

const PLAN_ICONS = ['⚡', '🚀', '💎', '🏆', '👑'];

export default function PricingSection() {
    return (
        <section className="section pricing" id="pricing">
            <div className="container">
                <h2 className="section-title">Choose Your SEO Plan</h2>
                <p className="section-subtitle">
                    Transparent, results-driven pricing. No hidden fees. Cancel anytime.
                </p>

                <div className="pricing-grid">
                    {PLANS.map((plan, idx) => (
                        <Link
                            key={plan.slug}
                            href={`/checkout/${plan.slug}`}
                            className={`pricing-card ${plan.popular ? 'is-popular' : ''}`}
                            aria-label={`Select ${plan.name} plan for $${plan.price}/mo`}
                        >
                            {plan.popular && <span className="popular-badge">Most Popular</span>}

                            <div className="plan-icon">{PLAN_ICONS[idx]}</div>
                            <h3 className="plan-name">{plan.name}</h3>
                            <p className="plan-desc">{plan.description}</p>

                            <div className="plan-price">
                                <span className="currency">$</span>
                                <span className="amount">{plan.price}</span>
                                <span className="period">/mo</span>
                            </div>

                            <ul className="plan-features" aria-label={`${plan.name} features`}>
                                {plan.features.map((feature) => (
                                    <li key={feature}>
                                        <span className="check">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <span className="plan-btn">Get Started →</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

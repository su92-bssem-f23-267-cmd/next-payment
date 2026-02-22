import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PLANS, getPlanBySlug } from '@/lib/plans';

interface PageProps {
    params: Promise<{ plan: string }>;
}

export async function generateStaticParams() {
    return PLANS.map((plan) => ({ plan: plan.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { plan: slug } = await params;
    const plan = getPlanBySlug(slug);

    if (!plan) {
        return { title: 'Plan Not Found' };
    }

    return {
        title: `${plan.name} – $${plan.price}/mo | Checkout`,
        description: `Purchase the ${plan.name} SEO plan for $${plan.price}/month. ${plan.description}`,
    };
}

export default async function CheckoutPage({ params }: PageProps) {
    const { plan: slug } = await params;
    const plan = getPlanBySlug(slug);

    if (!plan) {
        notFound();
    }

    return (
        <div className="checkout-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
                    <ol style={{ listStyle: 'none', display: 'flex', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        <li><Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link></li>
                        <li style={{ opacity: 0.5 }}>›</li>
                        <li><Link href="/#pricing" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Plans</Link></li>
                        <li style={{ opacity: 0.5 }}>›</li>
                        <li style={{ color: 'var(--text-primary)' }}>{plan.name}</li>
                    </ol>
                </nav>

                <div className="checkout-grid">
                    {/* Left: Plan Details */}
                    <div>
                        <div className="checkout-header">
                            <h1>Complete Your Order</h1>
                            <p>You&apos;re one step away from boosting your SEO rankings.</p>
                        </div>

                        {/* Features */}
                        <div className="checkout-features">
                            <h3>✨ What&#39;s Included in {plan.name}</h3>
                            <ul className="checkout-feature-list">
                                {plan.features.map((feature) => (
                                    <li key={feature}>
                                        <span className="check">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Why us */}
                        <div
                            className="checkout-features"
                            style={{ marginTop: '1.25rem', background: 'rgba(79,142,247,0.05)', borderColor: 'rgba(79,142,247,0.2)' }}
                        >
                            <h3 style={{ color: 'var(--accent-primary)' }}>🔒 Purchase Guarantee</h3>
                            <ul className="checkout-feature-list">
                                <li><span className="check">✓</span>30-day satisfaction guarantee</li>
                                <li><span className="check">✓</span>Cancel anytime, no lock-in</li>
                                <li><span className="check">✓</span>Dedicated account manager</li>
                                <li><span className="check">✓</span>Transparent monthly reporting</li>
                            </ul>
                        </div>

                        {/* Back link */}
                        <Link
                            href="/#pricing"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                        >
                            ← Back to All Plans
                        </Link>
                    </div>

                    {/* Right: Order Summary */}
                    <div>
                        <div className="order-summary">
                            <h3>📋 Order Summary</h3>

                            <div className="order-plan-name">{plan.name}</div>
                            <p className="order-plan-desc">{plan.description}</p>

                            <div className="order-line">
                                <span className="label">Plan</span>
                                <span className="value">{plan.name}</span>
                            </div>
                            <div className="order-line">
                                <span className="label">Billing cycle</span>
                                <span className="value">Monthly</span>
                            </div>
                            <div className="order-line">
                                <span className="label">Setup fee</span>
                                <span className="value" style={{ color: 'var(--accent-green)' }}>Free</span>
                            </div>

                            <div className="order-total">
                                <span className="total-label">Total / month</span>
                                <span className="total-price">${plan.price}</span>
                            </div>

                            <Link href={`/payment?plan=${plan!.slug}`} className="checkout-proceed-btn">
                                Proceed to Payment →
                            </Link>

                            <div className="checkout-guarantees">
                                <div className="guarantee-item">🔒 SSL Secured</div>
                                <div className="guarantee-item">💳 Safe Checkout</div>
                                <div className="guarantee-item">📞 24/7 Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

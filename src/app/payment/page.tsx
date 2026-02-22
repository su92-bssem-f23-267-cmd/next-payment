'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PLANS, getPlanBySlug } from '@/lib/plans';

function PaymentForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const planSlug = searchParams.get('plan') || '';
    const plan = getPlanBySlug(planSlug);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // If no valid plan in query, show selector
    const [selectedSlug, setSelectedSlug] = useState(planSlug || 'starter');
    const activePlan = plan || getPlanBySlug(selectedSlug);

    useEffect(() => {
        if (!plan && planSlug) {
            router.replace('/payment?plan=starter');
        }
    }, [plan, planSlug, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !activePlan) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/payment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planSlug: activePlan.slug,
                    planName: activePlan.name,
                    planPrice: activePlan.price,
                    customerEmail: email,
                    customerName: name,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.checkoutUrl) {
                setError(data.error || 'Payment failed. Please try again.');
                setLoading(false);
                return;
            }

            // Redirect to ObliqPay checkout
            window.location.href = data.checkoutUrl;
        } catch {
            setError('Network error. Please check your connection and try again.');
            setLoading(false);
        }
    };

    return (
        <div className="payment-page">
            <div className="container">
                <div className="payment-wrapper">

                    {/* Left: Form */}
                    <div className="payment-form-card">
                        <div className="payment-form-header">
                            <span className="payment-step-badge">Step 2 of 2</span>
                            <h1>Complete Your Payment</h1>
                            <p>Enter your details to proceed to our secure payment gateway.</p>
                        </div>

                        {/* Plan selector (if no plan in URL) */}
                        {!plan && (
                            <div className="payment-plan-select">
                                <label>Select Plan</label>
                                <select
                                    value={selectedSlug}
                                    onChange={(e) => setSelectedSlug(e.target.value)}
                                    className="payment-select"
                                >
                                    {PLANS.map((p) => (
                                        <option key={p.slug} value={p.slug}>
                                            {p.name} — ${p.price}/mo
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="payment-form" noValidate>
                            <div className="form-group">
                                <label htmlFor="customer-name">Full Name</label>
                                <input
                                    id="customer-name"
                                    type="text"
                                    placeholder="Your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-input"
                                    autoComplete="name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="customer-email">
                                    Email Address <span style={{ color: 'var(--accent-primary)' }}>*</span>
                                </label>
                                <input
                                    id="customer-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="form-input"
                                    autoComplete="email"
                                />
                                <span className="form-hint">Your receipt will be sent to this email</span>
                            </div>

                            {error && (
                                <div className="payment-error">
                                    <span>⚠️</span> {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="checkout-proceed-btn"
                                disabled={loading || !email}
                                style={{ opacity: loading || !email ? 0.7 : 1, cursor: loading || !email ? 'not-allowed' : 'pointer' }}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner" /> Redirecting to Payment…
                                    </>
                                ) : (
                                    <>🔐 Pay ${activePlan?.price} Securely</>
                                )}
                            </button>

                            <div className="checkout-guarantees" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                                <div className="guarantee-item">🔒 256-bit SSL</div>
                                <div className="guarantee-item">💳 ObliqPay Secured</div>
                                <div className="guarantee-item">✅ Instant Access</div>
                            </div>
                        </form>

                        <Link href={activePlan ? `/checkout/${activePlan.slug}` : '/#pricing'} className="back-link">
                            ← Back to Order Summary
                        </Link>
                    </div>

                    {/* Right: Order summary */}
                    <div className="payment-summary-card">
                        <h3>📋 Order Summary</h3>
                        <div className="order-plan-name">{activePlan?.name}</div>
                        <p className="order-plan-desc">{activePlan?.description}</p>

                        <div className="order-line">
                            <span className="label">Plan</span>
                            <span className="value">{activePlan?.name}</span>
                        </div>
                        <div className="order-line">
                            <span className="label">Billing</span>
                            <span className="value">Monthly</span>
                        </div>
                        <div className="order-line">
                            <span className="label">Setup Fee</span>
                            <span className="value" style={{ color: 'var(--accent-green)' }}>Free</span>
                        </div>

                        <div className="order-total">
                            <span className="total-label">Total / month</span>
                            <span className="total-price">${activePlan?.price}</span>
                        </div>

                        {/* Contact fallback */}
                        <div className="payment-contact" style={{ marginTop: '1.5rem' }}>
                            <h4>💬 Need Help?</h4>
                            <div className="payment-contact-items">
                                <div className="payment-contact-item">
                                    <span className="icon">✉️</span>
                                    <a href="mailto:Toniaflora2024@gmail.com">Toniaflora2024@gmail.com</a>
                                </div>
                                <div className="payment-contact-item">
                                    <span className="icon">💬</span>
                                    <a href="https://t.me/+12798007315" target="_blank" rel="noopener noreferrer">
                                        Telegram: +1 (279) 800-7315
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="payment-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Loading payment form…</p>
            </div>
        }>
            <PaymentForm />
        </Suspense>
    );
}

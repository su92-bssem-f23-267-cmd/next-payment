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
                    planPrice: (activePlan.price * 1.2).toFixed(2),
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

                    {/* Left: Billing & Method */}
                    <div className="payment-form-card">
                        <div className="payment-form-header">
                            <span className="payment-step-badge">Step 2 of 2</span>
                            <h1>Payment Information</h1>
                            <p>Complete your billing details to proceed to secure checkout.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="payment-form" noValidate>
                            {/* Billing Section */}
                            <div className="payment-section-group">
                                <h3 className="section-subtitle-small">👤 Billing Information</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="customer-name">Full Name</label>
                                        <input
                                            id="customer-name"
                                            type="text"
                                            placeholder="John Doe"
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
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="form-input"
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Preview (Redirect Notice) */}
                            <div className="payment-section-group" style={{ marginTop: '1.5rem' }}>
                                <h3 className="section-subtitle-small">💳 Secure Payment Method</h3>
                                <div className="payment-method-selector active">
                                    <div className="method-info">
                                        <div className="method-icon">🏦</div>
                                        <div className="method-text">
                                            <span className="method-title">Secure Payment Gateway</span>
                                            <span className="method-desc">Pay via Credit Card, Crypto, or Net Banking</span>
                                        </div>
                                    </div>
                                    <div className="method-badge">Selected</div>
                                </div>
                                <p className="payment-notice">
                                    🔒 You will be redirected to an encrypted portal to complete your transaction securely.
                                </p>
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
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner" /> Securely Redirecting...
                                    </>
                                ) : (
                                    <>Proceed to Secure Payment →</>
                                )}
                            </button>

                            <div className="checkout-guarantees" style={{ justifyContent: 'center', marginTop: '1.25rem' }}>
                                <div className="guarantee-item">🛡️ 256-bit Encryption</div>
                                <div className="guarantee-item">🔒 PCI-DSS Compliant</div>
                                <div className="guarantee-item">✅ Verified Merchant</div>
                            </div>
                        </form>

                        <div className="payment-support-links">
                            <Link href={activePlan ? `/checkout/${activePlan.slug}` : '/#pricing'} className="back-link">
                                ← Back to Order Summary
                            </Link>
                        </div>
                    </div>

                    {/* Right: Order summary */}
                    <div className="payment-summary-card">
                        <div className="summary-header">
                            <h3>📋 Order Summary</h3>
                            <button className="summary-edit-btn" onClick={() => router.push('/#pricing')}>Edit</button>
                        </div>

                        <div className="summary-plan-blob">
                            <div className="summary-plan-info">
                                <span className="plan-name-label">{activePlan?.name}</span>
                                <span className="plan-cycle">Billed Monthly</span>
                            </div>
                            <span className="plan-price-label">${activePlan?.price}</span>
                        </div>

                        <div className="summary-details">
                            <div className="summary-line">
                                <span>Subtotal</span>
                                <span>${activePlan?.price}.00</span>
                            </div>
                            <div className="summary-line">
                                <span>Tax (20%)</span>
                                <span>${activePlan ? (activePlan.price * 0.2).toFixed(2) : '0.00'}</span>
                            </div>
                            <div className="summary-total">
                                <span>Amount due today</span>
                                <span className="total-value">${activePlan ? (activePlan.price * 1.2).toFixed(2) : '0.00'}</span>
                            </div>
                        </div>

                        <div className="trust-badges-grid">
                            <div className="trust-badge">
                                <span className="badge-icon">⭐</span>
                                <span className="badge-text">5.0 / 5 Rating</span>
                            </div>
                            <div className="trust-badge">
                                <span className="badge-icon">💎</span>
                                <span className="badge-text">Premium Service</span>
                            </div>
                        </div>

                        {/* Contact info within summary for easy access */}
                        <div className="summary-help">
                            <p>Need assistance? Contact our 24/7 billing support team.</p>
                            <a href="mailto:support@rankboostpro.com" className="help-link">support@rankboostpro.com</a>
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

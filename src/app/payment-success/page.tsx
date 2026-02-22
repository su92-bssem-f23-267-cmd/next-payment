import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Payment Successful | Rank Boost Pro',
    description: 'Your payment was successful. Your SEO plan is now active.',
};

export default function PaymentSuccessPage() {
    return (
        <div className="payment-page">
            <div className="container">
                <div className="payment-card">
                    <span className="payment-icon">🎉</span>
                    <h1 style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        Payment Successful!
                    </h1>
                    <p>
                        Thank you for choosing <strong>Rank Boost Pro</strong>. Your SEO plan is now
                        active and our team will reach out within 24 hours to get started.
                    </p>

                    <div className="payment-contact">
                        <h4>📬 What Happens Next?</h4>
                        <div className="payment-contact-items">
                            <div className="payment-contact-item">
                                <span className="icon">📧</span>
                                <span>Check your email for your receipt and onboarding details.</span>
                            </div>
                            <div className="payment-contact-item">
                                <span className="icon">💬</span>
                                <span>Our team will contact you on Telegram within 24 hours.</span>
                            </div>
                            <div className="payment-contact-item">
                                <span className="icon">🚀</span>
                                <span>Your SEO campaign begins within 48 hours of onboarding.</span>
                            </div>
                        </div>
                    </div>

                    <div className="payment-contact">
                        <h4>📞 Contact Us</h4>
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

                    <div className="payment-actions">
                        <Link href="/" className="btn btn-primary">🏠 Back to Home</Link>
                        <Link href="/#pricing" className="btn btn-outline">View Other Plans</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Payment Method Coming Soon',
    description: 'Our secure payment gateway is currently under development. Contact us to complete your order.',
};

export default function PaymentPage() {
    return (
        <div className="payment-page">
            <div className="container">
                <div className="payment-card">
                    <span className="payment-icon">🔐</span>

                    <h1>Payment Method Coming Soon</h1>

                    <p>
                        Our secure payment gateway is currently under development.
                        Please contact us directly to complete your order — we&apos;ll guide
                        you through the process manually.
                    </p>

                    {/* Contact details */}
                    <div className="payment-contact">
                        <h4>📞 Contact Us To Complete Your Order</h4>
                        <div className="payment-contact-items">
                            <div className="payment-contact-item">
                                <span className="icon">✉️</span>
                                <span>Email:&nbsp;</span>
                                <a href="mailto:Toniaflora2024@gmail.com">Toniaflora2024@gmail.com</a>
                            </div>
                            <div className="payment-contact-item">
                                <span className="icon">💬</span>
                                <span>Telegram:&nbsp;</span>
                                <a href="https://t.me/+12798007315" target="_blank" rel="noopener noreferrer">
                                    +1 (279) 800-7315
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="payment-actions">
                        <Link href="/" className="btn btn-primary">
                            🏠 Back to Home
                        </Link>
                        <Link href="/#pricing" className="btn btn-outline">
                            View All Plans
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

import Link from 'next/link';
import { PLANS } from '@/lib/plans';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand">
                        <h2>
                            Rank <span>Boost Pro</span>
                        </h2>
                        <p>
                            Affordable, results-driven SEO solutions for businesses of all sizes.
                            Helping you rank higher and grow faster.
                        </p>
                    </div>

                    {/* Plans */}
                    <div className="footer-col">
                        <h4>Our Plans</h4>
                        <ul>
                            {PLANS.map((plan) => (
                                <li key={plan.slug}>
                                    <Link href={`/checkout/${plan.slug}`}>
                                        {plan.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul>
                            <li>
                                <a href="mailto:Toniaflora2024@gmail.com">
                                    ✉️ Toniaflora2024@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="https://t.me/+12798007315" target="_blank" rel="noopener noreferrer">
                                    💬 Telegram: +1 (279) 800-7315
                                </a>
                            </li>
                            <li>
                                <span>⏰ Mon–Sat, 9am–6pm UTC</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {currentYear} Rank Boost Pro. All rights reserved.</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Professional SEO Services | Results Guaranteed
                    </p>
                </div>
            </div>
        </footer>
    );
}

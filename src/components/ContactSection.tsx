export default function ContactSection() {
    return (
        <section className="section contact" id="contact">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-subtitle">
                    Have questions? Our SEO experts are ready to help you grow your business.
                </p>

                <div className="contact-grid">
                    {/* Contact info */}
                    <div className="contact-info">
                        <h3>Contact Information</h3>
                        <p>
                            Reach out to us directly via email or Telegram. We respond quickly
                            and are happy to guide you to the right SEO plan for your needs.
                        </p>

                        <div className="contact-items">
                            <div className="contact-item">
                                <div className="contact-icon">✉️</div>
                                <div className="contact-item-text">
                                    <span className="contact-item-label">Email</span>
                                    <a
                                        href="mailto:Toniaflora2024@gmail.com"
                                        className="contact-item-value"
                                        style={{ color: 'inherit', textDecoration: 'none' }}
                                    >
                                        Toniaflora2024@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">💬</div>
                                <div className="contact-item-text">
                                    <span className="contact-item-label">Telegram</span>
                                    <a
                                        href="https://t.me/+12798007315"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-item-value"
                                        style={{ color: 'inherit', textDecoration: 'none' }}
                                    >
                                        +1 (279) 800-7315
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">⏰</div>
                                <div className="contact-item-text">
                                    <span className="contact-item-label">Response Time</span>
                                    <span className="contact-item-value">Within 24 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tips card */}
                    <div className="contact-card">
                        <h3>Why Choose Rank Boost Pro?</h3>
                        <div className="tip-item">
                            <span className="tip-icon">📈</span>
                            <div className="tip-text">
                                <h4>Proven Results</h4>
                                <p>Average 5x traffic growth within 3 months of SEO work.</p>
                            </div>
                        </div>
                        <div className="tip-item">
                            <span className="tip-icon">🔍</span>
                            <div className="tip-text">
                                <h4>Data-Driven Strategy</h4>
                                <p>Every decision backed by keyword research and competitor analysis.</p>
                            </div>
                        </div>
                        <div className="tip-item">
                            <span className="tip-icon">🛡️</span>
                            <div className="tip-text">
                                <h4>White-Hat SEO Only</h4>
                                <p>Safe, Google-compliant techniques for long-term ranking stability.</p>
                            </div>
                        </div>
                        <div className="tip-item">
                            <span className="tip-icon">💰</span>
                            <div className="tip-text">
                                <h4>Affordable Pricing</h4>
                                <p>Enterprise-quality SEO starting at just $10/month.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className="navbar" style={scrolled ? { background: 'rgba(10,14,26,0.98)' } : {}}>
            <div className="container navbar-inner">
                {/* Brand */}
                <Link href="/" className="navbar-brand">
                    <div className="navbar-logo">R</div>
                    <span className="navbar-name">
                        Rank <span>Boost Pro</span>
                    </span>
                </Link>

                {/* Nav links */}
                <nav aria-label="Main navigation">
                    <ul className="navbar-nav">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <a href="#pricing">Pricing</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </nav>

                {/* CTA */}
                <a href="#pricing" className="btn btn-primary navbar-cta">
                    View Plans
                </a>
            </div>
        </header>
    );
}

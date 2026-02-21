import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="notfound-page">
            <div className="container">
                <div className="notfound-content">
                    <div className="notfound-number">404</div>
                    <h2>Page Not Found</h2>
                    <p>
                        Oops! The page or SEO plan you&apos;re looking for doesn&apos;t exist.
                        Let&apos;s get you back on track.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/" className="btn btn-primary">
                            🏠 Back to Home
                        </Link>
                        <Link href="/#pricing" className="btn btn-outline">
                            View Plans
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

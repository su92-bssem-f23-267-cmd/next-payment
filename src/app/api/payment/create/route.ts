import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { planSlug, planName, planPrice, customerEmail, customerName } = body;

        if (!planSlug || !planPrice || !customerEmail || !customerName) {
            return NextResponse.json(
                { error: 'Missing required fields: planSlug, planPrice, customerEmail, customerName' },
                { status: 400 }
            );
        }

        // Validate amount and currency
        const amount = Number(planPrice);
        if (isNaN(amount) || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount: must be greater than 0' },
                { status: 400 }
            );
        }

        const apiKey = process.env.OBLIQPAY_API_KEY;
        const apiUrl = process.env.OBLIQPAY_API_URL || 'https://api.obliqpay.com';
        let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

        // Ensure siteUrl doesn't have a trailing slash for consistent URL building
        if (siteUrl.endsWith('/')) {
            siteUrl = siteUrl.slice(0, -1);
        }

        if (!apiKey) {
            console.error('CRITICAL: OBLIQPAY_API_KEY is not defined in environment variables.');
            return NextResponse.json(
                { error: 'Payment gateway not configured: OBLIQPAY_API_KEY is missing in server environment variables.' },
                { status: 500 }
            );
        }

        const isProduction = process.env.NODE_ENV === 'production';
        const isLocalUrl = siteUrl.includes('localhost') || siteUrl.includes('127.0.0.1');

        if (isProduction && isLocalUrl) {
            console.warn('WARNING: NEXT_PUBLIC_SITE_URL is set to localhost in a production environment. Redirection will likely fail.');
        }

        console.log('Environment Debug:', {
            hasApiKey: !!apiKey,
            apiUrl,
            siteUrl,
            isProduction,
            isLocalUrl
        });

        const orderPayload = {
            amount: parseFloat(amount.toFixed(2)),
            currency: 'usd',
            email: customerEmail,
            redirect_url: `${siteUrl}/thank-you`,
            webhook_url: `${siteUrl}/api/payment/webhook`,
            note: `Plan: ${planName} | Customer: ${customerName}`,
        };

        console.log('Initiating Canonical ObliqPay v3 order:', {
            url: `${apiUrl}/orders`,
            payload: orderPayload
        });

        const response = await fetch(`${apiUrl}/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(orderPayload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('ObliqPay API Error:', {
                status: response.status,
                statusText: response.statusText,
                data: JSON.stringify(data, null, 2)
            });
            return NextResponse.json(
                { error: data?.message || data?.error || 'Payment initiation failed' },
                { status: response.status }
            );
        }

        // Return checkoutUrl to the client
        return NextResponse.json({
            success: true,
            checkoutUrl: data.checkoutUrl,
            orderId: data.orderId,
        });
    } catch (err) {
        console.error('Payment API route error:', err);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

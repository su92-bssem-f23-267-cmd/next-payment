import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { planSlug, planName, planPrice, customerEmail, customerName } = body;

        if (!planSlug || !planPrice || !customerEmail) {
            return NextResponse.json(
                { error: 'Missing required fields: planSlug, planPrice, customerEmail' },
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
        const apiKey = process.env.OBLIQPAY_API_KEY?.trim();
        const apiUrl = process.env.OBLIQPAY_API_URL || 'https://api.obliqpay.com';

        const headersList = await headers();
        const host = headersList.get('host') || 'localhost:3000';

        let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rankboostpro.store';
        if (siteUrl.endsWith('/')) {
            siteUrl = siteUrl.slice(0, -1);
        }

        const isLocalHost = host.includes('localhost') || host.includes('127.0.0.1');

        // ObliqPay DOES NOT ALLOW localhost in redirect_url or webhook_url.
        // Even when testing locally, we must send a public URL or the gateway will reject it.
        const publicSiteUrl = 'https://www.rankboostpro.store';

        if (!apiKey) {
            console.error('CRITICAL: OBLIQPAY_API_KEY is not defined in environment variables.');
            return NextResponse.json(
                { error: 'Payment gateway not configured: OBLIQPAY_API_KEY is missing in server environment variables.' },
                { status: 500 }
            );
        }

        console.log('Environment Debug [v2.3]:', {
            hasApiKey: !!apiKey,
            apiUrl,
            host,
            detectedSiteUrl: siteUrl,
            usingForGateway: publicSiteUrl,
            isLocalHost
        });

        const orderPayload = {
            amount: Number(amount.toFixed(2)),
            currency: 'USD',
            email: customerEmail,
            redirect_url: `${publicSiteUrl}/thank-you`,
            webhook_url: `${publicSiteUrl}/api/payment/webhook`,
            note: `Plan: ${planName}`,
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
        console.log('ObliqPay API Response:', {
            status: response.status,
            data: JSON.stringify(data, null, 2)
        });

        if (!response.ok) {
            console.error('ObliqPay API Error:', {
                status: response.status,
                statusText: response.statusText,
                data: JSON.stringify(data, null, 2)
            });
            return NextResponse.json(
                { error: data?.detail || data?.message || data?.error || 'Payment initiation failed' },
                { status: response.status }
            );
        }

        if (!data.checkoutUrl) {
            console.error('CRITICAL: ObliqPay returned 200/201 but no checkoutUrl:', data);
            return NextResponse.json(
                { error: 'Payment gateway did not return a checkout session.' },
                { status: 500 }
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

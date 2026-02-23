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

        console.log('Using API Key starting with:', apiKey.substring(0, 5) + '...');

        const orderPayload = {
            amount: amount,
            currency: 'usd', // Use lowercase as per API documentation
            email: customerEmail, // Top-level email field as per API documentation
            customer: {
                name: customerName,
                email: customerEmail,
            },
            redirect_url: `${siteUrl}/thank-you`,
            webhook_url: `${siteUrl}/api/payment/webhook`,
            note: `Rank Boost Pro - ${planName}`,
        };

        console.log('Initiating ObliqPay order with payload:', JSON.stringify(orderPayload, null, 2));

        const response = await fetch(`${apiUrl}/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
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

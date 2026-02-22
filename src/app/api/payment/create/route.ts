import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { planSlug, planName, planPrice, customerEmail } = body;

        if (!planSlug || !planPrice || !customerEmail) {
            return NextResponse.json(
                { error: 'Missing required fields: planSlug, planPrice, customerEmail' },
                { status: 400 }
            );
        }

        const apiKey = process.env.OBLIQPAY_API_KEY;
        const apiUrl = process.env.OBLIQPAY_API_URL || 'https://api.obliqpay.com';
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

        if (!apiKey) {
            return NextResponse.json(
                { error: 'Payment gateway not configured' },
                { status: 500 }
            );
        }

        const orderPayload = {
            amount: planPrice,
            currency: 'usd',
            email: customerEmail,
            note: `Rank Boost Pro – ${planName}`,
            redirect_url: `${siteUrl}/payment-success?plan=${planSlug}`,
            webhook_url: `${siteUrl}/api/payment/webhook`,
        };

        const response = await fetch(`${apiUrl}/orders`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderPayload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('ObliqPay error:', data);
            return NextResponse.json(
                { error: data?.message || 'Payment initiation failed' },
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

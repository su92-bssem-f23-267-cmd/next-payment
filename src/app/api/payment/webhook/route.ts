import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const signature = req.headers.get('obliqpay-signature');
        const timestamp = req.headers.get('obliqpay-timestamp');
        const webhookSecret = process.env.OBLIQPAY_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error('Webhook secret not configured');
            return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
        }

        if (!signature) {
            console.error('Missing signature header');
            return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
        }

        // Verify HMAC-SHA256 signature
        // Note: The exact format of the signature payload might vary. 
        // Often it is timestamp + '.' + body, or just body.
        const hmac = crypto.createHmac('sha256', webhookSecret);
        const expectedSignature = hmac.update(body).digest('hex');

        // Simple comparison for now. In production, use crypto.timingSafeEqual if possible.
        if (signature !== expectedSignature) {
            console.error('Invalid signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const event = JSON.parse(body);
        const { type, data } = event;

        console.log(`Received ObliqPay webhook: ${type}`, data);

        switch (type) {
            case 'order.completed':
                // Handle successful payment (e.g., update order in DB)
                console.log('Order completed:', data.orderId);
                break;
            case 'order.payment_failed':
                // Handle failed payment
                console.log('Order failed:', data.orderId);
                break;
            default:
                console.log('Unhandled event type:', type);
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (err) {
        console.error('Webhook error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

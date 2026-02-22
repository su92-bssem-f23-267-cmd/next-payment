import { NextResponse } from 'next/server';

/**
 * Webhook endpoint for ObliqPay payment notifications.
 * ObliqPay sends POST with x-obliqpay-signature and x-obliqpay-timestamp headers.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('ObliqPay Webhook received:', JSON.stringify(body, null, 2));

        // TODO: Verify HMAC-SHA256 signature using WEBHOOK_SECRET if configured
        // const signature = req.headers.get('x-obliqpay-signature');
        // const timestamp = req.headers.get('x-obliqpay-timestamp');

        const { status, orderId } = body;

        if (status === 'paid') {
            console.log(`✅ Payment confirmed for order: ${orderId}`);
            // TODO: Update your database order status here
        } else if (status === 'failed') {
            console.log(`❌ Payment failed for order: ${orderId}`);
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error('Webhook error:', err);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}

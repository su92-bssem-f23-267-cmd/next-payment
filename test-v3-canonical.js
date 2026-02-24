const https = require('https');

const apiKey = 'cJGkCsY2qOIHC2kp9iB_y9x9gq39FgtAvbFEb4fisQfSUhKtpER0ksgOjAmZb1_C';
const payload = JSON.stringify({
    amount: 19.00,
    currency: 'usd',
    email: 'test@example.com',
    redirect_url: 'https://example.com/thank-you',
    webhook_url: 'https://example.com/api/payment/webhook',
    note: 'Plan: Starter | Customer: Test User'
});

const options = {
    hostname: 'api.obliqpay.com',
    port: 443,
    path: '/orders',
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Response: ${data}`);
    });
});

req.on('error', (e) => {
    console.error(`Request Error: ${e.message}`);
});

req.write(payload);
req.end();

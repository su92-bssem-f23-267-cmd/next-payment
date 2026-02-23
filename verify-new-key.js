const https = require('https');

const apiKey = 'XzoZhh5VWriIYQzBq7VC78Zfgx6KIBnSIpeyP5t8yKG-U57ozgGoOXEycDNOsxe4';
const payload = JSON.stringify({
    amount: 10,
    currency: 'USD',
    redirect_url: 'https://example.com/thank-you',
    webhook_url: 'https://example.com/api/payment/webhook',
    note: 'Final Test with New Key'
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
        if (res.statusCode === 201 || res.statusCode === 200) {
            console.log('SUCCESS: API Key is valid!');
        } else {
            console.log('FAILURE: API Key is still being rejected.');
        }
    });
});

req.on('error', (e) => {
    console.error(`Request Error: ${e.message}`);
});

req.write(payload);
req.end();

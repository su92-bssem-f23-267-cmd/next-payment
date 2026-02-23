const https = require('https');

const apiKey = '1yhYzv_zMEQyZHNTlw4A70l1lcCXW646Mhb7Xk_sFlwPGAEzRtgqxm9b-EjTHVUT';
const payload = JSON.stringify({
    amount: 10,
    currency: 'USD',
    redirect_url: 'https://example.com/success',
    webhook_url: 'https://example.com/webhook',
    note: 'API Auth Test'
});

const variations = [
    { name: 'Bearer Token', headers: { 'Authorization': `Bearer ${apiKey}` } },
    { name: 'Plain Key in Authorization', headers: { 'Authorization': apiKey } },
    { name: 'X-API-KEY', headers: { 'X-API-KEY': apiKey } },
    { name: 'api-key', headers: { 'api-key': apiKey } },
    { name: 'Bearer in lower case header', headers: { 'authorization': `Bearer ${apiKey}` } },
    { name: 'Plain key in lower case header', headers: { 'authorization': apiKey } }
];

async function testVariation(variation) {
    console.log(`\nTesting: ${variation.name}`);
    
    return new Promise((resolve) => {
        const options = {
            hostname: 'api.obliqpay.com',
            port: 443,
            path: '/orders',
            method: 'POST',
            headers: {
                ...variation.headers,
                'Content-Type': 'application/json',
                'Content-Length': payload.length
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                console.log(`Status: ${res.statusCode}`);
                console.log(`Response: ${data}`);
                resolve();
            });
        });

        req.on('error', (error) => {
            console.error(`Error: ${error.message}`);
            resolve();
        });

        req.write(payload);
        req.end();
    });
}

async function runAll() {
    for (const v of variations) {
        await testVariation(v);
    }
}

runAll();

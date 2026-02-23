const http = require('http');

const payload = JSON.stringify({
    planSlug: 'starter',
    planName: 'Starter Plan',
    planPrice: '19',
    customerEmail: 'test@example.com',
    customerName: 'Test User'
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/payment/create',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        try {
            const parsedData = JSON.parse(data);
            console.log('Response:', JSON.stringify(parsedData, null, 2));
            if (res.statusCode === 200 && parsedData.success) {
                console.log('SUCCESS: API route handles the request and returns a checkout URL!');
            } else {
                console.log('FAILURE: API route returned an error.');
            }
        } catch (e) {
            console.log('Raw Response:', data);
            console.log('Error parsing JSON:', e.message);
        }
    });
});

req.on('error', (e) => {
    console.error('Error testing API:', e.message);
    console.log('Make sure the dev server is running on port 3001.');
});

req.write(payload);
req.end();

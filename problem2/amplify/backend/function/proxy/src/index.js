const https = require('https');

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        https.get('https://interview.switcheo.com/prices.json', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve({
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: data
                });
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

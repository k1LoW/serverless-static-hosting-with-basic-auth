const test = require('ava');
const path = require('path');

const { basicAuth } = require(path.join(__dirname, '..', 'handler.js'));

test.cb('handler.basicAuth pass valid user/pass', (t) => {
    const event = {
        Records: [
            {
                cf: {
                    request: {
                        headers: {
                            authorization: [{ key: 'Authorization', value: 'Basic dXNlcjpwYXNz' }]
                        }
                    }
                }
            }
        ]
    };
    const context = {};
    const callback = (error, response) => {
        t.deepEqual(response, {
            headers: {
                authorization: [{ key: 'Authorization', value: 'Basic dXNlcjpwYXNz' }]
            }
        });
        t.end();
    };

    basicAuth(event, context, callback);
});

test.cb('handler.basicAuth fail invalid user/pass', (t) => {
    const event = {
        Records: [
            {
                cf: {
                    request: {
                        headers: {
                            authorization: [{ key: 'Authorization', value: 'Basic invalid' }]
                        }
                    }
                }
            }
        ]
    };
    const context = {};
    const callback = (error, response) => {
        t.deepEqual(response, {
            status: '401',
            statusDescription: 'Authorization Required',
            headers: {
                'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }],
                'content-type': [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }]
            },
            body: '401 Authorization Required'
        });
        t.end();
    };

    basicAuth(event, context, callback);
});

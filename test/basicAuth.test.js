const test = require('ava');
const path = require('path');

const { basicAuth } = require(path.join(__dirname, '..', 'handler.js'));

test.cb('handler.basicAuth check user/pass', (t) => {
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

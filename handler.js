const fs = require('fs');
const htpasswd = require('htpasswd-auth');

const file = fs.readFileSync(`${__dirname}/.htpasswd`).toString();

module.exports.basicAuth = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const authorization = headers.authorization || headers.Authorization;

    const response = {
        status: '401',
        statusDescription: 'Authorization Required',
        headers: {
            'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }],
            'content-type': [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }]
        },
        body: '401 Authorization Required'
    };

    if (authorization) {
        const encoded = authorization[0].value.split(' ')[1];
        const userAndPassword = Buffer.from(encoded, 'base64').toString().split(':');
        htpasswd.authenticate(userAndPassword[0], userAndPassword[1], file)
            .then((auth) => {
                if (auth) {
                    callback(null, request);
                } else {
                    callback(null, response);
                }
            });
    } else {
        callback(null, response);
    }
};

'use strict';

const BASIC_AUTH_USERS = {
    'user': 'pass'
};

module.exports.basicAuth = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const authorization = headers.authorization || headers.Authorization;

    if (authorization) {
        const encoded = authorization[0].value.split(' ')[1];
        const userAndPassword = new Buffer(encoded, 'base64').toString();
        for (let user in BASIC_AUTH_USERS) {
            const password = BASIC_AUTH_USERS[user];
            if (`${user}:${password}` === userAndPassword) {
                callback(null, request);
                return;
            }
        }
    }

    const response = {
        status: '401',
        statusDescription: 'Authorization Required',
        headers: {
            'www-authenticate': [{key: 'WWW-Authenticate', value: 'Basic'}],
            'content-type': [{key: 'Content-Type', value: 'text/plain; charset=utf-8'}]
        },
        body: '401 Authorization Required'
    };

    callback(null, response);
};

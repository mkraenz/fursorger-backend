import * as bunyan from 'bunyan';
// tslint:disable-next-line: no-var-requires
const audit = require('express-requests-logger');

export const configuredLoggerMiddleware = audit({
    logger: bunyan.createLogger({ name: 'Fursorger' }),
    excludeURLs: [], // string[] Exclude paths which enclude given words
    request: {
        maskBody: ['password'], // Mask 'password' field in incoming requests
        excludeHeaders: ['authorization'], // Exclude 'authorization' header from requests
        excludeBody: ['creditCard'], // Exclude 'creditCard' field from requests body
        maskHeaders: ['header1'], // Mask 'header1' header in incoming requests
        maxBodyLength: 100, // limit length to n chars + '...'
    },
    response: {
        maskBody: ['session_token'], // Mask 'session_token' field in response body
        excludeHeaders: ['*'], // Exclude all headers from responses,
        excludeBody: ['*'], // Exclude all body from responses
        maskHeaders: ['header1'], // Mask 'header1' header in incoming requests
        maxBodyLength: 50, // limit length to 50 chars + '...'
    },
});

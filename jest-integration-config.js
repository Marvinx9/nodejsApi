/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('././jest.config');
config.testMatch = ['**/*.test.ts'];
config.preset = '@shelf/jest-mongodb';
module.exports = config;

/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./jest.config');
config.testMath = ['**/*.test.ts'];
module.exports = config;

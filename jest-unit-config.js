/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./jest.config');
config.testMath = ['**/*.spec.ts'];
module.exports = config;

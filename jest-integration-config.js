/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('././jest.config');
config.testMatch = ['**/*.test.ts'];
config.preset = '@shelf/jest-mongodb';
config.watchPathIgnorePatterns = ['globalConfig'];
delete config.testEnvironment;
module.exports = config;

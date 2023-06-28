/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/* eslint-env node */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/**ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', 'dist'],
  coverageProvider: 'babel',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
  testRegex: '(.spec)\\.(ts|tsx)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  transform: {
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  watchPathIgnorePatterns: ['globalConfig'],
  reporters: ['default', '@wopian/jest-reporter-github-annotations']
};

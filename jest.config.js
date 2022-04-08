module.exports = {
  clearMocks: true,
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  collectCoverageFrom: ['src/**/*.js'],
  setupFilesAfterEnv: ['jest-extended/all'],
  globalSetup: '<rootDir>/__tests__/global-setup.js',
  globalTeardown: '<rootDir>/__tests__/global-teardown.js',
  testTimeout: 10000
}

module.exports = {
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/app/$1',
  },
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/spec/setup/index.ts'],
};
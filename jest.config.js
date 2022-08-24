module.exports = {
  projects: [
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/**/*.server.test.tsx'],
    },
  ],
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/app/$1',
    'spec/(.*)$': '<rootDir>/spec/$1',
  },
  clearMocks: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': "ts-jest",
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/spec/utils/fileTransformer.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/spec/setup/index.ts'],
};
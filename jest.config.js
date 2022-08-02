module.exports = {
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
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/spec/setup/index.ts'],
};
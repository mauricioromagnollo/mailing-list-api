module.exports = {
  roots: ['<rootDir>/test'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/test/**',
    '!**/config/**',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/test/(.*)$': '<rootDir>/test/$1',
    '@/(.*)$': '<rootDir>/src/$1',
  },
  // setupFiles: ['dotenv/config'],
};

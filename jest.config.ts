import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '@/features/(.*)': '<rootDir>/src/features/$1',
    '@/pages/(.*)': '<rootDir>/src/pages/$1',
    '@/hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@/constants/(.*)': '<rootDir>/src/constants/$1',
  },
};

export default config;

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  maxWorkers: '50%',
  reporters: [
    'default',
    'github-actions',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  roots: [
    '<rootDir>/src',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

export default config;
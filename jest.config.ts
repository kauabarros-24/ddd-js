import type {Config} from 'jest';

const config: Config = {
  
  collectCoverage: true,
  coverageDirectory: "coverage",

  transform: {
    ".+\\.ts$": "ts-jest"
  },
  roots: ['<rootDir>/src']
};

export default config;

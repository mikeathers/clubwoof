const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const jestConfig = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx,mjs}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|sass|scss)$': '<rootDir>/src/test-utils/__mocks__/style-mock.ts',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/test-utils/__mocks__/image-mock.ts',
  },
  setupFiles: ['<rootDir>/src/test-utils/setup-tests.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '\\\\node_modules\\\\'],
  fakeTimers: {
    enableGlobally: true,
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: false,
}

module.exports = createJestConfig(jestConfig)

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@clubwoof-components$': '<rootDir>/src/components',
    '^@clubwoof-styles$': '<rootDir>/src/styles',
    '^@clubwoof-hooks$': '<rootDir>/src/hooks',
  },
  testEnvironment: 'jest-environment-jsdom-sixteen',
  preset: 'ts-jest',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)

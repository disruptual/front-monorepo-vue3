module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '@dsp/ui/(.*)': '<rootDir>/src/$1',
    '@dsp/core/(.*)': '<rootDir>/../core/src/$1',
    '@dsp/core': '<rootDir>/../core/src/index.js',
    '@dsp/business(.*)': '<rootDir>/../business/src/$1',
    '@dsp/business': '<rootDir>/../business/src/index.js',
    '@dsp/test-utils': '<rootDir>/../test-utils/src/index.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom'
};

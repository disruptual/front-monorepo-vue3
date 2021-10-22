module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue3-jest'
  },
  moduleNameMapper: {
    '@dsp/ui/(.*)': '<rootDir>/src/$1',
    '@dsp/core/(.*)': '<rootDir>/../core/src/$1',
    '@dsp/core': '<rootDir>/../core/src/index.js',
    '@dsp/business(.*)': '<rootDir>/../business/src/$1',
    '@dsp/business': '<rootDir>/../business/src/index.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom'
};

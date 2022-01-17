module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue3-jest'
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
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

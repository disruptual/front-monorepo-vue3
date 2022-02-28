import '@testing-library/jest-dom';
// import '@dsp/test-utils';

global.console = {
  error: jest.fn(),

  log: console.log,
  warn: console.warn,
  info: console.info,
  debug: console.debug
};

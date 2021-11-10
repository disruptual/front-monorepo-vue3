import { LOG_LEVELS } from '@dsp/core/utils/constants';

class Logger {
  constructor(label) {
    this.label = label;
    window.setDspLoggerLevel = lvl => {
      this.logLevel = lvl;
    };
  }

  get localStorageKey() {
    return 'dsp-loger-level';
  }

  get logLevel() {
    const lvl = localStorage.getItem(this.localStorageKey);

    if (!lvl) return 0;

    return parseInt(lvl, 10);
  }

  set logLevel(lvl) {
    if (typeof lvl !== 'number') {
      console.warn('Invalid logger level', lvl);
      return;
    }

    localStorage.setItem(this.localStorageKey, lvl);
  }

  log(level, color, ...args) {
    if (import.meta.env.PROD) return;
    if (level < this.logLevel) return;

    console.log(
      `%c${this.label.toUpperCase()}`,
      `font-weight: bold; color: ${color}`,
      ...args
    );
  }

  verbose(...args) {
    return this.log(LOG_LEVELS.VERBOSE, 'black', ...args);
  }

  debug(...args) {
    return this.log(LOG_LEVELS.DEBUG, '#1adb54', ...args);
  }

  info(...args) {
    return this.log(LOG_LEVELS.INFO, '#1f70f2', ...args);
  }

  warning(...args) {
    return this.log(LOG_LEVELS.WARNING, '#dda71f', ...args);
  }

  error(...args) {
    return this.log(LOG_LEVELS.ERROR, '#e50606', ...args);
  }
}

export const createLogger = label => new Logger(label);

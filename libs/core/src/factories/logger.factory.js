import { LOG_LEVELS } from '@dsp/core/utils/constants';

class Logger {
  constructor(label) {
    this.label = label;
    window.setDspLoggerLevel = lvl => {
      this.logLevel = lvl;
    };

    window.muteChannel = channelName => {
      this.mutechannel(channelName);
    };

    window.unmuteChannel = channelName => {
      this.unmutechannel(channelName);
    };

    window.unmuteAllChannels = channelName => {
      this.unmuteAllchannels(channelName);
    };
  }

  unmuteAllChannels() {
    this.mutedChannels = [];
  }

  mutechannel(channelName) {
    if (this.mutedChannels.includes(channelName)) {
      this.mutedChannels = [...this.mutedChannels, channelName];
    }
  }

  unmutechannel(channelName) {
    this.mutedChannels = this.mutedChannels.filter(
      channel => channel !== channelName
    );
  }

  get localStorageLevelKey() {
    return 'dsp-loger-level';
  }

  get localStorageMutedchannelsKey() {
    return 'dsp-loger-level';
  }

  get logLevel() {
    const lvl = localStorage.getItem(this.localStorageLevelKey);

    if (!lvl) return 0;

    return parseInt(lvl, 10);
  }

  set logLevel(lvl) {
    if (typeof lvl !== 'number') {
      console.warn('Invalid logger level', lvl);
      return;
    }

    localStorage.setItem(JSON.stringify(this.localStorageLevelKey, lvl));
  }

  get mutedChannels() {
    const channels = localStorage.getItem(this.localStorageMutedChannelsKey);

    return JSON.parse(channels) || [];
  }

  set mutedChannels(channels) {
    localStorage.setItem(
      JSON.stringify(this.localStorageMutedChannelsKey, channels)
    );
  }

  log(level, color, ...args) {
    if (import.meta.env.PROD) return;
    if (level < this.logLevel) return;
    if (this.mutedChannels.includes(this.label)) return;

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

  warn(...args) {
    return this.log(LOG_LEVELS.WARNING, '#dda71f', ...args);
  }

  error(...args) {
    return this.log(LOG_LEVELS.ERROR, '#e50606', ...args);
  }
}

export const createLogger = label => new Logger(label);

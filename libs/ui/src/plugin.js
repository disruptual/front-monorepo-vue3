import 'normalize.css';
import 'focus-visible/dist/focus-visible';
import './styles/main.scss';

import * as components from './components';
import 'inert-polyfill';
import { ThemeService } from '@dsp/ui/services/theme.service';
import { CONTEXT_KEYS } from './utils/constants';

export const plugin = theme => {
  new ThemeService(theme).setup();

  return {
    install: app => {
      app.provide(CONTEXT_KEYS.THEME, theme);
      Object.entries(components).forEach(([name, component]) => {
        app.component(name, component);
      });
    }
  };
};

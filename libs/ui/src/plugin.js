import 'inert-polyfill';
import 'normalize.css';
import 'focus-visible/dist/focus-visible';
import './styles/main.scss';

import * as components from './components';
import { ThemeService } from '@dsp/ui/services/theme.service';
import toastService from '@dsp/ui/services/toast.service';
import { CONTEXT_KEYS } from './utils/constants';

export const plugin = theme => {
  new ThemeService(theme).setup();

  return {
    install: app => {
      app.provide(CONTEXT_KEYS.THEME, theme);
      app.provide(CONTEXT_KEYS.TOAST, toastService);
      Object.entries(components).forEach(([name, component]) => {
        app.component(name, component);
      });
    }
  };
};

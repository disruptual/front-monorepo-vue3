import { createI18n as createVueI18n } from 'vue-i18n/index';
import defaultTranslations from '@dsp/core/translations';
import { merge } from 'lodash-es';

export const createI18n = messages => {
  return createVueI18n({
    legacy: false,
    locale: 'fr',
    messages: merge({}, defaultTranslations, messages)
  });
};

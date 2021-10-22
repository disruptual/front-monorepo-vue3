import { merge } from 'lodash-es';
import * as overrides from 'client/translations';

const fr = import.meta.globEager('./fr/*.js');
const en = import.meta.globEager('./en/*.js');

const getTranslationsForLang = modules => {
  const translations = Object.values(modules).map(module => module.default);

  return merge({}, ...translations);
};

export const translations = {
  fr: merge(getTranslationsForLang(fr), overrides.fr),
  en: merge(getTranslationsForLang(en), overrides.en)
};

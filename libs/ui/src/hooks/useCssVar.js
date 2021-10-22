import { watchEffect, unref } from 'vue';

export const useCssVar = (name, value) => {
  watchEffect(() => {
    document.documentElement.style.setProperty(name, unref(value));
  });
};

import { unref, computed } from 'vue';

export const useColorScheme = (scheme, props) => {
  return computed(() => {
    return Object.fromEntries(
      Object.entries(unref(scheme)).map(([key, value]) => [
        key,
        `var(--color-${unref(props.colorScheme)}-${value})`
      ])
    );
  });
};

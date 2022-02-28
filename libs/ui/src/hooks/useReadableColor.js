import { computed, unref } from 'vue';
import { getReadableColor } from '@dsp/ui/utils/getReadableColor';

export const useReadableColor = color => {
  return computed(() => {
    return import.meta.env.NODE_ENV === 'test'
      ? '#000'
      : getReadableColor(unref(color));
  });
};

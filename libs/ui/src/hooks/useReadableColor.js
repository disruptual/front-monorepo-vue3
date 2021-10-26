import { computed, unref } from 'vue';
import { getReadableColor } from '@dsp/ui/utils/getReadableColor';

export const useReadableColor = color => {
  return computed(() => getReadableColor(unref(color)));
};

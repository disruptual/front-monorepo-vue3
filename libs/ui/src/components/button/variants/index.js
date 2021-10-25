import { computed } from 'vue';
import { useReadableColor } from '@dsp/ui/hooks';

export const useButton = props => {
  const classes = computed(() => ({
    'dsp-button--is-fullwidth': props.isFullWidth,
    'dsp-button--is-outlined': props.isOutlined,
    'dsp-button--is-rounded': props.isRounded
  }));

  const textColor = useReadableColor('--color-brand-500');
  const textHoverColor = useReadableColor('--color-brand-600');
  const textFocusColor = useReadableColor('--color-brand-700');

  return { classes, textColor, textHoverColor, textFocusColor };
};

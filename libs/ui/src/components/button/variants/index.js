import { computed } from 'vue';
import { useColorScheme } from '@dsp/ui/hooks';

export const useButton = props => {
  const classes = computed(() => ({
    'dsp-button--is-fullwidth': props.isFullWidth,
    'dsp-button--is-outlined': props.isOutlined,
    'dsp-button--is-rounded': props.isRounded
  }));

  const scheme = computed(() => ({
    normal: props.scheme.normal,
    hover: props.scheme.hover,
    focus: props.scheme.focus
  }));

  const colors = useColorScheme(scheme, props);

  return { classes, colors };
};

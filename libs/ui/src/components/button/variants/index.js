import { computed } from 'vue';
import { useColorScheme } from '@dsp/ui/hooks';

export const useButton = (props, attrs) => {
  const classes = computed(() => [
    `dsp-button--${props.size}`,
    {
      'dsp-button--is-fullwidth': props.isFullWidth,
      'dsp-button--is-outlined': props.isOutlined,
      'dsp-button--is-rounded': props.isRounded
    }
  ]);

  const scheme = computed(() => {
    return {
      normal: props.scheme.normal,
      hover: props.scheme.hover,
      focus: props.scheme.focus
    };
  });

  const colors = useColorScheme(scheme, props);
  const is = computed(() => {
    if (attrs.to) return 'router-link';
    if (attrs.href) return 'a';

    return 'button';
  });

  return { is, classes, colors };
};

import { computed } from 'vue';

export const useButton = props => {
  const classes = computed(() => ({
    'dsp-button--is-fullwidth': props.isFullWidth,
    'dsp-button--is-outlined': props.isOutlined,
    'dsp-button--is-rounded': props.isRounded
  }));

  return classes;
};

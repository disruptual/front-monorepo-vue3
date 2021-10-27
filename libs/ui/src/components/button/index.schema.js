import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DspButton', types => ({
  isRounded: types.boolean(false),
  variant: types.componentVariant({
    default: () => import('./variants/default.variant.vue'),
    gradient: () => import('./variants/gradient.variant.vue')
  }),
  scheme: types.object({
    normal: types.number(500),
    hover: types.number(600),
    focus: types.number(700)
  })
}));

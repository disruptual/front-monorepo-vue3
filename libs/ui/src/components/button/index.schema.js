import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DspButton', types => ({
  isRounded: types.boolean(false),
  variant: types.componentVariant({
    default: () => import('./variants/default.variant.vue'),
    gradient: () => import('./variants/gradient.variant.vue')
  })
}));

import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DspButton', types => ({
  isRounded: types.boolean(false),
  variant: types.componentVariant({
    default: () => import('./default.variant.vue'),
    gradient: () => import('./gradient.variant.vue')
  })
}));

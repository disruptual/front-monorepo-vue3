import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('ItemCard', types => ({
  variant: types.componentVariant({
    default: () => import('./variants/default.variant.vue')
  })
}));

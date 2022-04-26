import { createComponentSchema } from '@dsp/core';
import VariantLoader from './variant-loader.vue';

export default createComponentSchema(
  'ItemCard',
  types => ({
    variant: types.componentVariant({
      default: () => import('./variants/default.variant.vue')
    })
  }),
  {
    variantLoaderComponent: VariantLoader
  }
);

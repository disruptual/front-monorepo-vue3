import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('ItemCard', types => ({
  backgroundColor: types.color('brand-500')
}));

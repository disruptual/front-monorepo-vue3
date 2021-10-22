import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DspButton', types => ({
  color: types.color('text-lighter'),
  bgColor: types.color('brand-500')
}));

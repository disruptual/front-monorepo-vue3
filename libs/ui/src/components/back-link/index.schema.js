import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DspButton', types => ({
  bgColor: types.color('brand-500')
}));

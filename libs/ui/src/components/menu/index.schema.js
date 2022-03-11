import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DspMenu', types => ({
  activeColor: types.color('brand-500')
}));

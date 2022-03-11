import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DspAvatar', types => ({
  bgColor: types.color('brand-500')
}));

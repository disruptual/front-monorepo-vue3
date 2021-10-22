import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DspSurface', types => ({
  isRounded: types.boolean(false)
}));

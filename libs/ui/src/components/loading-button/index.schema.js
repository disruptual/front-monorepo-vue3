import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DspLoadingButton', types => ({
  showLabelWhileLoading: types.boolean(true)
}));

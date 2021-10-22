import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DspFormControl', types => ({
  labelColor: types.color('text'),
  labelFontWeight: types.fontWeight('bold'),
  asteriskColor: types.color('brand-500')
}));

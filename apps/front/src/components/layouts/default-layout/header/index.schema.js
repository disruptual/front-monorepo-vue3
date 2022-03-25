import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DefaultLayoutHeader', types => ({
  isCollapsable: types.boolean(true),
  isLogoDisplayed: types.boolean(true)
}));

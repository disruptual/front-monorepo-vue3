import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('DefaultLayoutHeader', types => ({
  isLogoDisplayed: types.boolean(false)
}));

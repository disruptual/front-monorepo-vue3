import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('BurgerMenu', types => ({
  hasLogo: types.boolean(true)
}));

import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('UserDetails', types => ({
  isSSOCustomerIdDisplayed: types.boolean(false)
}));

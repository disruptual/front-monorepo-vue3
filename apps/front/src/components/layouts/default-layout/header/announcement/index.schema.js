import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('HeaderAnnouncement', types => ({
  backgroundColor: types.color('brand-500')
}));

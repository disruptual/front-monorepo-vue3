import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('HeaderCategoriesNav', types => ({
  backgroundColor: types.color('gray-100'),
  align: types.oneOf(['left', 'center'], 'center'),
  hasMainsiteLink: types.boolean(false),
  mainsiteUrl: types.string('http://disruptual.com')
}));

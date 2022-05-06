import { createComponentSchema } from '@dsp/core';

export default createComponentSchema('HeaderCategoriesNav', types => ({
  backgroundColor: types.color('gray-100'),
  activeColor: types.color('brand-500)'),
  align: types.oneOf(['left', 'center'], 'center'),
  hasMainsiteLink: types.boolean(false),
  mainsiteUrl: types.string('http://disruptual.com'),
  hasIcons: types.boolean(true)
}));

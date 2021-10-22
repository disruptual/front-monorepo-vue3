import { DevtoolsService } from '@dsp/devtools/services/devtools.service.js';

export const createDevtools = async (app, ownSchemaGlob) => {
  const devtools = new DevtoolsService(app);

  await devtools.register(ownSchemaGlob);

  return devtools;
};

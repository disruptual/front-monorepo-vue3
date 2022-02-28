import { DevtoolsService } from '@dsp/devtools/services/devtools.service.js';

export const createDevtools = async (app, ownSchemaGlob) => {
  const searchParams = new URLSearchParams(location.search);
  const devtools = new DevtoolsService(app, {
    isDetached: searchParams.get('devtools')
  });

  await devtools.register(ownSchemaGlob);

  return devtools;
};

import { DevtoolsService } from '@dsp/devtools/services/devtools.service.js';

export const createDevtools = async (app, schemaGlob) => {
  const searchParams = new URLSearchParams(location.search);
  const devtools = new DevtoolsService(app, {
    isDetached: searchParams.get('devtools')
  });

  await devtools.register(schemaGlob);

  return devtools;
};

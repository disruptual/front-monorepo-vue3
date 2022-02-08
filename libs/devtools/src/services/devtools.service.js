import DevtoolsComponent from '@dsp/devtools/components/devtools.vue';

export class DevtoolsService {
  constructor(app, options) {
    this.disruptualApp = app;
    this.options = options;
    this.schema = null;
  }

  async register(ownSchemaGlob = {}) {
    const globs = await Promise.all([
      import('@dsp/ui/register-devtools'),
      import('@dsp/core/register-devtools')
    ]);

    this.schema = Object.fromEntries(
      globs
        .concat(ownSchemaGlob)
        .map(Object.values)
        .flat()
        .map(Object.values)
        .flat()
        .map(module => module.default.toDevtools())
    );

    this.disruptualApp.vueApp.component('dsp-devtools', DevtoolsComponent);
    this.disruptualApp.vueApp.provide('devtoolsContext', this);
    if (this.options.isDetached) {
      this.disruptualApp.router.options.routes.forEach(route => {
        this.disruptualApp.router.removeRoute(route.name);
      });
    }
  }

  updateAppContext(path, value) {}
}

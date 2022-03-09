import DevtoolsComponent from '@dsp/devtools/components/devtools.vue';
import { set } from 'lodash-es';

export class DevtoolsService {
  constructor(app, options) {
    this.disruptualApp = app;
    this.options = options;
    this.schema = null;
  }

  async register(ownSchemaGlob = {}) {
    // window.addEventListener('click', e => {
    //   console.log(e.target.__vueParentComponent.type.name);
    // });
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
        .map(module => module.default?.toDevtools?.())
        .filter(Boolean)
    );

    this.disruptualApp.vueApp.component('dsp-devtools', DevtoolsComponent);
    this.disruptualApp.vueApp.provide('devtoolsContext', this);

    if (this.options.isDetached) {
      this.disruptualApp.router.options.routes.forEach(route => {
        this.disruptualApp.router.removeRoute(route.name);
      });

      Object.assign(
        this.disruptualApp.appContext,
        window.disruptualDevtoolsInitialState
      );
    } else {
      window.disruptualDevtoolsUpdate = this.update.bind(this);
    }
  }

  createPopup() {
    const params = `toolbar=no,menubar=no, width=800,height=600,left=100,top=100`;

    const popup = window.open('/?devtools=1', 'devtools', params);
    popup.disruptualDevtoolsInitialState = this.disruptualApp.appContext;

    return popup;
  }

  update({ path, value }) {
    if (this.options.isDetached) {
      window.opener.disruptualDevtoolsUpdate({ path, value });
    }
    set(this.disruptualApp.appContext, path, value);
  }
}

import { makeRandomId } from '@dsp/core';

export class Breadcrumbs {
  constructor() {
    this.breadcrumbs = [];
  }

  goTo(id) {
    const index = this.breadcrumbs.findIndex(b => b.id === id);
    if (index === this.breadcrumbs.length - 1) return;

    this.breadcrumbs = this.breadcrumbs.slice(0, index);
  }

  reset() {
    this.breadcrumbs = [];
  }

  add({ label, target, path }) {
    this.breadcrumbs.push({
      id: makeRandomId(4),
      label,
      target,
      path
    });
  }

  get currentCrumb() {
    return this.breadcrumbs[this.breadcrumbs.length - 1];
  }

  get lastCrumb() {
    return this.breadcrumbs[this.breadcrumbs.length - 2];
  }

  setActiveBreadcrumbLabel(label) {
    this.currentCrumb.label = label;
  }
}

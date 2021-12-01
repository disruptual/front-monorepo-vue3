import { makeRandomId } from '@dsp/core';

export class Breadcrumbs {
  constructor() {
    this.breadcrumbs = [];
  }

  goTo(id) {
    const index = this.breadcrumbs.findIndex(b => b.id === id);
    this.breadcrumbs = this.breadcrumbs.slice(0, index);
  }

  reset() {
    this.breadcrumbs = [];
  }

  add({ label, target }) {
    this.breadcrumbs.push({
      id: makeRandomId(4),
      label,
      target
    });
  }

  get lastCrumb() {
    return this.breadcrumbs[this.breadcrumbs.length - 1];
  }

  setActiveBreadcrumbLabel(label) {
    this.lastCrumb.label = label;
  }
}

import { isFunction } from '@dsp/core';

export class DataTableColumn {
  constructor(
    table,
    { name, label, template, tooltipLabel, width, isHidden, isPinned }
  ) {
    this.table = table;
    this.name = name;
    this.label = label;
    this.template = template;
    this.tooltipLabel = tooltipLabel;
    this.width = width;
    this.isHidden = isHidden;
    this.isPinned = isPinned;
    this.pinnedOffset = 0;
    this.headerElement = null;

    this.headerElementRef = this.headerElementRef.bind(this);
  }

  headerElementRef(el) {
    this.headerElement = el;
    setTimeout(() => {
      this.table.setColumnOffsets();
    });
  }

  getTooltip(entity) {
    if (!this.tooltipLabel) return entity[this.name];

    if (!isFunction(this.tooltipLabel)) {
      return this.tooltipLabel;
    }

    return () =>
      this.tooltipLabel({
        column: this.name,
        row: entity,
        value: entity[this.name]
      });
  }
}

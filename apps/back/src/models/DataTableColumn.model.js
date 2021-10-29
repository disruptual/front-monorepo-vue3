import { isFunction } from '@dsp/core';
import { EVENTS } from '@/utils/constants';
import mitt from 'mitt';

export class DataTableColumn {
  constructor(
    table,
    {
      name,
      label,
      position,
      template,
      tooltipLabel,
      width,
      isHidden,
      isPinned,
      isFilterable,
      filterName
    }
  ) {
    this.name = name;
    this.label = label;
    this.position = position;
    this.template = template;
    this.tooltipLabel = tooltipLabel;
    this.width = width;
    this.isHidden = isHidden;
    this.isPinned = isPinned;
    this.isFilterable = isFilterable;
    this.filterName = filterName;
    this.pinnedOffset = 0;
    this.headerElement = null;

    this.headerElementRef = this.headerElementRef.bind(this);
    this._emitter = mitt();
  }

  _onUpdate() {
    return this._emitter.emit(EVENTS.DATA_TABLE.COLUMN_UPDATE);
  }

  on(...args) {
    return this._emitter.on(...args);
  }

  off(...args) {
    this._emitter.off(...args);
  }

  headerElementRef(el) {
    if (this.headerElement === el) return;

    this.headerElement = el;
    setTimeout(() => {
      this._onUpdate();
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

  togglePinned() {
    this.isPinned = !this.isPinned;
    this._onUpdate();
  }

  toggleVisible() {
    this.isHidden = !this.isHidden;
    this._onUpdate();
  }
}

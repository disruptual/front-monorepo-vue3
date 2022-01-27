import mitt from 'mitt';
import { isFunction } from '@dsp/core';
import { EVENTS } from '@/utils/constants';
import { DataTableHighlight } from './DataTableHighlight.model';

export class DataTableColumn {
  constructor({
    name,
    type,
    label,
    position,
    template,
    tooltipLabel,
    width,
    isHidden,
    isPinned,
    isFilterable,
    filterName,
    isHighlightable,
    highlightOptions,
    enumValues,
    filterTag
  }) {
    this.name = name;
    this.type = type;
    this.label = label;
    this.position = position;
    this.template = template;
    this.tooltipLabel = tooltipLabel;
    this.width = width;
    this.isHidden = isHidden;
    this.isPinned = isPinned;
    this.isFilterable = isFilterable;
    this.filterName = filterName;
    this.isHighlightable = isHighlightable;
    this.highlightOptions = highlightOptions;
    this._highlights = [];
    this.enumValues = enumValues;
    this.filterTag = filterTag;

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

  resize(newWidth) {
    this.width = newWidth;
    this._onUpdate();
  }

  getHighlightPredicate(row) {
    return isFunction(this.highlightOptions.predicate)
      ? this.highlightOptions.predicate(row)
      : row[this.highlightOptions.predicate];
  }
}

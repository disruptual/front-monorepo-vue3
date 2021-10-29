import { debounce } from 'lodash-es';
import { DataTableColumn } from './DataTableColumn.model';
import { KEYBOARD, isNumber } from '@dsp/core';
import { EVENTS } from '@/utils/constants';

const SELECTOR_COLUMN_WIDTH = 40;
const ACTIONS_COLUMN_WIDTH = 50;

export class DataTable {
  constructor({
    id,
    query,
    minRowSize,
    hasSelectorColumn,
    onRowDblClick,
    onFilterChange,
    tableElement = null
  }) {
    if (!id) {
      throw new Error('DataTable id is required');
    }
    this.id = id;
    this.query = query;
    this.columns = [];
    this.selectedRowIds = [];
    this.visibleRowIds = [];
    this.rowActions = [];
    this.minRowSize = minRowSize;
    this.focusedRowIndex = null;
    this.hasSelectorColumn = hasSelectorColumn;

    this.onRowDblClick = onRowDblClick;
    this.onFilterChange = onFilterChange;

    this.tableElement = tableElement;

    this._debouncedSavePreferences = debounce(
      this._savePreferences.bind(this),
      1000
    );
    this._filters = {};
    this.filters = this.userPreferences?.filters || {};
  }

  get storageKey() {
    return `dsp-data-table-${this.id}`;
  }

  get userPreferences() {
    const raw = localStorage.getItem(this.storageKey);

    return raw ? JSON.parse(raw) : null;
  }

  set userPreferences(prefs) {
    localStorage.setItem(this.storageKey, JSON.stringify(prefs));
  }

  get filters() {
    return this._filters;
  }

  set filters(value) {
    this._filters = value;
    this.onFilterChange(this._filters);
    this._debouncedSavePreferences();
  }

  get displayedColumns() {
    return this.columns
      .filter(c => !c.isHidden)
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        return a.position - b.position;
      });
  }

  get filterableColumns() {
    return this.columns.filter(c => c.isFilterable);
  }

  get rowTemplate() {
    const selectorWidth = this.hasSelectorColumn
      ? `${SELECTOR_COLUMN_WIDTH}px`
      : ' ';

    const columnsWidth = this.displayedColumns
      .map(c => c.width)
      .map(width => {
        if (width === '*') return 'minmax(100px , 1fr)';
        if (/%/.test(width)) return width;

        return parseInt(width) + 'px';
      })
      .join(' ');

    const actionWidth =
      this.rowActions.length > 0 ? `${ACTIONS_COLUMN_WIDTH}px` : ' ';

    return `${selectorWidth} ${columnsWidth} ${actionWidth}`;
  }

  get totalWidth() {
    return this.displayedColumns.reduce((total, column) => {
      if (!column.headerElement) return total;
      return total + column.headerElement.scrollWidth;
    }, 0);
  }

  get currentRowCount() {
    return this.query.data?.length;
  }

  _onColumnUpdate() {
    this.setColumnOffsets();
    this._debouncedSavePreferences();
  }

  _savePreferences() {
    this.userPreferences = {
      filters: this.filters,
      columns: this.columns.map(column => ({
        name: column.name,
        width: column.width,
        isHidden: column.isHidden,
        isPinned: column.isPinned,
        position: column.position
      }))
    };
  }

  addColumn(columnDefinition) {
    const savedColumn = this.userPreferences?.columns?.find?.(
      c => c.name === columnDefinition.name
    );

    const column = new DataTableColumn(this, {
      ...columnDefinition,
      position: this.columns.length,
      ...(savedColumn || {})
    });

    console.log(column.name, column.position);

    column.on(EVENTS.DATA_TABLE.COLUMN_UPDATE, this._onColumnUpdate.bind(this));
    this.columns.push(column);
  }

  addRowAction(action) {
    this.rowActions.push(action);
  }

  moveColumn(column, newIndex) {
    const oldIndex = this.columns.indexOf(column);
    if (oldIndex === newIndex) return;
    this.columns.splice(oldIndex, 1);
    this.columns.splice(newIndex, 0, column);
    this.columns.forEach((col, index) => {
      col.position = index;
    });

    this._onColumnUpdate();
  }

  setColumnOffsets() {
    const pinnedColumns = this.displayedColumns.filter(
      column => column.isPinned
    );
    if (pinnedColumns.some(column => !column.headerElement)) return;

    let totalOffset = this.hasSelectorColumn ? 40 : 0;

    pinnedColumns.forEach(column => {
      const { width } = column.headerElement.getBoundingClientRect();
      column.pinnedOffset = totalOffset;
      totalOffset += width;
    });
  }

  resizeColumn(column, newWidth) {
    column.width = newWidth;
    this._onColumnUpdate();
  }

  setRowElement(id, element) {
    this._rowElements.set(element, id);
  }

  isRowSelected(row) {
    return this.selectedRowIds.includes(row.id);
  }

  resetFilter(name) {
    this.filters = { ...this.filters, [name]: undefined };
  }

  installListeners() {
    window.addEventListener('keydown', this._onRowKeyPress.bind(this));
  }

  _onRowKeyPress(e) {
    if (!isNumber(this.focusedRowIndex)) return;

    switch (e.key) {
      case KEYBOARD.ARROW_DOWN:
        if (this.focusedRowIndex === this.currentRowCount) return;
        e.preventDefault();
        this.focusedRowIndex++;
        break;
      case KEYBOARD.ARROW_UP:
        if (this.focusedRowIndex === 0) return;
        e.preventDefault();
        this.focusedRowIndex--;
        break;
      default:
        return;
    }
  }
}

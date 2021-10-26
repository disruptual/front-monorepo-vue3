import { DataTableColumn } from './DataTableColumn.model';
import { KEYBOARD } from '@dsp/core';
import { isNumber } from '@dsp/core';

const SELECTOR_COLUMN_WIDTH = 40;
const ACTIONS_COLUMN_WIDTH = 50;

export class DataTable {
  constructor({
    query,
    minRowSize,
    hasSelectorColumn,
    onRowDblClick,
    onFilterChange,
    tableElement = null
  }) {
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
    this._filters = {};
  }

  get filters() {
    return this._filters;
  }

  set filters(value) {
    this._filters = value;
    this.onFilterChange(this._filters);
  }

  get displayedColumns() {
    return this.columns
      .filter(c => !c.isHidden)
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        return 0;
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

  addColumn(column) {
    this.columns.push(new DataTableColumn(this, column));
  }

  addRowAction(action) {
    this.rowActions.push(action);
  }

  moveColumn(column, newIndex) {
    const oldIndex = this.columns.indexOf(column);
    if (oldIndex === newIndex) return;
    this.columns.splice(oldIndex, 1);
    this.columns.splice(newIndex, 0, column);
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
    this.setColumnOffsets();
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

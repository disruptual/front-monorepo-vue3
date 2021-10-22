import { DataTableColumn } from './DataTableColumn.model';

const SELECTOR_COLUMN_WIDTH = 40;
const ACTIONS_COLUMN_WIDTH = 50;

export class DataTable {
  constructor({ minRowSize, hasSelectorColumn, onRowDblClick }) {
    this.columns = [];
    this.selectedRowIds = [];
    this.visibleRowIds = [];
    this.rowActions = [];
    this.minRowSize = minRowSize;
    this.onRowDblClick = onRowDblClick;
    this.hasSelectorColumn = hasSelectorColumn;
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

  addColumn(column) {
    this.columns.push(new DataTableColumn(this, column));
  }

  addRowAction(action) {
    this.rowActions.push(action);
  }

  setColumnOffsets() {
    const pinnedColumns = this.displayedColumns.filter(
      column => column.isPinned
    );
    if (pinnedColumns.some(column => !column.headerElement)) return;

    let totalOffset = 40; // selector column width

    pinnedColumns.forEach(column => {
      const { width } = column.headerElement.getBoundingClientRect();
      column.pinnedOffset = totalOffset;
      totalOffset += width;
    });
  }

  setRowElement(id, element) {
    this._rowElements.set(element, id);
  }

  isRowSelected(row) {
    return this.selectedRowIds.includes(row.id);
  }
}

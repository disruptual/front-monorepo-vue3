import { debounce } from 'lodash-es';
import { DataTableColumn } from './DataTableColumn.model';
import { DataTableHighlight } from './DataTableHighlight.model';
import { EVENTS } from '@/utils/constants';

const SELECTOR_COLUMN_WIDTH = 40;
const ACTIONS_COLUMN_WIDTH = 50;

export class DataTable {
  constructor({
    id,
    query,
    minRowSize,
    hasSelectorColumn,
    hasSearchbar,
    onGoToDetail,
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
    this.highlights = [];
    this.minRowSize = minRowSize;
    this.focusedRowIndex = null;
    this.hasSelectorColumn = hasSelectorColumn;
    this.hasSearchbar = hasSearchbar;
    this.onGoToDetail = onGoToDetail;
    this.onFilterChange = onFilterChange;

    this.tableElement = tableElement;

    this._debouncedSavePreferences = debounce(
      this._savePreferences.bind(this),
      1000
    );
    this.filters = this.userPreferences?.filters || {};
    this.resetPreferences = this.resetPreferences.bind(this);
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

  get highlightableColumns() {
    return this.columns.filter(c => c.isHighlightable);
  }

  get rowTemplate() {
    const selectorWidth = this.selectorColumnWidth
      ? `${this.selectorColumnWidth}px`
      : ' ';

    const columnsWidth = this.displayedColumns
      .map(c => c.width)
      .map(width => {
        if (width === '*') return 'minmax(100px , 1fr)';
        if (/%/.test(width)) return width;

        return parseInt(width) + 'px';
      })
      .join(' ');

    const actionWidth = this.actionColumnWidth
      ? `${ACTIONS_COLUMN_WIDTH}px`
      : ' ';

    return `${selectorWidth} ${columnsWidth} ${actionWidth}`;
  }

  get selectorColumnWidth() {
    return this.hasSelectorColumn ? SELECTOR_COLUMN_WIDTH : 0;
  }

  get actionColumnWidth() {
    return this.hasActionColumn ? ACTIONS_COLUMN_WIDTH : 0;
  }

  get totalWidth() {
    return this.displayedColumns.reduce((total, column) => {
      if (!column.headerElement) return total;

      return total + column.headerElement.offsetWidth;
    }, this.selectorColumnWidth + this.actionColumnWidth);
  }

  get currentRowCount() {
    return this.query.data?.length;
  }

  get hasActionColumn() {
    return this.rowActions.length > 0 || !!this.onGoToDetail;
  }

  _onColumnUpdate() {
    this._setColumnOffsets();
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

  _setColumnOffsets() {
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

  resetPreferences() {
    localStorage.removeItem(this.storageKey);
    window.location.reload();
  }

  addColumn(columnDefinition) {
    const savedColumn = this.userPreferences?.columns?.find?.(
      c => c.name === columnDefinition.name
    );

    const column = new DataTableColumn({
      ...columnDefinition,
      position: this.columns.length,
      ...(savedColumn || {})
    });

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

  resetFilter(name) {
    this.filters = { ...this.filters, [name]: undefined };
  }

  addHighlight(highlight) {
    this.highlights.push(new DataTableHighlight(highlight));
  }

  removeHighlight(highlight) {
    this.highlights.splice(this.highlights.indexOf(highlight), 1);
  }

  getRowHighlight(row) {
    return this.columns
      .map(column => this.getHighlightMatch(column, row))
      .filter(Boolean)[0];
  }

  getHighlightMatch(column, row) {
    const highlights = this.highlights.filter(
      h => h.column.name === column.name && h.isActive
    );
    const predicate = column.getHighlightPredicate(row);
    let result = null;

    for (let highlight of highlights) {
      if (highlight.isMatch(predicate)) {
        result = highlight;
      }
    }
    return result;
  }
}

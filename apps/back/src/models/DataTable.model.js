import { debounce } from 'lodash-es';
import { DataTableColumn } from './DataTableColumn.model';
import { DataTableHighlight } from './DataTableHighlight.model';
import { EVENTS } from '@/utils/constants';

const SELECTOR_COLUMN_WIDTH = 40;
const ACTIONS_COLUMN_WIDTH = 50;

export class DataTable {
  constructor({
    id,
    minRowSize,
    hasSelectorColumn,
    hasSearchbar,
    onGoToDetail,
    sortDataFn,
    onFilterChange,
    tableElement = null
  }) {
    if (!id) {
      throw new Error('DataTable id is required');
    }
    this.id = id;
    this.columns = [];
    this.selectedRowIds = [];
    this.visibleRowIds = [];
    this.rowActions = [];
    this.minRowSize = minRowSize;
    this.focusedRowIndex = null;
    this.hasSelectorColumn = hasSelectorColumn;
    this.hasSearchbar = hasSearchbar;
    this.onGoToDetail = onGoToDetail;
    this.sortDataFn = sortDataFn;
    this.onFilterChange = onFilterChange;
    this.customFilters = [];
    this.customActions = [];

    this.tableElement = tableElement;

    this.debouncedSavePreferences = debounce(
      this._savePreferences.bind(this),
      1000
    );
    this.highlights = this.highlightFromStorage || [];
    this.filters = this.userPreferences?.filters || {};
    this.resetPreferences = this.resetPreferences.bind(this);
  }

  get storageKey() {
    return `dsp-data-table`;
  }

  get userPreferences() {
    const raw = localStorage.getItem(this.storageKey);

    return raw ? JSON.parse(raw)[this.id] : null;
  }

  set userPreferences(prefs) {
    const rawPreferences = localStorage.getItem(this.storageKey);
    const preferences = rawPreferences ? JSON.parse(rawPreferences) : {};

    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        ...preferences,
        [this.id]: prefs
      })
    );
  }

  get filters() {
    return this._filters;
  }

  set filters(value) {
    this._filters = value;
    this.onFilterChange(this._filters);
    this.debouncedSavePreferences();
  }

  get highlights() {
    return this._highlights;
  }

  set highlights(value) {
    this._highlights = value;
    this.debouncedSavePreferences();
  }

  get highlightFromStorage() {
    return this.userPreferences?.highlights?.map(
      highlight => new DataTableHighlight(JSON.parse(highlight))
    );
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
    // if the grid contains at least one fluid width column,
    // we want it to be the size of the parent element to allow the guild column to expand
    if (this.displayedColumns.some(col => col.width === '*')) {
      return this.tableElement?.parentElement?.offsetWidth;
    }

    return this.displayedColumns.reduce((total, column) => {
      if (!column.headerElement) return total;
      return total + column.headerElement.offsetWidth;
    }, this.selectorColumnWidth + this.actionColumnWidth);
  }

  get hasActionColumn() {
    return this.rowActions.length > 0 || !!this.onGoToDetail;
  }

  _onColumnUpdate() {
    this._setColumnOffsets();
    this.debouncedSavePreferences();
  }

  _savePreferences() {
    this.userPreferences = {
      filters: this.filters,
      highlights: this.highlights.map(highlight => highlight.getPlainObject()),
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
    this.userPreferences = {};
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

  addCustomFilter(filter) {
    this.customFilters.push(filter);
  }

  addCustomAction(action) {
    this.customActions.push(action);
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
    const newHighlight = new DataTableHighlight(highlight);
    this.highlights = [...this.highlights, newHighlight];
  }

  removeHighlight(highlight) {
    this.highlights = this.highlights.filter(function (val) {
      return val.name !== highlight.name;
    });
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

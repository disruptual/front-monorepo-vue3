import { computed, inject } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';

const SELECTOR_COLUMN_WIDTH = 40;
const ACTIONS_COLUMN_WIDTH = 50;

export const useDataTable = () => {
  const [data, context] = inject(CONTEXT_KEYS.DATATABLE);

  const displayedColumns = computed(() =>
    context.value.state.columns
      .filter(c => !c.isHidden)
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        return 0;
      })
  );

  const rowTemplate = computed(() => {
    const columnsWidth = displayedColumns.value
      .map(c => c.width)
      .map(width => {
        if (width === '*') return '1fr';
        if (/%/.test(width)) return width;

        return parseInt(width) + 'px';
      })
      .join(' ');

    const actionWidth = hasRowAction.value ? `${ACTIONS_COLUMN_WIDTH}px` : ' ';
    return `${SELECTOR_COLUMN_WIDTH}px ${columnsWidth} ${actionWidth}`;
  });

  const hasRowAction = computed(
    () => context.value.state.rowActions.length > 0
  );

  const toggleRow = rows => {
    context.value.actions.setSelectedRows(rows);
  };

  return {
    data,
    context,
    displayedColumns,
    hasRowAction,
    toggleRow,
    rowTemplate
  };
};

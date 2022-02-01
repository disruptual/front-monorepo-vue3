<script>
export default { name: 'DataTableFilterTags' };
</script>

<script setup>
import { inject, computed } from 'vue';
import { CONTEXT_KEYS, DATATABLE_COLUMN_TYPES } from '@/utils/constants';
import frLocale from 'date-fns/locale/fr';
import { format as formatDate } from 'date-fns';

const { model } = inject(CONTEXT_KEYS.DATATABLE);

const activeFilters = computed(() =>
  Object.entries(model.filters)
    .filter(([key, value]) => {
      if (!value) return false;
      if (value === '') return false;
      const column = model.columns.find(col =>
        [col.filterName, col.name].includes(key)
      );
      if (!column) return false;
      const isUndefinedDate =
        column.type === DATATABLE_COLUMN_TYPES.DATE &&
        !value.before &&
        !value.after;
      if (isUndefinedDate) {
        return false;
      }

      return true;
    })
    .map(([key, value]) => ({
      name: key,
      label: model.columns.find(col => [col.filterName, col.name].includes(key))
        ?.label,
      value
    }))
);

const formatDateLabel = dateStr => {
  return formatDate(new Date(dateStr), 'dd-MM-yyyy', {
    locale: frLocale
  });
};

const getFilterLabel = filter => {
  const { type, filterTag } = model.columns.find(col =>
    [col.name, col.filterName].includes(filter.name)
  );

  if (type === DATATABLE_COLUMN_TYPES.DATE) {
    if (!filter.value.after) {
      return `${filter.label}: Après le ${formatDateLabel(
        filter.value.before
      )}`;
    }

    if (!filter.value.before) {
      return `${filter.label}: Avant le ${formatDateLabel(
        filter.value.before
      )}`;
    }

    return `${filter.label}: Entre le ${formatDateLabel(
      filter.value.after
    )} et le ${formatDateLabel(filter.value.before)}`;
  }

  if (type === DATATABLE_COLUMN_TYPES.BOOLEAN && filterTag) {
    return `${filterTag}`;
  }

  return `${filter.label}: ${filter.value}`;
};
</script>

<template>
  <div>
    <dsp-swiper v-show="activeFilters.length > 0" class="active-filters">
      <dsp-swiper-item v-for="filter in activeFilters" :key="filter.name">
        <dsp-button
          right-icon="remove"
          is-rounded
          @click="model.resetFilter(filter.name)"
        >
          {{ getFilterLabel(filter) }}
        </dsp-button>
      </dsp-swiper-item>
    </dsp-swiper>
  </div>
</template>

<style lang="scss" scoped>
.active-filters {
  padding: var(--spacing-xs);
  background-color: var(--color-surface);
  font-size: var(--font-size-sm);
}
</style>

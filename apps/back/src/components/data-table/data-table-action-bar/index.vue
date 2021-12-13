<script>
export default { name: 'DataTableActionBar' };
</script>

<script setup>
import { inject, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { CONTEXT_KEYS } from '@/utils/constants';
import { useDevice, vTooltip } from '@dsp/ui';

import DataTableFilterDrawer from '../data-table-filter-drawer/index.vue';
import DataTableHighlightManager from '../data-table-highlight-manager/index.vue';

const { t } = useI18n();
const device = useDevice();

const { model } = inject(CONTEXT_KEYS.DATATABLE);

const isColumnsDropdownOpened = ref(false);
const isHighlightDropdownOpened = ref(false);
const isHighlightManagerOpened = ref(false);
const selectedHighlight = ref(null);

const selectedCount = computed(() => model.selectedRowIds.length);
const isActionDisabled = action =>
  selectedCount.value === 0 || (selectedCount.value > 1 && !action.canBatch);

const activeFilters = computed(() =>
  Object.entries(model.filters)
    .filter(([, value]) => value && value !== '')
    .map(([key, value]) => ({
      name: model.columns.find(col => col.name === key).label,
      value
    }))
);

const addHighlight = () => {
  selectedHighlight.value = null;
  isHighlightManagerOpened.value = true;
};

const editHighlight = highlight => {
  selectedHighlight.value = highlight;
  isHighlightManagerOpened.value = true;
};
</script>

<template>
  <dsp-flex
    class="data-table-action-bar"
    align="center"
    justify="space-between"
  >
    <div v-if="model.hasSelectorColumn && !device.isMobile">
      {{ t('dataTable.actionBar.selectedCount', { count: selectedCount }) }}
    </div>
    <dsp-flex gap="xs">
      <dsp-plain-button
        v-for="action in model.rowActions"
        :key="action.label"
        v-tooltip="action.label"
        :left-icon="action.icon"
        :disabled="isActionDisabled(action)"
        @click="triggerAction(action)"
      >
        <span v-tooltip="action.label">
          <dsp-icon :icon="action.icon" />
        </span>
      </dsp-plain-button>
      <DataTableFilterDrawer />

      <dsp-dropdown v-model:isOpened="isColumnsDropdownOpened" with-toggle-icon>
        <template #toggle>
          <span v-tooltip="'Colonnes'">
            <dsp-icon icon="columns" />
          </span>
        </template>
        <template #menu>
          <dsp-dropdown-item
            v-for="column in model.columns"
            :key="column.name"
            :auto-close="false"
          >
            <dsp-checkbox
              :label="column.label"
              :model-value="!column.isHidden"
              @update:modelValue="column.toggleVisible()"
            />
          </dsp-dropdown-item>
        </template>
      </dsp-dropdown>

      <dsp-dropdown
        v-model:isOpened="isHighlightDropdownOpened"
        with-toggle-icon
      >
        <template #toggle>
          <span v-tooltip="'Surlignages'">
            <dsp-icon icon="highlight" />
          </span>
        </template>
        <template #menu>
          <dsp-dropdown-item
            v-for="(highlight, index) in model.highlights"
            :key="index"
            :auto-close="false"
          >
            <dsp-flex align="center">
              <dsp-checkbox
                v-model="highlight.isActive"
                :label="highlight.name"
              />
              <dsp-icon-button
                icon="remove"
                @click="model.removeHighlight(highlight)"
              />
              <dsp-icon-button icon="edit" @click="editHighlight(highlight)" />
            </dsp-flex>
          </dsp-dropdown-item>
          <dsp-dropdown-item @click="addHighlight">
            <dsp-flex align="center" gap="sm">
              <dsp-icon icon="plus" />
              Ajouter
            </dsp-flex>
          </dsp-dropdown-item>
        </template>
      </dsp-dropdown>
    </dsp-flex>
  </dsp-flex>
  <dsp-flex v-show="activeFilters.length > 0" gap="sm" class="active-filters">
    <dsp-button
      v-for="filter in activeFilters"
      :key="filter.name"
      right-icon="remove"
      is-rounded
      @click="model.resetFilter(filter.name)"
    >
      {{ filter.name }}: {{ filter.value }}
    </dsp-button>
  </dsp-flex>

  <DataTableHighlightManager
    v-model:isOpened="isHighlightManagerOpened"
    :highlight="selectedHighlight"
  />
</template>

<style lang="scss" scoped>
.data-table-action-bar {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-surface);
}

.active-filters {
  padding: var(--spacing-xs);
  background-color: var(--color-surface);
}
</style>

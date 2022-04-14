<script>
export default { name: 'DataTableActionBar' };
</script>

<script setup>
import { inject, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { debounce } from 'lodash-es';
import { CONTEXT_KEYS } from '@/utils/constants';
import { useDevice, vTooltip } from '@dsp/ui';

import DataTableFilterDrawer from '../data-table-filter-drawer/index.vue';
import DataTableHighlightManager from '../data-table-highlight-manager/index.vue';
import DataTableFilterTags from './filter-tags.vue';

const { t } = useI18n();
const device = useDevice();

const { model, query } = inject(CONTEXT_KEYS.DATATABLE);

const isColumnsDropdownOpened = ref(false);
const isHighlightDropdownOpened = ref(false);
const isHighlightManagerOpened = ref(false);
const selectedHighlight = ref(null);

const selectedCount = computed(() => model.selectedRowIds.length);
const isActionDisabled = action =>
  selectedCount.value === 0 || (selectedCount.value > 1 && !action.canBatch);

const hiddenInActionBar = action => action.hiddenInActionBar;

const addHighlight = () => {
  selectedHighlight.value = null;
  isHighlightManagerOpened.value = true;
};

const editHighlight = highlight => {
  selectedHighlight.value = highlight;
  isHighlightManagerOpened.value = true;
};

const triggerAction = action => {
  action.action(
    model.selectedRowIds.map(id =>
      query.data.value.find(entity => entity.id === id)
    )
  );
};

const search = computed({
  get() {
    return model.filters.query;
  },
  set: debounce(val => {
    if (val) {
      model.filters = { ...model.filters, query: val };
    } else {
      const { query, ...filters } = model.filters;
      model.filters = filters;
    }
  }, 1000)
});

const onUpdateHighlight = () => {
  model.debouncedSavePreferences();
};
</script>

<template>
  <header class="data-table-action-bar">
    <dsp-flex
      align="center"
      direction="row-reverse"
      justify="space-between"
      class="actions"
    >
      <dsp-flex gap="xs">
        <dsp-plain-button
          v-for="action in model.customActions"
          :key="action.label"
          @click="action.action"
        >
          <dsp-flex gap="sm">
            <dsp-icon :icon="action.icon" />
            <span v-if="device.isDesktop">{{ action.label }}</span>
          </dsp-flex>
        </dsp-plain-button>

        <dsp-plain-button
          v-for="action in model.rowActions"
          :key="action.label"
          :disabled="isActionDisabled(action)"
          @click="triggerAction(action)"
        >
          <dsp-flex v-if="!hiddenInActionBar(action)" gap="sm">
            <dsp-icon :icon="action.icon" />
            <span v-if="device.isDesktop">{{ action.label }}</span>
          </dsp-flex>
        </dsp-plain-button>

        <DataTableFilterDrawer v-if="model.filterableColumns.length > 0" />

        <dsp-dropdown
          v-model:isOpened="isColumnsDropdownOpened"
          with-toggle-icon
        >
          <template #toggle>
            <dsp-flex gap="sm">
              <dsp-icon icon="columns" />
              <span v-if="device.isDesktop">Colonnes</span>
            </dsp-flex>
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
            <dsp-flex gap="sm">
              <dsp-icon icon="highlight" />
              <span v-if="device.isDesktop">Surlignages</span>
            </dsp-flex>
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
                  @update:modelValue="onUpdateHighlight()"
                />
                <dsp-icon-button
                  icon="remove"
                  is-plain
                  @click="model.removeHighlight(highlight)"
                />
                <dsp-icon-button
                  icon="edit"
                  is-plain
                  @click="editHighlight(highlight)"
                />
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
      <div v-if="model.hasSelectorColumn && !device.isMobile">
        {{ t('dataTable.actionBar.selectedCount', { count: selectedCount }) }}
      </div>
    </dsp-flex>
    <dsp-input-search
      v-if="model.hasSearchbar"
      v-model="search"
      button-position="right"
      class="search-bar"
      placeholder="Rechercher"
    />
  </header>

  <DataTableFilterTags />

  <DataTableHighlightManager
    v-model:isOpened="isHighlightManagerOpened"
    :highlight="selectedHighlight"
  />
</template>

<style lang="scss" scoped>
.data-table-action-bar {
  --action-bar-padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-surface);

  @include not-mobile {
    padding: var(--action-bar-padding);
  }
}

.actions {
  @include mobile-only {
    padding: var(--action-bar-padding);
  }
}

.search-bar {
  @include not-mobile {
    max-width: fit-content;
    margin-left: auto;
    border-radius: var(--border-radius-pill);
  }
}
</style>

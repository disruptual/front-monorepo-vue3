<script>
export default { name: 'DataTableActionBar' };
</script>

<script setup>
import { inject, ref, computed } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { model } = inject(CONTEXT_KEYS.DATATABLE);

const isColumnsDropdownOpened = ref(false);

const selectedCount = computed(() => model.selectedRowIds.length);
const isActionDisabled = action =>
  selectedCount.value === 0 || (selectedCount.value > 1 && !action.canBatch);
</script>

<template>
  <dsp-flex
    class="data-table-action-bar"
    align="center"
    justify="space-between"
  >
    <div v-if="model.hasSelectorColumn">
      {{ t('dataTable.actionBar.selectedCount', { count: selectedCount }) }}
    </div>
    <dsp-flex gap="sm">
      <dsp-button
        v-for="action in model.rowActions"
        :key="action.label"
        :left-icon="action.icon"
        :disabled="isActionDisabled(action)"
        is-outlined
        @click="triggerAction(action)"
      >
        {{ action.label }}
      </dsp-button>

      <dsp-dropdown v-model:isOpened="isColumnsDropdownOpened" with-toggle-icon>
        <template #toggle>Colonnes</template>
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
    </dsp-flex>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.data-table-action-bar {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-surface);
}
</style>

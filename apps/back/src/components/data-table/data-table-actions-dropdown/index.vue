<script>
export default { name: 'DataTableActionsDropdown' };
</script>

<script setup>
import { ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { CONTEXT_KEYS } from '@/utils/constants';

const props = defineProps({
  row: { type: Object, required: true }
});

const { t } = useI18n();
const isOpened = ref(false);

const { model } = inject(CONTEXT_KEYS.DATATABLE);
const triggerAction = action => {
  action.action([props.row]);
};
</script>

<template>
  <dsp-dropdown v-model:isOpened="isOpened">
    <template #toggle>
      <dsp-icon icon="ellipsisH" />
    </template>
    <template #menu>
      <dsp-dropdown-item
        v-if="model.onGoToDetail"
        @click="model.onGoToDetail(props.row)"
      >
        {{ t('dataTable.actions.goToDetail') }}
      </dsp-dropdown-item>
      <dsp-dropdown-item
        v-for="action in model.rowActions"
        :key="action.label"
        @click="triggerAction(action)"
      >
        {{ action.label }}
      </dsp-dropdown-item>
    </template>
  </dsp-dropdown>
</template>

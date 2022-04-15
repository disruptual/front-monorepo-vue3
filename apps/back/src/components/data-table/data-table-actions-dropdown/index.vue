<script>
export default { name: 'DataTableActionsDropdown' };
</script>

<script setup>
import { ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { CONTEXT_KEYS } from '@/utils/constants';

const props = defineProps({
  row: { type: Object, required: true }
});

const { t } = useI18n();
const { push } = useRouter();
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
      <dsp-flex justify="center" align="center">
        <dsp-dropdown-item
          v-if="model.onGoToDetail"
          @click="push(model.onGoToDetail(props.row))"
        >
          {{ t('dataTable.actions.goToDetail') }}
        </dsp-dropdown-item>
        <router-link
          class="go-to-blank"
          :to="model.onGoToDetail(props.row)"
          target="_blank"
        >
          <dsp-icon size="md" icon="externalLink" />
        </router-link>
      </dsp-flex>
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

<style lang="scss" scoped>
.go-to-blank {
  color: var(--color-text);
  padding: 0 var(--spacing-xs);
  border-left: 1px solid var(--color-separator);
  :hover {
    color: var(--color-brand-500);
  }
}
</style>

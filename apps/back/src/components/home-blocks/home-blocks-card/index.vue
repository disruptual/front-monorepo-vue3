<script>
export default { name: 'CardBlockEditor' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDevice } from '@dsp/ui';
import { HOME_BLOCK_TYPES, HOME_BLOCK_QUERIES_BY_TYPE } from '@dsp/business';
import { HOME_BLOCK_MAPPED_TYPE } from '@/utils/homeBlockDefinitions';

import HomeBlocksFields from '@/components/home-blocks/home-blocks-fields/index.vue';

const { t } = useI18n();
const device = useDevice();
const isOptionsOpened = ref(false);
const props = defineProps({
  isEditing: { type: Boolean, required: true },
  block: { type: null, required: true },
  fieldValue: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['delete', 'dragstart', 'dragend', 'change:type']);

const deleteBlock = block => {
  emit('delete', block);
};

const onTypeChange = event => {
  isOptionsOpened.value = false;
  emit('change:type', { blockId: props.block.id, event });
};

const typeOptions = computed(() =>
  Object.values(HOME_BLOCK_TYPES).map(b => ({
    label: t(`homeBlocks.types.${b}`),
    value: b
  }))
);

const queryOptions = computed(() =>
  HOME_BLOCK_QUERIES_BY_TYPE[props.fieldValue.type].map(q => ({
    label: t(`homeBlocks.queries.${q}`),
    value: q
  }))
);

const fieldOptions = computed(
  () => HOME_BLOCK_MAPPED_TYPE[props.fieldValue.type]
);
</script>

<template>
  <dsp-flex>
    <dsp-icon-button
      v-if="device.isDesktop"
      class="dragable-block"
      type="button"
      icon="draggable"
      size="sm"
      @mousedown="emit('dragstart')"
    />

    <!-- the use of v-show is important, 
         we want the component to stay initialized when switching view mode, 
         otherwise the fields get removed from the form 
    -->
    <div v-show="isEditing" class="card-block-editor__main-fields">
      <dsp-flex
        class="container"
        justify="flex-start"
        align="flex-start"
        :gap="device.isTablet || device.isMobile ? 'xs' : 'lg'"
      >
        <dsp-smart-form-field
          v-slot="slotProps"
          :name="`${props.block.id}.type`"
          :initial-value="block.type"
          required
        >
          <dsp-form-control
            v-slot="{ on, ...formControlProps }"
            v-model="slotProps.field.value"
            v-bind="slotProps"
            :label="t('homeBlocks.form.type')"
          >
            <dsp-select
              v-bind="formControlProps"
              :options="typeOptions"
              v-on="on"
              @change="onTypeChange"
            />
          </dsp-form-control>
        </dsp-smart-form-field>

        <dsp-smart-form-field
          v-if="props.fieldValue?.type"
          v-slot="slotProps"
          :name="`${props.block.id}.query`"
          :initial-value="block.query"
          required
        >
          <dsp-form-control
            v-slot="{ on, ...formControlProps }"
            v-model="slotProps.field.value"
            v-bind="slotProps"
            :label="t('homeBlocks.form.request')"
          >
            <dsp-select
              v-bind="formControlProps"
              :options="queryOptions"
              v-on="on"
            />
          </dsp-form-control>
        </dsp-smart-form-field>
      </dsp-flex>
    </div>

    <dsp-icon-button
      v-if="isEditing"
      class="card-block-editor__remove-button"
      type="button"
      icon="trash"
      size="sm"
      is-outlined
      @click="deleteBlock(block)"
    />

    <dsp-flex
      v-if="!isEditing"
      class="card-block-editor"
      direction="column"
      gap="sm"
    >
      <dsp-flex gap="sm" align="center" class="card-block-editor__title">
        Titre:
        <span v-if="fieldValue.options?.title?.content">
          {{ fieldValue.options?.title?.content }}
        </span>
        <span v-else class="card-block-editor__missing-field">A définir</span>
      </dsp-flex>

      <dsp-flex gap="sm">
        Type:
        <span v-if="fieldValue.type">
          {{ t(`homeBlocks.types.${fieldValue.type}`) }}
        </span>
        <span v-else class="card-block-editor__missing-field">A définir</span>
        Requête:
        <span v-if="fieldValue.query">
          {{ t(`homeBlocks.queries.${fieldValue.query}`) }}
        </span>
        <span v-else class="card-block-editor__missing-field">A définir</span>
      </dsp-flex>
    </dsp-flex>
  </dsp-flex>
  <div v-show="isEditing" v-if="fieldOptions" class="home-block-card__fields">
    <HomeBlocksFields :mapped-options="fieldOptions" :block="props.block" />
  </div>
</template>

<style lang="scss" scoped>
.card-block-editor__main-fields {
  padding: 0 var(--spacing-sm);
}
.card-block-editor {
  background-color: v-bind('options?.backgroundColor');
  padding: var(--spacing-sm);
}

.container {
  width: 100%;
}

.card-actions {
  height: 100%;
}

.home-block-card__fields {
  background: var(--color-gray-200);
  padding: var(--spacing-sm);
}

.card-block-editor__remove-button {
  margin-left: auto;
  align-self: flex-start;
}

.card-block-editor__title {
  font-size: var(--font-size-lg);
}

.card-block-editor__missing-field {
  color: var(--color-error-500);
}
</style>

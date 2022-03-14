<script>
export default { name: 'CardBlockEditor' };
</script>

<script setup>
import { computed, watch, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDevice } from '@dsp/ui';
import { HOME_BLOCK_TYPES, HOME_BLOCK_QUERIES } from '@dsp/business';
import {
  HOME_BLOCK_MAPPED_TYPE,
  HOME_BLOCK_OPTIONS_DEFAULTS
} from '@/utils/homeBlockDefinitions';

import HomeBlocksFields from '@/components/home-blocks/home-blocks-fields/index.vue';

const { t } = useI18n();
const device = useDevice();
const isOptionsOpened = ref(false);
const props = defineProps({
  modelValue: { type: Object, required: true },
  isEditing: { type: Boolean, required: true },
  index: { type: Number, required: true },
  blockValue: { type: null, required: true }
});
const emit = defineEmits([
  'update:modelValue',
  'delete',
  'draggableStart',
  'change:type'
]);

const block = ref({ ...props.modelValue });
watch(
  block,
  newBlock => {
    emit('update:modelValue', newBlock);
  },
  { deep: true }
);

const deleteBlock = block => {
  emit('delete', block);
};

const onTypeChange = event => {
  isOptionsOpened.value = false;
  emit('change:type', { index: props.index, event });

  // if (!selectQueryRef.value) return;
  // selectQueryRef.value.selectedIndex = null;
};

const typeOptions = computed(() =>
  Object.values(HOME_BLOCK_TYPES).map(b => ({ label: b, value: b }))
);

const homeBlocksQueries = computed(
  () => HOME_BLOCK_QUERIES[props.blockValue.type]
);
const queryOptions = computed(() =>
  Object.values(homeBlocksQueries.value).map(b => ({ label: b, value: b }))
);
</script>

<template>
  <dsp-grid
    v-if="isEditing"
    rows="auto auto"
    columns="8fr 2fr"
    gap="md"
    class="card-block-editor--editable"
  >
    <dsp-grid-item>
      <dsp-flex
        class="container"
        justify="flex-start"
        align="center"
        :gap="device.isTablet || device.isMobile ? 'xs' : 'xl'"
      >
        <dsp-smart-form-field
          v-slot="slotProps"
          :name="`${index}.${HOME_BLOCK_MAPPED_TYPE.name.name}`"
          :initial-value="block.name"
        >
          <dsp-form-control
            v-model.number="slotProps.field.value"
            v-bind="slotProps"
            :label="t('homeBlocks.form.name')"
          />
        </dsp-smart-form-field>
        <dsp-smart-form-field
          v-slot="slotProps"
          :name="`${index}.${HOME_BLOCK_MAPPED_TYPE.type.name}`"
          :initial-value="block.type"
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
          v-if="blockValue?.type"
          v-slot="slotProps"
          :name="`${index}.${HOME_BLOCK_MAPPED_TYPE.query.name}`"
          :initial-value="block.query"
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
    </dsp-grid-item>
    <dsp-grid-item>
      <dsp-flex class="card-actions" gap="sm" justify="center" align="center">
        <dsp-icon-button
          class="dragable-block"
          type="button"
          icon="draggable"
          size="sm"
          @mousedown="emit('draggableStart')"
        />
        <dsp-icon-button
          class="remove-block"
          type="button"
          icon="trash"
          size="sm"
          @click="deleteBlock(block)"
        />
      </dsp-flex>

      <div class="icon-draggable" />
    </dsp-grid-item>
    <dsp-grid-item class="option-fields" column="1/-1">
      <dsp-icon-button
        class="remove-block"
        type="button"
        :icon="isOptionsOpened ? 'chevronDown' : 'chevronUp'"
        size="sm"
        :disabled="!blockValue?.query"
        @click="isOptionsOpened = !isOptionsOpened"
      />
      <HomeBlocksFields
        v-if="isOptionsOpened"
        v-model="block"
        :mapped-options="HOME_BLOCK_MAPPED_TYPE[blockValue.type]"
        :index="index"
      />
    </dsp-grid-item>
  </dsp-grid>

  <dsp-flex v-else class="card-block-editor" direction="column" gap="sm">
    <dsp-flex gap="sm" align="center">
      <span>Nom: {{ block.name }}</span>
      <span v-if="block.options?.title?.content">
        Titre: {{ block.options?.title?.content }}
      </span>
    </dsp-flex>

    <dsp-flex gap="sm">
      <span>Type: {{ block.type }}</span>
      <span>Requête: {{ block.query }}</span>
    </dsp-flex>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.card-block-editor--editable {
  background-color: v-bind('options?.backgroundColor');
  padding: var(--spacing-sm);
}
.card-block-editor {
  background-color: v-bind('options?.backgroundColor');
  padding: var(--spacing-sm);
}

.container {
  width: 100%;
}

.option-fields {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

.card-actions {
  height: 100%;
}
</style>

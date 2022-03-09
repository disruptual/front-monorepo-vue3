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
const selectQueryRef = ref(false);
const props = defineProps({
  modelValue: { type: Object, required: true },
  isEditing: { type: Boolean, required: true }
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

const onChangeType = type => {
  const { position, name, id } = block.value;
  block.value = {
    type,
    position,
    name,
    id,
    query: null,
    options: HOME_BLOCK_OPTIONS_DEFAULTS[type]
  };
  if (!selectQueryRef.value) return;
  selectQueryRef.value.selectedIndex = null;
};

const onChangeQuery = query => {
  block.value.query = query;
};

const getHomeBlocksQueries = computed(
  () => HOME_BLOCK_QUERIES[block.value.type]
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
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="block.name"
          :label="t('homeBlocks.form.name')"
        >
          <dsp-input-text
            spellcheck="false"
            v-bind="formControlProps"
            v-on="on"
          />
        </dsp-form-control>
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="block.type"
          :label="t('homeBlocks.form.type')"
        >
          <select
            v-bind="formControlProps"
            v-on="on"
            @change="onChangeType($event.target.value)"
          >
            <option disabled :value="null" :selected="!block.type">
              {{ t('homeBlocks.form.type') }}
            </option>
            <option
              v-for="homeBlockType in HOME_BLOCK_TYPES"
              :key="homeBlockType"
              :value="homeBlockType"
            >
              {{ homeBlockType }}
            </option>
          </select>
        </dsp-form-control>
        <dsp-form-control
          v-if="block.type"
          v-slot="{ on, ...formControlProps }"
          v-model="block.query"
          :label="t('homeBlocks.form.request')"
        >
          <select
            ref="refSelectQuery"
            v-bind="formControlProps"
            v-on="on"
            @change="onChangeQuery($event.target.value)"
          >
            <option disabled :value="null" :selected="!block.query">
              {{ t('homeBlocks.form.request') }}
            </option>
            <option
              v-for="query in getHomeBlocksQueries"
              :key="query"
              :value="query"
            >
              {{ query }}
            </option>
          </select>
        </dsp-form-control>
      </dsp-flex>
    </dsp-grid-item>
    <dsp-grid-item>
      <dsp-flex class="card-actions" gap="sm" justify="center" align="center">
        <dsp-icon-button
          class="dragable-block"
          icon="draggable"
          size="sm"
          @mousedown="emit('draggableStart')"
        />
        <dsp-icon-button
          class="remove-block"
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
        :icon="isOptionsOpened ? 'chevronDown' : 'chevronUp'"
        size="sm"
        :disabled="block.query ? false : true"
        @click="isOptionsOpened = !isOptionsOpened"
      />
      <HomeBlocksFields
        v-if="isOptionsOpened"
        v-model="block"
        :mapped-options="HOME_BLOCK_MAPPED_TYPE[block.type]"
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
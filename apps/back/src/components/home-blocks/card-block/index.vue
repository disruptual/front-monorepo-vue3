<script>
export default { name: 'CardBlockEditor' };
</script>

<script setup>
import { computed, ref, watch } from 'vue';
import { useDevice } from '@dsp/ui';
import {
  HOME_BLOCK_TYPES,
  HOME_BLOCK_QUERIES,
  HOME_BLOCK_MAPPED_TYPE
} from '@dsp/business';

import HomeBlocksFields from '@/components/home-blocks/home-blocks-fields/index.vue';

const device = useDevice();
const isOptionsOpened = ref(false);
const refSelectQuery = ref(false);
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

const block = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

const deleteBlock = block => {
  emit('delete', block);
};

const onChangeType = type => {
  block.value.type = type;
  block.value = { ...block.value, query: null };
  if (!refSelectQuery.value) return;
  refSelectQuery.value.selectedIndex = null;
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
          label="Nom"
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
          label="Type"
        >
          <select
            v-bind="formControlProps"
            v-on="on"
            @change="onChangeType($event.target.value)"
          >
            <option disabled :value="null">Type</option>
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
          label="Requête"
        >
          <select
            ref="refSelectQuery"
            v-bind="formControlProps"
            v-on="on"
            @change="onChangeQuery($event.target.value)"
          >
            <option
              :selected="block.query ? false : true"
              disabled
              :value="null"
            >
              Requête
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

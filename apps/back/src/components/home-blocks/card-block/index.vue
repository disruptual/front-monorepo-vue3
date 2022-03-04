<script>
export default { name: 'CardBlockEditor' };
</script>

<script setup>
import { computed } from 'vue';
import {
  HOME_BLOCK_TYPES,
  HOME_BLOCK_QUERIES,
  HOME_BLOCK_MAPPED_TYPE
} from '@dsp/business';

import HomeBlocksFields from '@/components/home-blocks/home-blocks-fields/index.vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  isEditing: { type: Boolean, required: true }
});

const emit = defineEmits(['update:modelValue', 'delete']);

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
</script>

<template>
  <dsp-grid
    v-if="isEditing"
    :columns="2"
    gap="md"
    class="card-block-editor--editable"
  >
    <dsp-grid-item :column="1">
      <dsp-flex gap="sm" align="center">
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
      </dsp-flex>

      <dsp-flex gap="sm">
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="block.type"
          label="Type"
          required
        >
          <select v-bind="formControlProps" v-on="on">
            <option disabled :value="null">Type</option>
            <option v-for="type in HOME_BLOCK_TYPES" :key="type">
              {{ type }}
            </option>
          </select>
        </dsp-form-control>
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="block.type"
          label="Requête"
          required
        >
          <select v-if="block.type" v-bind="formControlProps" v-on="on">
            <option disabled :value="null">Requête</option>
            <option
              v-for="query in HOME_BLOCK_QUERIES[block.type]"
              :key="query"
            >
              {{ query }}
            </option>
          </select>
        </dsp-form-control>

        <HomeBlocksFields
          v-model="block"
          :mapped-options="HOME_BLOCK_MAPPED_TYPE[block.type]"
        />
      </dsp-flex>
    </dsp-grid-item>
    <dsp-grid-item :column="2">
      <dsp-icon-button
        class="remove-block"
        icon="trash"
        size="sm"
        @click="deleteBlock(block)"
      />
      <div class="icon-draggable" />
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
</style>

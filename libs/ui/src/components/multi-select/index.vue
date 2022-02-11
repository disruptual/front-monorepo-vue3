<script>
export default { name: 'DspMultiSelect' };
</script>

<script setup>
import { computed } from 'vue';
import { vReadableColor } from '@dsp/ui/directives/readableColor';

import Multiselect from '@vueform/multiselect';

const props = defineProps({
  modelValue: { type: Object, required: true },
  options: { type: Array, required: true },
  placeholder: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue']);

const datas = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

const defaultClasses = computed(() => {
  return { containerActive: 'dsp-is-active' };
});
</script>

<template>
  <Multiselect
    ref="refMultiSelect"
    v-model="datas"
    mode="tags"
    :placeholder="placeholder"
    track-by="name"
    value-prop="uri"
    label="name"
    open-direction="top"
    :classes="defaultClasses"
    :searchable="true"
    :can-clear="false"
    :options="options"
    :object="true"
  >
    <template #tag="{ option, handleTagRemove }">
      <dsp-flex>
        <div v-readable-color class="multiselect-tag badge">
          {{ option?.name }}
          <span
            class="multiselect-tag-remove"
            @mousedown.prevent="handleTagRemove(option, $event)"
          >
            <span class="multiselect-tag-remove-icon"></span>
          </span>
        </div>
      </dsp-flex>
    </template>
  </Multiselect>
</template>

<style lang="scss">
@import '@vueform/multiselect/themes/default.css';

.multiselect {
  width: 100%;
  border-radius: unset;
  border: solid 1px var(--color-separator);
}

.multiselect-tag.badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-pill);
  background: var(--color-brand-500);
  margin: 3px 3px 8px;
}

.multiselect.dsp-is-active {
  border-color: var(--color-brand-500);
  outline: solid 1px var(--color-brand-500);
  border-radius: unset;
}
</style>

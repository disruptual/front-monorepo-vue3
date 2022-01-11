<script>
export default {
  name: 'DspInputTextarea',
  inheritAttrs: false
};
</script>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: String, default: null },
  isResizable: { type: Boolean, default: true },
  isAutoResizable: { type: Boolean, default: true }
});

const shadow = ref(null);
const inputSize = ref('var(--spacing-sm)');
const resize = () => {
  if (props.isAutoResizable) {
    inputSize.value = `${shadow.value?.scrollHeight}px`;
  }
};

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

onMounted(() => {
  resize();
});
watch(model, () => {
  resize();
});
</script>

<template>
  <div>
    <textarea v-model="model" v-bind="$attrs" class="textarea" />
    <textarea ref="shadow" v-model="model" class="shadow" tabindex="0" />
  </div>
</template>

<style lang="scss" scoped>
.textarea {
  border: solid 1px var(--color-separator);
  min-height: v-bind(inputSize);
  width: 100%;
  resize: v-bind("isResizable? 'horizontal': 'none'");
  padding: var(--spacing-xxs) var(--spacing-sm);
  border: 1px solid var(--color-separator);
  overflow: hidden;
  &:focus {
    border-color: var(--color-brand-500);
    outline: solid 1px var(--color-brand-500);
  }
}
.shadow {
  position: absolute;
  max-height: 10px;
  pointer-events: none;
  opacity: 0;
  left: 0;
  margin: 0;
}
</style>

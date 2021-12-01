<script>
export default {
  name: 'DspInputTextarea',
  inheritAttrs: false
};
</script>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';

const shadow = ref(null)
const inputSize = ref('var(--spacing-lg)')
const resize = () => {
  if (props.isAutoResizable) {
    console.log(`${shadow.value?.scrollHeight}px`);
    inputSize.value = `${shadow.value?.scrollHeight}px`
  }
}
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: String, default: null },
  isResizable: { type: Boolean, default: true },
  isAutoResizable: { type: Boolean, default: true }
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

onMounted(() => {
  resize()
})
watch(model, () => {
  resize()
})

</script>

<template>
  <div class="dsp-input-text">
    <textarea v-model="model" v-bind="$attrs" class="textarea"></textarea>
    <textarea ref="shadow" v-model="model" class="shadow" tabindex="0"></textarea>
  </div>
</template>

<style lang="scss" scoped>
.dsp-input-text {
  display: flex;
  grid-gap: var(--spacing-xs);
  background-color: var(--color-surface);

  .textarea {
    box-sizing: border-box;
    border: solid 1px var(--color-separator);
    min-height: v-bind(inputSize);
    height: var(--spacing-lg);
    width: 100%;
    resize: v-bind("isResizable? 'horizontal': 'none'");
    padding: var(--spacing-xxs) var(--spacing-sm);
    border: 1px solid #aeaeae;
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
    margin: 0;
  }
}

.icon {
  padding: var(--spacing-xs);
}
</style>

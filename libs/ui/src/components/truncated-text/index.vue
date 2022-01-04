<script>
export default { name: 'DspTruncatedText' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { vTooltip } from '@dsp/ui/directives/tooltip';

const props = defineProps({
  as: { type: String, default: 'div' },
  width: { type: String, default: null },
  hasTooltip: { type: Boolean, default: false }
});
const element = ref(null);

const computedWidth = computed(() => {
  const { width } = props;
  return width || '100%';
  // if (width) return width;
  // if (!element.value) return 'auto';

  // const { parentNode } = element.value;
  // const { paddingLeft, paddingRight } = getComputedStyle(parentNode);
  // const totalWidth =
  //   parentNode.clientWidth - parseInt(paddingLeft) - parseInt(paddingRight);

  // return `${totalWidth}px`;
});

const tooltip = () => {
  if (!element.value) return;
  if (!props.hasTooltip) return;

  if (element.value.offsetWidth < element.value.scrollWidth) {
    return element.value.textContent;
  }
};
</script>

<template>
  <component
    :is="as"
    ref="element"
    v-tooltip="tooltip"
    class="dsp-truncated-text"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.dsp-truncated-text {
  max-width: v-bind(computedWidth);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<script>
export default {
  name: 'DspContainer'
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  as: { type: String, default: 'div' },
  isSmall: { type: Boolean, default: false }
});
const classes = computed(() => [props.isSmall && 'dsp-container--is-small']);
</script>
<template>
  <component :is="as" class="dsp-container" :class="classes">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.dsp-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @include not-mobile {
    max-width: var(--breakpoint-tablet);
  }

  &.dsp-container--is-small {
    @include not-mobile {
      max-width: var(--breakpoint-mobile);
    }
  }
}
</style>

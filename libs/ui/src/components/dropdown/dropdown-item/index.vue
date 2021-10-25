<script>
export default { name: 'DspDropdownItem', inheritAttrs: false };
</script>

<script setup>
import { inject, computed } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const props = defineProps({
  autoClose: { type: Boolean, default: true }
});

const is = computed(() => (props.autoClose ? 'dsp-plain-button' : 'div'));
const { close } = inject(CONTEXT_KEYS.DROPDOWN);
</script>

<template>
  <li class="dsp-dropdown-item">
    <component :is="is" v-bind="$attrs" @click="autoClose && close()">
      <slot />
    </component>
  </li>
</template>

<style lang="scss" scoped>
.dsp-dropdown-item {
  > * {
    display: block;
    width: 100%;
    text-align: left;
    padding: var(--spacing-xs) var(--spacing-md);
  }
}
</style>

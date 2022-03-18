<script>
export default { name: 'DspAlert' };
</script>

<script setup>
import { useColorScheme } from '@dsp/ui/hooks';
import { vReadableColor } from '@dsp/ui/directives/readableColor';

const props = defineProps({
  colorScheme: { type: String, default: 'gray' },
  icon: { type: String, default: 'info' }
});

const scheme = {
  bg: 200,
  text: 800,
  iconBg: 400,
  icon: 700
};

const colors = useColorScheme(scheme, props);
</script>

<template>
  <dsp-flex wrap="nowrap" gap="md" class="dsp-alert" align="center">
    <dsp-center class="dsp-alert__icon">
      <dsp-icon :icon="icon" />
    </dsp-center>
    <span>
      <slot />
    </span>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.dsp-alert {
  color: v-bind('colors.text');
  margin-bottom: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  background-color: v-bind('colors.bg');

  > * {
    padding: var(--spacing-sm);
  }
}

.dsp-alert__icon {
  align-self: stretch;
  background-color: v-bind('colors.iconBg');
  color: v-bind('colors.icon');
}
</style>

<script>
export default { name: 'DspChipCount' };
</script>

<script setup>
import { vReadableColor } from '@dsp/ui/directives/readableColor';

defineProps({
  count: { type: [String, Number], default: null },
  isCountDisplayed: { type: Boolean, default: true },
  type: {
    type: String,
    default: 'alert',
    validator: val => ['alert', 'info'].includes(val)
  }
});
</script>

<template>
  <span class="dsp-notification">
    <span
      v-show="isCountDisplayed"
      v-readable-color
      :class="`dsp-notification--${type}`"
      class="dsp-notification_chip"
    >
      {{ count }}
    </span>
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.dsp-notification {
  position: relative;
}

.dsp-notification_chip {
  --dsp-notification-size: 1.6em;
  pointer-events: none;
  position: absolute;
  top: calc(-0.3 * var(--dsp-notification-size));
  left: 0;
  right: var(--spacing-sm);
  border-radius: var(--border-radius-circle);
  width: var(--dsp-notification-size);
  height: var(--dsp-notification-size);
  line-height: var(--dsp-notification-size);
  font-size: var(--font-size-xs);
  text-align: center;
  font-weight: var(--font-weight-bold);
  z-index: 1;
}

.dsp-notification--alert {
  background-color: var(--color-brand-500);
}
.dsp-notification--info {
  background-color: var(--color-success-500);
}
</style>

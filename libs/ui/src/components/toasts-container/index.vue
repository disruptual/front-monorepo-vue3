<script>
export default { name: 'DspToastsContainer' };
</script>

<script setup>
import { useToast } from '@dsp/ui/hooks/useToast';

const { toasts, hide } = useToast();
const icons = {
  success: 'checkboxLight',
  error: 'warning'
};
</script>

<template>
  <transition-group name="list" tag="ul" class="toasts-container">
    <dsp-flex
      v-for="toast in toasts"
      :key="toast.id"
      as="li"
      class="toast"
      :class="`toast--${toast.type}`"
      align="center"
      wrap="nowrap"
    >
      <dsp-center class="toast__icon">
        <dsp-icon :icon="icons[toast.type]" />
      </dsp-center>
      <span>{{ toast.message }}</span>
      <dsp-icon-button icon="remove" @click="hide(toast.id)" />
    </dsp-flex>
  </transition-group>
</template>

<style lang="scss" scoped>
.toasts-container {
  position: fixed;
  z-index: 999;
  top: var(--spacing-xl);
  right: var(--spacing-md);
  padding: 0;
  margin: 0;

  > * + * {
    margin-top: var(--spacing-md);
  }

  @include mobile-only {
    right: 0;
    width: 95%;
  }
}

.toast {
  color: var(--toast-color);
  background-color: var(--toast-bg-color);
  overflow: hidden;
  cursor: pointer;

  @include not-mobile {
    border-radius: var(--border-radius-md);
  }

  > * {
    padding: var(--spacing-sm);
  }
}

.toast__icon {
  color: var(--toast-bg-color);
  background-color: var(--toast-color);
  align-self: stretch;
}

.toast--success {
  --toast-bg-color: var(--color-green-100);
  --toast-color: var(--color-green-800);
}

.toast--error {
  --toast-bg-color: var(--color-red-50);
  --toast-color: var(--color-red-700);
}

.list-enter-active,
.list-leave-active {
  transition: all var(--transition-md) ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
</style>

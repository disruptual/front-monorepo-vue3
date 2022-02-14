<script>
export default { name: 'DspModal' };
</script>
<script setup>
import { toRef, watch, ref } from 'vue';
import { KEYBOARD } from '@dsp/core';
import { useBodyScrollLock } from '@dsp/ui/hooks/useBodyScrollLock';
import { vClickOutside } from '@dsp/ui/directives/clickOutside';
import { createTeleportHost } from '@dsp/ui/utils/createTeleportHost';
import { TELEPORT_HOSTS } from '@dsp/ui/utils/constants';
import { useEventListener } from '@dsp/ui/hooks/useEventListener';
import { getFocusableChildren } from '@dsp/ui/utils/getFocusableChildren';

const props = defineProps({
  isOpened: { type: Boolean, required: true }
});
const emit = defineEmits(['close']);

const hostID = TELEPORT_HOSTS.MODAL;
createTeleportHost(hostID);

useBodyScrollLock(toRef(props, 'isOpened'));

useEventListener('keydown', e => {
  switch (e.key) {
    case KEYBOARD.ESCAPE:
      return onClose();
    default:
      return;
  }
});
const onClose = () => {
  emit('close');
};

const contentEl = ref(null);
const focusRef = ref(null);
watch(
  () => props.isOpened,
  async newVal => {
    if (!newVal) return;
    // We need a small timeout because sometimes on the next tick the modal content won't be fully loaded into the DOM
    setTimeout(() => {
      const children = getFocusableChildren(contentEl.value.$el);
      children[0]?.focus?.();
    }, 50);
  }
);

watch(focusRef, newVal => {
  newVal?.focus?.();
});
</script>

<template>
  <teleport :to="`#${hostID}`">
    <dsp-fade-transition
      :is-visible="isOpened"
      :appear="true"
      class="transition"
    >
      <div class="modal">
        <dsp-icon-button
          icon="remove"
          is-plain
          size="lg"
          class="close-button"
          @click="$emit('close')"
        />
        <div v-click-outside="onClose" class="content">
          <dsp-surface ref="contentEl">
            <slot :focus-ref="el => (focusRef = el)" />
          </dsp-surface>
        </div>
      </div>
    </dsp-fade-transition>
  </teleport>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: var(--z-index-modal);
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: auto;
}

.transition {
  position: relative;
  z-index: var(--z-index-modal);
}

.close-button {
  --offset: var(--spacing-lg);
  position: fixed;
  top: var(--offset);
  right: var(--offset);
  color: var(--color-text-lighter);

  @include mobile-only {
    --offset: 0;
  }
}

.content {
  margin-top: var(--spacing-3xl);
  animation: modal-content-enter var(--transition-md);
  @include not-mobile {
    max-width: 80vw;
  }
  @include mobile-only {
    margin: var(--spacing-xl) var(--spacing-md);
    width: 100%;
  }
}

@keyframes modal-content-enter {
  from {
    transform: translateY(-5em);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

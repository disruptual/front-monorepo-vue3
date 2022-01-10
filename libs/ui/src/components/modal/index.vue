<script>
export default { name: 'DspModal' };
</script>
<script setup>
import { toRef } from 'vue';
import { KEYBOARD } from '@dsp/core';
import { useBodyScrollLock } from '@dsp/ui/hooks/useBodyScrollLock';
import { vClickOutside } from '@dsp/ui/directives/clickOutside';
import { createTeleportHost } from '@dsp/ui/utils/createTeleportHost';
import { TELEPORT_HOSTS } from '@dsp/ui/utils/constants';
import { useEventListener } from '@dsp/ui/hooks/useEventListener';

const props = defineProps({
  isOpened: { type: Boolean, required: true }
});
const emit = defineEmits(['close']);

const hostID = TELEPORT_HOSTS.MODAL;
createTeleportHost(hostID);

useBodyScrollLock(toRef(props.isOpened));

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
</script>

<template>
  <teleport :to="`#${hostID}`">
    <dsp-fade-transition
      :is-visible="isOpened"
      :appear="true"
      class="transition"
    >
      <div class="modal">
        <dsp-plain-button class="close-button" @click="$emit('close')">
          <dsp-icon icon="timesLight" size="lg" />
        </dsp-plain-button>
        <div v-click-outside="onClose" class="content">
          <dsp-surface>
            <slot />
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
  position: fixed;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  color: var(--color-text-lighter);
}

.content {
  margin-top: 10em;
  animation: modal-content-enter var(--transition-md);
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

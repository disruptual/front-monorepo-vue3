<script>
export default { name: 'DspDrawer', inheritAttrs: false };
</script>
<script setup>
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';
import { createTeleportHost } from '@dsp/ui/utils/createTeleportHost';
import { TELEPORT_HOSTS } from '@dsp/ui/utils/constants';
import { provide, reactive, toRef, watch, computed } from 'vue';
import { useBodyScrollLock, useEventListener } from '@dsp/ui/hooks';
import { oneOf } from '@dsp/core';

const props = defineProps({
  isOpened: { type: Boolean, required: true },
  hasOverlay: { type: Boolean, default: true },
  position: oneOf(['left', 'right'], 'left')
});
const emit = defineEmits(['close']);

const hostID = TELEPORT_HOSTS.DRAWER;
createTeleportHost(hostID);

const state = reactive({
  isOverlayOpened: false,
  isDrawerOpened: false
});

if (props.hasOverlay) {
  useBodyScrollLock(toRef(state, 'isOverlayOpened'));
}

const toggle = isOpen => {
  if (isOpen) {
    state.isOverlayOpened = isOpen;
    setTimeout(() => {
      state.isDrawerOpened = isOpen;
    }, 300);
  } else {
    state.isDrawerOpened = isOpen;
    setTimeout(() => {
      state.isOverlayOpened = isOpen;
    }, 150);
  }
};

const close = () => {
  if (state.isOverlayOpened) emit('close');
};

watch(() => props.isOpened, toggle);

const onKeyUp = e => {
  if (e.key === 'Escape') close();
};
useEventListener('keyup', onKeyUp);

const context = computed(() => ({
  isOpened: props.isOpened,
  hasOverlay: props.hasOverlay,
  position: props.position,
  toggle,
  close,
  ...state
}));

provide(CONTEXT_KEYS.DRAWER, context);
</script>

<template>
  <teleport :to="`#${hostID}`">
    <dsp-drawer-content><slot /></dsp-drawer-content>
  </teleport>
</template>

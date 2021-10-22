<script>
export default { name: 'DspDropdown' };
</script>

<script setup>
import { nextTick, ref, unref, watch, provide } from 'vue';
import { createPopper } from '@popperjs/core';
import { vClickOutside } from '@dsp/ui/directives/clickOutside';
import { vFocusOutside } from '@dsp/ui/directives/focusOutside';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';
import { getFocusableChildren } from '@dsp/ui/utils/getFocusableChildren';
import { createTeleportHost } from '@dsp/ui/utils/createTeleportHost';
import { TELEPORT_HOSTS } from '@dsp/ui/utils/constants';

const props = defineProps({
  isOpened: { type: Boolean, required: true }
});
const emit = defineEmits(['update:isOpened']);

const hostID = TELEPORT_HOSTS.DROPDOWN;
createTeleportHost(hostID);

const menuElement = ref(null);
const toggleElement = ref(null);
const popperInstance = ref(null);
const focusedMenuElementIndex = ref(0);

const toggle = () => {
  emit('update:isOpened', !props.isOpened);
};

const close = () => {
  if (!props.isOpened) return;
  nextTick(() => {
    emit('update:isOpened', false);
  });
};

const focusCurrentItem = () => {
  if (!props.isOpened) return;

  const children = getFocusableChildren(menuElement.value);
  const index = focusedMenuElementIndex.value;
  children[index]?.focus();
};

const toggleMenu = isOpened => {
  if (isOpened) {
    nextTick(() => {
      popperInstance.value = createPopper(
        toggleElement.value,
        menuElement.value,
        { placement: 'bottom' }
      );
    });
  } else {
    popperInstance.value?.destroy?.();
  }
};

const focusFirstElement = async () => {
  console.log('...');
  await nextTick();
  focusCurrentItem();
};

const focusPreviousElement = () => {
  const children = getFocusableChildren(menuElement.value);
  if (focusedMenuElementIndex.value === 0) {
    focusedMenuElementIndex.value = children.length - 1;
  } else {
    focusedMenuElementIndex.value--;
  }
};

const focusNextElement = () => {
  const children = getFocusableChildren(menuElement.value);
  if (focusedMenuElementIndex.value === children.length - 1) {
    focusedMenuElementIndex.value = 0;
  } else {
    focusedMenuElementIndex.value++;
  }
};

const onKeyDown = e => {
  switch (e.code) {
    case 'Escape':
      e.stopPropagation();
      return close();
    case 'ArrowDown':
      e.preventDefault();
      return focusNextElement();
    case 'ArrowUp':
      e.preventDefault();
      return focusPreviousElement();
    default:
      return;
  }
};

watch(() => unref(props.isOpened), toggleMenu);
watch(focusedMenuElementIndex, focusCurrentItem);

provide(CONTEXT_KEYS.DROPDOWN, { toggle, close });
</script>

<template>
  <div class="dropdown">
    <div ref="toggleElement">
      <dsp-plain-button
        class="dropdown-toggle"
        @click="toggle"
        @keyup.enter="focusFirstElement"
      >
        <slot name="toggle" />
      </dsp-plain-button>
    </div>

    <teleport :to="`#${hostID}`">
      <ul
        v-if="isOpened"
        ref="menuElement"
        v-click-outside="close"
        v-focus-outside="close"
        class="menu"
        @keydown="onKeyDown"
      >
        <slot name="menu" />
      </ul>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.menu {
  position: absolute;
  top: 100%;
  z-index: var(--z-index-dropdown);
  width: max-content;
  background-color: var(--color-surface);
  box-shadow: var(--box-shadow-sm);
  padding: var(--spacing-sm);
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

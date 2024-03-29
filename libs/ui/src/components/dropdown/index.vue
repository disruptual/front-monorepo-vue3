<script>
export default { name: 'DspDropdown' };
</script>

<script setup>
import { nextTick, ref, unref, watch, provide, computed, Teleport } from 'vue';
import { KEYBOARD } from '@dsp/core';
import { vClickOutside } from '@dsp/ui/directives/clickOutside';
import { vFocusOutside } from '@dsp/ui/directives/focusOutside';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';
import { getFocusableChildren } from '@dsp/ui/utils/getFocusableChildren';
import { createTeleportHost } from '@dsp/ui/utils/createTeleportHost';
import { TELEPORT_HOSTS } from '@dsp/ui/utils/constants';

const props = defineProps({
  isOpened: { type: Boolean, required: true },
  isTeleport: { type: Boolean, default: true },
  closeOnFocusOutside: { type: Boolean, default: true },
  closeOnClickOutside: { type: Boolean, default: true },
  returnFocusOnClose: { type: Boolean, default: false },
  as: { type: String, default: 'ul' },
  withToggleIcon: { type: Boolean, default: false },
  toggleRef: { type: null, default: false }
});
const emit = defineEmits(['update:isOpened']);

const hostID = TELEPORT_HOSTS.DROPDOWN;
createTeleportHost(hostID);

const menuElement = ref(null);
const toggleElement = ref(null);
const popperInstance = ref(null);
const focusedMenuElementIndex = ref(0);

const toggleButton = computed(() => props.toggleRef || unref(toggleElement));

const toggle = () => {
  emit('update:isOpened', !props.isOpened);
};

const maybeReturnFocus = () => {
  if (!props.returnFocusOnClose) return;
  const children = getFocusableChildren(toggleButton.value);

  if (children.length) {
    children[0].focus();
  } else {
    toggleButton.value?.focus?.();
  }
};

const close = () => {
  if (!props.isOpened) return;
  nextTick(() => {
    emit('update:isOpened', false);
    maybeReturnFocus();
  });
};

const focusCurrentItem = () => {
  if (!props.isOpened) return;

  const children = getFocusableChildren(menuElement.value);
  const index = focusedMenuElementIndex.value;
  children[index]?.focus();
};

const toggleMenu = isOpened => {
  if (popperInstance.value) {
    popperInstance.value.destroy?.();
  }

  if (!isOpened) return;

  nextTick(async () => {
    const { createPopper } = await import('@popperjs/core');
    if (!toggleButton.value || !menuElement.value) return;
    popperInstance.value = createPopper(toggleButton.value, menuElement.value, {
      placement: 'bottom'
    });

    focusFirstElement();
  });
};

const focusFirstElement = async () => {
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
  const children = getFocusableChildren(toggleButton.value);
  switch (e.code) {
    case KEYBOARD.ESCAPE:
      e.stopPropagation();
      close();
      children[0]?.focus?.();
      return;
    case KEYBOARD.ARROW_DOWN:
      e.preventDefault();
      return focusNextElement();
    case KEYBOARD.ARROW_UP:
      e.preventDefault();
      return focusPreviousElement();
    default:
      return;
  }
};

const onClickOutside = e => {
  if (toggleButton.value.contains(e.target)) return;
  if (props.closeOnClickOutside) close();
};

const onFocusOutside = e => {
  if (toggleButton.value.contains(e.target)) return;
  if (props.closeOnFocusOutside) close();

  maybeReturnFocus();
};

const onToggleMousedown = e => {
  if (toggleButton.value.contains(document.activeElement)) {
    toggle();
  }
};

watch(() => unref(props.isOpened), toggleMenu);
watch(toggleButton, toggleMenu);
watch(focusedMenuElementIndex, focusCurrentItem);

provide(CONTEXT_KEYS.DROPDOWN, { toggle, close });
</script>

<template>
  <div class="dropdown">
    <div v-if="!toggleRef" ref="toggleElement">
      <dsp-plain-button
        class="dropdown-toggle"
        type="button"
        @keyup.enter="focusFirstElement"
        @click="toggle"
      >
        <slot name="toggle" />

        <dsp-icon v-if="withToggleIcon" icon="caretDown" as="span" is-inline />
      </dsp-plain-button>
    </div>
    <component :is="isTeleport ? Teleport : 'div'" :to="`#${hostID}`">
      <component
        :is="as"
        v-if="isOpened"
        ref="menuElement"
        v-click-outside="onClickOutside"
        v-focus-outside="onFocusOutside"
        class="menu"
        @keydown="onKeyDown"
      >
        <slot name="menu" />
      </component>
      <div v-if="props.returnFocusOnClose" tabindex="0" />
    </component>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.menu {
  position: absolute;
  z-index: var(--z-index-dropdown);
  width: max-content;
  background-color: var(--color-surface);
  box-shadow: var(--box-shadow-sm);
  padding: var(--spacing-sm);
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-toggle {
  align-items: center;
  gap: var(--spacing-xs);
  display: flex;
}
</style>

<script>
export default { name: 'DspVisuallyHidden' };
</script>

<template>
  <slot />
</template>

<style lang="scss" scoped>
:slotted(*) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>

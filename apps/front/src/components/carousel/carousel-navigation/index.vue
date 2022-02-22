<script>
export default { name: 'Carousel' };
</script>

<script setup>
defineProps({
  modelValue: { type: Number, required: true },
  elementCount: { type: Number, required: true }
});
defineEmits(['update:modelValue']);
</script>

<template>
  <dsp-flex class="navigation" justify="center" gap="sm">
    <button
      v-for="i in elementCount"
      :key="i"
      :class="i - 1 === modelValue && 'navigation__button--active'"
      :aria-label="`carousel navigation slide ${i}`"
      @click="$emit('update:modelValue', i - 1)"
    />
  </dsp-flex>
</template>

<style lang="scss" scoped>
button {
  padding: 0;
  width: 1em;
  height: 1em;
  background-color: var(--color-gray-500);
  border: solid 2px transparent;
  border-radius: var(--border-radius-circle);
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: var(--color-gray-400);
  }
}
.navigation__button--active {
  border: solid 2px white;
}
</style>

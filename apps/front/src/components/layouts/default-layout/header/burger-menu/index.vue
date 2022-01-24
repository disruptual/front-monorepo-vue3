<script>
export default { name: 'HeaderBurgerMenu' };
</script>
<script setup>
import { ref } from 'vue';

const isOpened = ref(false);
</script>

<template>
  <dsp-icon-button icon="bars" size="lg" is-plain @click="isOpened = true" />
  <dsp-drawer :is-opened="isOpened" @close="isOpened = false">
    <h2>Burger menu</h2>
  </dsp-drawer>
</template>

<style lang="scss" scoped></style>

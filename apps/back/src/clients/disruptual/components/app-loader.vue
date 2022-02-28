<script>
export default {
  name: 'AppLoading'
};
</script>

<script setup>
import logo from '../assets/logo.svg';

if (CSS.registerProperty) {
  try {
    CSS.registerProperty({
      name: '--progress',
      syntax: '<percentage>',
      inherits: false,
      initialValue: '0%'
    });
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <div class="app-loading">
    <dsp-fade-transition appear :is-visible="true">
      <img :src="logo" />
    </dsp-fade-transition>
  </div>
</template>

<style lang="scss" scoped>
.app-loading {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
  img {
    height: 8em;
    mask-image: radial-gradient(
      circle at center,
      black var(--progress),
      transparent var(--progress)
    );
    animation: app-loading 3s infinite,
      app-loading-spin-reverse 2s ease-in infinite;
  }
}

@keyframes app-loading {
  from {
    --progress: 0%;
  }
  30% {
    --progress: 125%;
  }
  90% {
    opacity: 1;
  }
  to {
    --progress: 125%;
    opacity: 0;
  }
}

@keyframes app-loading-spin {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(1turn);
  }
}
</style>

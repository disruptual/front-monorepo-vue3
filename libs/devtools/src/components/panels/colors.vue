<script setup>
import { ref } from 'vue';
import { useThemeService, vReadableColor } from '@dsp/ui';
import ColorModal from '../modals/color-modal.vue';

const themeService = useThemeService();
const selectedPalette = ref(null);

const selectPalette = (color, name) => {
  if (typeof color === 'string') {
    selectedPalette.value = { baseColor: color, name };
  } else {
    selectedPalette.value = { ...color, name };
  }
};
</script>

<template>
  <h3>Palettes</h3>
  <dsp-flex gap="sm" class="palettes">
    <dsp-center
      v-for="(color, name) in themeService.theme.palettes"
      :key="color"
    >
      <dsp-button
        class="palette-name"
        right-icon="edit"
        is-outlined
        @click="selectPalette(color, name)"
      >
        {{ name }}
      </dsp-button>
      <dsp-center
        v-for="i in 9"
        :key="i"
        v-readable-color
        class="color-square"
        :style="{ '--bg': `var(--color-${name}-${i}00)` }"
      >
        {{ i }}00
      </dsp-center>
    </dsp-center>
    <dsp-button class="add-palette-button" left-icon="add">
      New Palette
    </dsp-button>
  </dsp-flex>

  <ColorModal
    :is-opened="!!selectedPalette"
    :color="selectedPalette"
    @close="selectedPalette = null"
  />
</template>

<style lang="scss" scoped>
.palettes {
  max-width: 100vw;
  overflow-x: auto;
}
.palette-name {
  text-transform: capitalize;
  margin: var(--spacing-sm) 0;
  width: 7em;
}

.color-square {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--bg, white);
}

.add-palette-button {
  align-self: flex-start;
  margin-top: var(--spacing-sm);
}
</style>

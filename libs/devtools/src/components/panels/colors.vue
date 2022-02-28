<script setup>
import { ref } from 'vue';
import { useThemeService, vReadableColor, getCssVarValue } from '@dsp/ui';
import ColorModal from '../modals/color-modal.vue';
import ThemeColorPicker from '../controls/theme-color-picker.vue';

const themeService = useThemeService();
const selectedPalette = ref(null);

const selectPalette = (color, name) => {
  if (typeof color === 'string') {
    selectedPalette.value = { baseColor: color, name };
  } else {
    selectedPalette.value = { ...color, name };
  }
};

const updateColor = (name, newValue) => {
  themeService.theme.colors[name] = newValue;
  themeService.setupVariables();
};
</script>

<template>
  <h3>Palettes</h3>
  <dsp-flex gap="sm" class="palettes" direction="column">
    <dsp-flex
      v-for="(color, name) in themeService.theme.palettes"
      :key="color"
      gap="sm"
      align="center"
    >
      <div
        class="palette-name"
        right-icon="edit"
        is-outlined
        @click="selectPalette(color, name)"
      >
        {{ name }}
      </div>
      <dsp-center
        v-for="i in 9"
        :key="i"
        v-readable-color
        class="color-square"
        :style="{ '--bg': `var(--color-${name}-${i}00)` }"
      >
        {{ i }}00
      </dsp-center>
      <dsp-button
        left-icon="edit"
        is-outlined
        @click="selectPalette(color, name)"
      >
        Editer
      </dsp-button>
    </dsp-flex>
  </dsp-flex>

  <h3>Couleurs</h3>
  <dsp-flex
    v-for="(color, name) in themeService.theme.colors"
    :key="color"
    align="center"
    class="color__form-control"
    gap="sm"
  >
    <label :for="name">{{ name }}</label>
    <ThemeColorPicker
      :id="name"
      :model-value="color"
      @update:modelValue="updateColor(name, $event)"
    />
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
  width: 7em;
  text-transform: capitalize;
}

.color-square {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg, white);
}

.add-palette-button {
  align-self: flex-start;
  margin-top: var(--spacing-sm);
}

.color__form-control {
  margin-bottom: var(--spacing-sm);

  label {
    width: 8em;
  }
}
</style>

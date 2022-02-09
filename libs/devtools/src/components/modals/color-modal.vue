<script setup>
import { computed, ref, watch } from 'vue';
import { vReadableColor, useThemeService } from '@dsp/ui';
import chroma from 'chroma-js';

const props = defineProps({
  isOpened: { type: Boolean, required: true },
  color: { type: Object, default: null }
});

const defaultSettings = {
  hueShift: 0,
  minLightness: 0.2,
  maxLightness: 0.95,
  saturationAdjust: 0,
  lightnessAdjust: 0
};
const emit = defineEmits(['close']);

const themeService = useThemeService();

const baseColor = ref({
  ...defaultSettings,
  ...props.color,
  baseColor: chroma(props.color?.baseColor || '#ffffff').hex()
});
watch(
  () => props.color,
  color => {
    baseColor.value = {
      ...defaultSettings,
      ...color,
      baseColor: chroma(color?.baseColor || '#ffffff').hex()
    };
  }
);

const palettePreview = computed(() =>
  themeService.createColorScale(baseColor.value)
);

const onCopyPalette = paletteName => {
  const palette = themeService.theme.palettes[paletteName];
  const newColor =
    typeof palette === 'string' ? { baseColor: palette } : palette;

  Object.assign(baseColor.value, defaultSettings, newColor);
};

const onSubmit = () => {
  const { name, ...color } = baseColor.value;
  themeService.theme.palettes[name] = color;
  themeService.setupVariables();
  emit('close');
};
</script>

<template>
  <dsp-modal :is-opened="isOpened" @close="emit('close')">
    <header>
      <h2>Editer la palette {{ color.name }}</h2>
    </header>
    <dsp-flex gap="sm" class="preview">
      <dsp-center
        v-for="(paletteColor, index) in palettePreview"
        :key="paletteColor + index"
        v-readable-color
        class="color-square"
        :style="{ '--bg': paletteColor }"
      >
        {{ index + 1 }}00
      </dsp-center>
    </dsp-flex>
    <label>Copier une palette existante</label>
    <select @change="onCopyPalette($event.target.value)">
      <option disabled selected>Choisissez une palette</option>
      <option
        v-for="(themePalette, name) in themeService.theme.palettes"
        :key="name"
        :value="name"
      >
        {{ name }}
      </option>
    </select>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <label>Couleur de base</label>
        <input v-model="baseColor.baseColor" type="color" />
      </fieldset>

      <fieldset>
        <label>Ajustement de luminosité</label>
        <input
          v-model="baseColor.lightnessAdjust"
          type="range"
          step="0.01"
          min="-1"
          max="1"
        />
      </fieldset>

      <fieldset>
        <label>Ajustement de saturation</label>
        <input
          v-model="baseColor.saturationAdjust"
          type="range"
          step="0.01"
          min="-1"
          max="1"
        />
      </fieldset>

      <fieldset>
        <label>Variation de teinte</label>
        <input
          v-model="baseColor.hueShift"
          type="range"
          step="1"
          min="-360"
          max="360"
        />
      </fieldset>

      <fieldset>
        <label>Luminosité maximale</label>
        <input
          v-model="baseColor.maxLightness"
          type="range"
          step="0.01"
          min="0"
          max="1"
        />
      </fieldset>

      <fieldset>
        <label>Luminosité minimale</label>
        <input
          v-model="baseColor.minLightness"
          type="range"
          step="0.01"
          min="0"
          max="1"
        />
      </fieldset>
      <dsp-flex as="footer" justify="flex-end" gap="md">
        <dsp-button type="button" is-outlined @click="emit('close')">
          Annuler
        </dsp-button>
        <dsp-button>Valider</dsp-button>
      </dsp-flex>
    </form>
  </dsp-modal>
</template>

<style lang="scss" scoped>
.color-square {
  width: 3em;
  aspect-ratio: 1;
  background-color: var(--bg, white);
}

.preview {
  margin-bottom: var(--spacing-md);
}

fieldset {
  display: flex;
  justify-content: space-between;
  border: none;
  padding: 0;
}

footer {
  margin-top: var(--spacing-md);
}

input {
  accent-color: var(--color-brand-500);
}
</style>

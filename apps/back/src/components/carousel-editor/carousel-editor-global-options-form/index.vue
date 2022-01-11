<script>
export default { name: 'CarouselEditorGlobalOptionsForm' };
</script>

<script setup>
import { inject } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';
import { useDevice } from '@dsp/ui';

const { model } = inject(CONTEXT_KEYS.CAROUSEL);
const device = useDevice();

const alignments = [
  { label: 'A Gauche', value: 'left' },
  { label: 'Centré', value: 'center' },
  { label: 'A droite', value: 'right' }
];
</script>

<template>
  <div>
    <dsp-grid :columns="device.isMobile ? 1 : 2" gap="md" align="center">
      <dsp-checkbox
        v-model="model.settings.imagesAsLink"
        label="Images seules (le texte est integré à vos images)"
      />

      <dsp-form-control
        v-slot="{ formControlProps }"
        v-model="model.settings.contentGridSize"
        label="Taille de la grille"
      >
        <input
          v-model.number="model.settings.contentGridSize"
          type="range"
          v-bind="formControlProps"
          min="5"
          max="15"
          :disabled="model.settings.imagesAsLink"
        />
      </dsp-form-control>
      <dsp-form-control
        v-model.number="model.settings.carouselHeight"
        type="number"
        label="Hauteur (desktop)"
      />

      <dsp-form-control
        v-model.number="model.settings.carouselMobileHeight"
        type="number"
        label="Hauteur (mobile)"
      />
    </dsp-grid>

    <dsp-form-control
      v-slot="{ formControlProps }"
      v-model="model.settings.textAlign"
      label="Alignement du texte"
    >
      <dsp-radio-group
        v-model.number="model.settings.textAlign"
        v-bind="formControlProps"
        :values="alignments"
        row
      />
    </dsp-form-control>
  </div>
</template>

<style lang="scss" scoped></style>

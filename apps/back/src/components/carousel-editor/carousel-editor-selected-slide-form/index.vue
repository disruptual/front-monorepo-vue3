<script>
export default { name: 'CarouselEditorSlidesManager' };
</script>

<script setup>
import { inject, computed } from 'vue';
import { debounce } from 'lodash-es';
import { CONTEXT_KEYS, CAROUSEL_FILE_MAX_SIZE } from '@/utils/constants';
import { useToast } from '@dsp/ui';
import { useFileReader } from '@dsp/core';
import chroma from 'chroma-js';

const { model } = inject(CONTEXT_KEYS.CAROUSEL);
const { showError } = useToast();
const [, { readAsDataURL }] = useFileReader();
const defaultOverlayOpacity = '0.5';
const defaultOverlayBackgroundColor = '#000000';

const onFileSelected = async ([newFile]) => {
  const fileSizeInMo = (newFile.size / 1024 / 1024).toFixed(4);

  if (fileSizeInMo > CAROUSEL_FILE_MAX_SIZE) {
    showError(
      `Pour des raisons de performance, une slide ne doit pas faire plus de ${CAROUSEL_FILE_MAX_SIZE}Mo`
    );

    return;
  }

  model.newMedias[model.selectedSlideId] = {
    fileName: newFile.fileName,
    data: await readAsDataURL(newFile)
  };
};

const undoFileUpload = () => {
  model.newMedias[model.selectedSlideId] = null;
};

const overlayBackgroundColor = computed({
  get() {
    if (!model.selectedSlide.carouselItemSettings.overlayBackgroundColor)
      return defaultOverlayBackgroundColor;

    const { r, g, b } =
      model.selectedSlide.carouselItemSettings.overlayBackgroundColor;

    return r && g && b ? chroma({ r, g, b }) : defaultOverlayBackgroundColor;
  },
  set: debounce(hex => {
    if (!model.selectedSlide.carouselItemSettings.overlayBackgroundColor) {
      model.selectedSlide.carouselItemSettings.overlayBackgroundColor = {};
    }
    const { overlayBackgroundColor } = model.selectedSlide.carouselItemSettings;
    const newColor = chroma(hex);
    overlayBackgroundColor.r = newColor.get('rgb.r');
    overlayBackgroundColor.g = newColor.get('rgb.g');
    overlayBackgroundColor.b = newColor.get('rgb.b');
  }, 100)
});

const overlayAlpha = computed({
  get() {
    return model.selectedSlide.carouselItemSettings.overlayBackgroundColor
      ? model.selectedSlide.carouselItemSettings.overlayBackgroundColor.a
      : defaultOverlayOpacity;
  },
  set: debounce(alpha => {
    if (!model.selectedSlide.carouselItemSettings.overlayBackgroundColor) {
      model.selectedSlide.carouselItemSettings.overlayBackgroundColor = {};
    }
    const { overlayBackgroundColor } = model.selectedSlide.carouselItemSettings;
    overlayBackgroundColor.a = alpha;
  }, 100)
});

const overlayTextColor = computed({
  get() {
    return model.selectedSlide.carouselItemSettings.overlayTextColor
      ? model.selectedSlide.carouselItemSettings.overlayTextColor
      : '#ffffff';
  },
  set: debounce(color => {
    model.selectedSlide.carouselItemSettings.overlayTextColor = color;
  }, 100)
});
</script>

<template>
  <dsp-form-control
    v-slot="{ formControlProps }"
    v-model="model.selectedSlide.title"
    label="Titre"
  >
    <dsp-input-textarea
      v-model="model.selectedSlide.title"
      :is-resizable="false"
      v-bind="formControlProps"
    />
  </dsp-form-control>

  <dsp-form-control
    v-slot="{ formControlProps }"
    v-model="model.selectedSlide.content"
    label="Sous-Titre"
  >
    <dsp-input-textarea
      v-model="model.selectedSlide.content"
      :is-resizable="false"
      v-bind="formControlProps"
    />
  </dsp-form-control>
  <dsp-form-control v-model="model.selectedSlide.btn" label="CTA" />

  <dsp-form-control
    v-slot="{ formControlProps }"
    v-model="model.selectedSlide.link"
    label="Cible du CTA"
  >
    <dsp-flex align="center" gap="md">
      <dsp-input-text
        v-model="model.selectedSlide.link"
        v-bind="formControlProps"
        spellcheck="false"
      />
      <dsp-checkbox
        v-model="model.selectedSlide.isTargetBlank"
        label="Ouvre un nouvel onglet"
      />
    </dsp-flex>
  </dsp-form-control>
  <dsp-checkbox
    v-model="model.selectedSlide.textHasAnOverlay"
    class="mt-sm"
    label="Afficher un overlay derrière le texte"
  />
  <div class="mt-sm">
    <fieldset>
      <legend>Overlay</legend>
      <dsp-flex gap="lg" justify="space-evenly">
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="overlayTextColor"
          label="Couleur de la police"
        >
          <input
            v-model="overlayTextColor"
            class="center"
            type="color"
            v-bind="formControlProps"
            v-on="on"
          />
        </dsp-form-control>
        <dsp-form-control
          v-if="model.selectedSlide.textHasAnOverlay"
          v-slot="{ on, ...formControlProps }"
          v-model="overlayBackgroundColor"
          label="Couleur de fond"
        >
          <input
            v-model="overlayBackgroundColor"
            class="center"
            type="color"
            v-bind="formControlProps"
            v-on="on"
          />
        </dsp-form-control>
        <dsp-form-control
          v-if="model.selectedSlide.textHasAnOverlay"
          v-slot="{ on, ...formControlProps }"
          v-model="overlayAlpha"
          label="Opacité"
        >
          <input
            v-model="overlayAlpha"
            class="center"
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-bind="formControlProps"
            v-on="on"
          />
          <span class="center">
            {{
              model.selectedSlide.carouselItemSettings.overlayBackgroundColor
                ?.a || defaultOverlayOpacity
            }}
          </span>
        </dsp-form-control>
      </dsp-flex>
    </fieldset>
  </div>
  <dsp-flex gap="sm" align="center" class="mt-sm">
    <dsp-input-file label="Changer l'image" @change="onFileSelected" />
    <dsp-button
      v-if="model.newMedias[model.selectedSlideId]"
      is-outlined
      left-icon="reset"
      @click="undoFileUpload"
    >
      Rétablir
    </dsp-button>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.mt-sm {
  margin-top: var(--spacing-sm);
}

.overlay-settings {
  max-width: 80%;
}

.center {
  align-self: center;
}
</style>

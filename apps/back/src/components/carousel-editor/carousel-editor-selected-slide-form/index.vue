<script>
export default { name: 'CarouselEditorSlidesManager' };
</script>

<script setup>
import { inject } from 'vue';
import { CONTEXT_KEYS, CAROUSEL_FILE_MAX_SIZE } from '@/utils/constants';
import { useToast } from '@dsp/ui';
import { useFileReader } from '@dsp/core';

const { model } = inject(CONTEXT_KEYS.CAROUSEL);
const { showError } = useToast();
const [, { readAsDataURL }] = useFileReader();

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
</style>

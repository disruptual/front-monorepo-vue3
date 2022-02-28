<script>
export default { name: 'CarouselEditorActionBar' };
</script>

<script setup>
import { inject } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';
import { useDevice } from '@dsp/ui';
import { useFileReader } from '@dsp/core';
import downloadFile from 'js-file-download';

const device = useDevice();
const { model, save, isSaving } = inject(CONTEXT_KEYS.CAROUSEL);
const [, { readAsText }] = useFileReader();

const onImport = async ([file]) => {
  const textSettings = await readAsText(file);
  const json = JSON.parse(textSettings);

  model.import(json);
};

const onExport = () => {
  downloadFile(
    JSON.stringify(model.exportJSON, null, 2),
    'carousel-settings.json'
  );
};
</script>

<template>
  <dsp-flex
    as="header"
    class="carousel-editor-action-bar"
    justify="space-between"
  >
    <dsp-flex gap="sm">
      <dsp-input-file accept="application/JSON" @change="onImport">
        <template #button="{ onClick }">
          <dsp-icon-button
            v-if="device.isMobile"
            icon="fileUpload"
            is-outlined
            @click="onClick"
          />

          <dsp-loading-button
            v-else
            is-outlined
            left-icon="fileUpload"
            :is-loading="false"
            @click="onClick"
          >
            Importer
          </dsp-loading-button>
        </template>
        "
      </dsp-input-file>

      <dsp-icon-button v-if="device.isMobile" icon="download" is-outlined />
      <dsp-loading-button
        v-else
        is-outlined
        left-icon="download"
        :is-loading="false"
        @click="onExport"
      >
        Exporter
      </dsp-loading-button>
    </dsp-flex>

    <dsp-icon-button
      v-if="device.isMobile"
      icon="save"
      :is-loading="isSaving"
      is-outlined
      @click="save"
    />
    <dsp-loading-button
      v-else
      left-icon="save"
      :is-loading="isSaving"
      @click="save"
    >
      Enregistrer
    </dsp-loading-button>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.carousel-editor-action-bar {
  padding: var(--spacing-md) 0;
}
</style>

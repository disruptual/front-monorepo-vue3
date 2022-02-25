<script>
export default { name: 'HomeBlocksEditor' };
</script>

<script setup>
import { ref, computed } from 'vue';
import downloadFile from 'js-file-download';
import { nanoid } from 'nanoid';
import { useFileReader } from '@dsp/core';
import { HOME_BLOCK_TYPES, HOME_BLOCK_QUERIES } from '@dsp/business';

const defaultSettings = {
  blocks: []
};
const settings = ref(null);

const [, { readAsText }] = useFileReader();

const onImport = async ([file]) => {
  const textSettings = await readAsText(file);
  const json = JSON.parse(textSettings);

  settings.value = json;
};

const onExport = () => {
  downloadFile(
    JSON.stringify(settings.value, null, 2),
    'home-blocks-settings.json'
  );
};

const addBlock = () => {
  settings.value.blocks.push({
    id: nanoid(),
    name: `Bloc ${settings.value.blocks.length}`,
    position: settings.value.blocks.length,
    type: null,
    query: null
  });
};

const sortedBlocks = computed(() =>
  settings.value.blocks.slice().sort((a, b) => a.position - b.position)
);

const moveBlock = (block, newIndex) => {
  const oldIndex = sortedBlocks.value.indexOf(block);

  const newBlocks = [...sortedBlocks.value];
  newBlocks.splice(oldIndex, 1);
  newBlocks.splice(newIndex, 0, block);
  newBlocks.forEach((block, index) => {
    block.position = index;
  });
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
          <dsp-loading-button
            is-outlined
            left-icon="fileUpload"
            :is-loading="false"
            @click="onClick"
          >
            Importer
          </dsp-loading-button>
        </template>
      </dsp-input-file>

      <dsp-loading-button
        is-outlined
        left-icon="download"
        :is-loading="false"
        @click="onExport"
      >
        Exporter
      </dsp-loading-button>
    </dsp-flex>
  </dsp-flex>

  <p v-if="!settings">
    Pour commencer, importez ou
    <dsp-plain-button @click="settings = defaultSettings">
      créez
    </dsp-plain-button>
    une collection de blocs.
  </p>

  <ul v-else class="blocks-list">
    <li v-for="(block, index) in sortedBlocks" :key="block.id">
      <dsp-flex gap="sm" align="center">
        <dsp-icon-button
          icon="arrowUp"
          :disabled="index === 0"
          @click="moveBlock(block, index - 1)"
        />
        <dsp-icon-button
          icon="arrowDown"
          :disabled="index === sortedBlocks.length - 1"
          @click="moveBlock(block, index + 1)"
        />
        {{ block.name }}
      </dsp-flex>

      <dsp-flex gap="sm">
        <select v-model="block.type">
          <option disabled :value="null">Type</option>
          <option v-for="type in HOME_BLOCK_TYPES" :key="type">
            {{ type }}
          </option>
        </select>
        <select v-if="block.type" v-model="block.query">
          <option disabled :value="null">Requête</option>
          <option v-for="query in HOME_BLOCK_QUERIES[blocks.type]" :key="query">
            {{ query }}
          </option>
        </select>
      </dsp-flex>
    </li>
    <li>
      <dsp-button left-icon="add" @click="addBlock">Ajouter un bloc</dsp-button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.blocks-list {
  padding: 0;
  list-style: none;

  li:not(:last-child) {
    padding: var(--spacing-sm);
    border: solid 1px var(--color-gray-200);

    > *:first-child {
      margin-bottom: var(--spacing-sm);
    }
  }
}
</style>

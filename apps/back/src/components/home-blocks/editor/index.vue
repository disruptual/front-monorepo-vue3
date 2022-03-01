<script>
export default { name: 'HomeBlocksEditor' };
</script>

<script setup>
import { ref, computed } from 'vue';
import downloadFile from 'js-file-download';
import { nanoid } from 'nanoid';
import { useFileReader } from '@dsp/core';
import { HOME_BLOCK_TYPES, HOME_BLOCK_QUERIES } from '@dsp/business';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

import { fakeHomePageConfig } from '@dsp/business/utils/constants';

console.log('fakeHomePageConfig ==> ', fakeHomePageConfig);

const defaultSettings = {
  blocks: fakeHomePageConfig
};
const settings = ref(defaultSettings);
const isEditing = ref(false);

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

const removeBlock = block => {
  const index = sortedBlocks.value.indexOf(block);

  sortedBlocks.value.splice(index, 1);
  sortedBlocks.value.forEach((block, index) => {
    block.id = index;
  });

  console.log('sortedBlocks.value ==> ', sortedBlocks.value);
};

const moveBlock = (block, newIndex) => {
  const oldIndex = sortedBlocks.value.indexOf(block);

  const newBlocks = [...sortedBlocks.value];
  newBlocks.splice(oldIndex, 1);
  newBlocks.splice(newIndex, 0, block);
  newBlocks.forEach((block, index) => {
    block.position = index;
  });
};

const cardStyle = computed(() => {
  return {
    'background-color': 'red'
  };
});
</script>

<template>
  <dsp-flex
    as="header"
    class="carousel-editor-action-bar"
    justify="center"
    align="center"
    gap="sm"
  >
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

    <dsp-button v-if="isEditing" left-icon="add" @click="addBlock">
      Ajouter un bloc
    </dsp-button>

    <dsp-switch
      v-model="isEditing"
      class="editing-switch"
      :label="t('user.details.editModeSwitchLabel')"
    />
  </dsp-flex>

  <ul v-if="isEditing" class="blocks-list">
    <li v-for="(block, index) in sortedBlocks" :key="block.id">
      <dsp-icon-button
        class="remove-block"
        icon="remove"
        size="sm"
        @click="removeBlock(block)"
      />
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
        <dsp-input-text v-model="block.name" spellcheck="false" />
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
          <option v-for="query in HOME_BLOCK_QUERIES[block.type]" :key="query">
            {{ query }}
          </option>
        </select>
      </dsp-flex>
    </li>
  </ul>

  <ul v-else class="blocks-list">
    <li v-for="block in sortedBlocks" :key="block.id" :class="cardStyle">
      <dsp-flex gap="sm" align="center">
        {{ block.name }}
      </dsp-flex>

      <dsp-flex gap="sm">
        <span>{{ block.type }}</span>
        <span>{{ block.query }}</span>
      </dsp-flex>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.editing-switch {
  margin-left: auto;
}

.carousel-editor-action-bar {
  position: sticky;
  top: var(--header-height);
  padding: var(--spacing-sm);
  background-color: var(--color-surface);
  z-index: 1;
  border: solid 1px var(--color-gray-200);
}

.blocks-list {
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    padding: var(--spacing-sm);
    border: solid 1px var(--color-gray-200);
    position: relative;

    > *:first-child {
      margin-bottom: var(--spacing-sm);
    }

    > .remove-block {
      position: absolute;
      right: 0;
      top: 0;
      padding: 0;
      margin: var(--spacing-sm);
      padding: 2px;
      border-radius: var(--border-radius-circle);
    }
  }
}
</style>

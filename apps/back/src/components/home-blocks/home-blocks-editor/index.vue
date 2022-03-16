<script>
export default { name: 'HomeBlocksEditor' };
</script>

<script setup>
import { ref, computed, watch } from 'vue';
import downloadFile from 'js-file-download';
import { nanoid } from 'nanoid';
import { useFileReader } from '@dsp/core';
import { useI18n } from 'vue-i18n';
import { useFrontConfigApi } from '@dsp/core';
import { useForm, VALIDATION_MODES } from '@dsp/ui';
import { HOME_BLOCK_OPTIONS_DEFAULTS } from '@/utils/homeBlockDefinitions';

import HomeBlocksCard from '@/components/home-blocks/home-blocks-card/index.vue';

const { t } = useI18n();

const settings = ref(null);
const isEditing = ref(false);
const isDraggableStart = ref(false);

const [, { readAsText }] = useFileReader();

const { updateMutation, findByIdQuery } = useFrontConfigApi();
const query = findByIdQuery(1);
const { mutateAsync: updateFrontConfig, isLoading: isLoading } = updateMutation(
  {
    onSuccess() {
      console.log('onSuccess');
    }
  }
);

const onImport = async ([file]) => {
  const textSettings = await readAsText(file);
  const json = JSON.parse(textSettings);

  settings.value = {
    blocks: sortByPosition(json.blocks)
  };
};

const sortByPosition = blocks =>
  blocks.slice().sort((a, b) => a.position - b.position);

const onExport = () => {
  downloadFile(
    JSON.stringify(settings.value, null, 2),
    'home-blocks-settings.json'
  );
};

const addBlock = () => {
  settings.value.blocks.push({
    id: nanoid(),
    name: 'New Bloc',
    position: settings.value.blocks.length,
    options: {},
    type: null,
    query: null
  });
};
const isDraggable = computed(() => {
  return isEditing.value && isDraggableStart.value;
});

const deleteBlock = block => {
  const index = settings.value.blocks.indexOf(block);

  settings.value.blocks.splice(index, 1);
  settings.value.blocks.value.forEach((block, index) => {
    block.position = index;
  });
};

const moveBlock = (block, newIndex) => {
  const oldIndex = settings.value.blocks.indexOf(block);
  if (oldIndex === newIndex) return;

  const newBlocks = [...settings.value.blocks];
  newBlocks.splice(oldIndex, 1);
  newBlocks.splice(newIndex, 0, block);
  newBlocks.forEach((block, index) => {
    block.position = index;
  });
  settings.value.blocks = newBlocks;
};

const draggedBlock = ref(null);
const onDragEnter = index => {
  moveBlock(draggedBlock.value, index);
};

const onDragStart = block => {
  draggedBlock.value = block;
};

const onDragEnd = () => {
  draggedBlock.value = null;
  isDraggableStart.value = false;
};
const startDraggable = () => {
  isDraggableStart.value = true;
};

const form = useForm({
  onSubmit(values) {
    console.log('values ==> ', values);
    return updateFrontConfig({
      id: 1,
      entity: {
        homePageSettings: []
        // {
        //   blocks: Object.values(values)
        // }
      }
    });
  },
  mode: VALIDATION_MODES.ON_BLUR
});
const [, { values: formValues }] = form;

const initSettings = data => {
  if (!data) return;

  if (!data.homePageSettings) {
    settings.value = { blocks: HOME_BLOCK_OPTIONS_DEFAULTS['ITEM'] };
    return;
  }

  settings.value = { blocks: data.homePageSettings };
};

watch(query.data, initSettings, { immediate: true });

const onChangeType = ({ index, event }) => {
  console.log({ index, value: event.target.value });
};
</script>

<template>
  <dsp-query-loader :query="query">
    <dsp-smart-form :form="form" class="form">
      <pre>{{ formValues }}</pre>
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
              type="button"
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
          type="button"
          @click="onExport"
        >
          Exporter
        </dsp-loading-button>

        <dsp-button
          v-if="isEditing"
          type="button"
          left-icon="add"
          @click="addBlock"
        >
          Ajouter un bloc
        </dsp-button>

        <dsp-smart-form-submit v-if="isEditing">
          Sauvegarder
        </dsp-smart-form-submit>

        <dsp-switch
          v-model="isEditing"
          class="editing-switch"
          :label="t('user.details.editModeSwitchLabel')"
        />
      </dsp-flex>
      <ul class="blocks-list">
        <li
          v-for="(block, index) in settings.blocks"
          :key="block.id"
          class="card-container"
          :draggable="isDraggable"
          @dragstart="onDragStart(block)"
          @dragend="onDragEnd(block)"
          @dragenter="onDragEnter(index)"
        >
          <HomeBlocksCard
            v-model="settings.blocks[index]"
            :is-editing="isEditing"
            :index="index"
            :block-value="formValues[String(index)]"
            @delete="deleteBlock"
            @draggable-start="startDraggable"
            @change:type="onChangeType"
          />
        </li>
      </ul>
      <dsp-flex direction="row-reverse" justify="space-between"></dsp-flex>
    </dsp-smart-form>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
.icon-draggable {
  margin-left: auto;
  align-self: stretch;
  width: 5px;
  height: 25px;
  border-left: solid 2px var(--color-separator);
  border-right: solid 2px var(--color-separator);
  cursor: pointer;
}
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
    border: solid 1px var(--color-gray-200);
    position: relative;
  }
}

.card-container,
header {
  margin-top: var(--spacing-md);
  box-shadow: var(--box-shadow-sm);
}

.blocks-list {
  padding: var(--spacing-md);
}
</style>

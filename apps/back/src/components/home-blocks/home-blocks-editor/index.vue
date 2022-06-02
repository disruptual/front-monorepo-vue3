<script>
export default { name: 'HomeBlocksEditor' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { nanoid } from 'nanoid';
import { useI18n } from 'vue-i18n';
import { useFrontConfigApi } from '@dsp/core';
import { useForm, useToast, VALIDATION_MODES } from '@dsp/ui';

import HomeBlocksCard from '@/components/home-blocks/home-blocks-card/index.vue';

const { t } = useI18n();

const isEditing = ref(false);
const { showSuccess, showError } = useToast();

const { updateMutation, findByIdQuery } = useFrontConfigApi();
const query = findByIdQuery(1, {
  onSuccess(data) {
    if (!data) return;

    if (!data.homePageSettings) {
      settings.value = { blocks: [] };
      return;
    }

    settings.value = { blocks: data.homePageSettings };
  }
});
const settings = ref(
  query.data.value?.homePageSettings
    ? { blocks: query.data.value.homePageSettings }
    : null
);

const { mutateAsync: updateFrontConfig } = updateMutation({
  onSuccess() {
    showSuccess('Blocks homepage mis à jour avec succès');
  },
  onError(err) {
    console.error(err);
    showError('Erreur lors de la sauvegarde.');
  }
});

const sortedBlocks = computed(() =>
  settings.value?.blocks.slice().sort((a, b) => a.position - b.position)
);
const addBlock = () => {
  isEditing.value = true;

  settings.value.blocks.push({
    id: nanoid(),
    name: 'New Bloc',
    position: settings.value.blocks.length,
    options: {},
    type: null,
    query: null
  });
};

const deleteBlock = block => {
  const index = settings.value.blocks.findIndex(b => b.id === block.id);

  settings.value.blocks.splice(index, 1);
  settings.value.blocks.forEach((block, index) => {
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
const isDragging = ref(false);
const onDragEnter = index => {
  moveBlock(draggedBlock.value, index);
};

const onDragStart = block => {
  draggedBlock.value = block;
};

const onDragEnd = () => {
  draggedBlock.value = null;
  isDragging.value = false;
};

const form = useForm({
  onSubmit(values) {
    const homePageSettings = settings.value.blocks.map(({ id, position }) => ({
      ...values[id],
      id,
      position
    }));

    return updateFrontConfig({
      id: 1,
      entity: {
        homePageSettings
      }
    });
  },
  mode: VALIDATION_MODES.ON_BLUR
});
const [fields, { values: formValues }] = form;

const onChangeType = ({ blockId }) => {
  const relatedQueryField = fields.value[`${blockId}.query`];
  if (!relatedQueryField) return;
  relatedQueryField.value = null;
};
</script>

<template>
  <dsp-query-loader :query="query">
    <dsp-smart-form :form="form" class="form">
      <dsp-flex
        as="header"
        class="home-editor-action-bar"
        justify="center"
        align="center"
        gap="sm"
      >
        <dsp-smart-form-submit
          left-icon="save"
          :class="!isEditing && 'home-editor__form-submit--hidden'"
        >
          Sauvegarder
        </dsp-smart-form-submit>

        <dsp-switch
          v-model="isEditing"
          class="editing-switch"
          :label="t('user.details.editModeSwitchLabel')"
        />
      </dsp-flex>

      <ul class="blocks-list">
        <dsp-center v-if="settings?.blocks.length === 0" as="li">
          Vous n'avez défini aucun bloc pour le moment. Cliquez sur le bouton
          ci-dessous pour en ajouter.
        </dsp-center>
        <li
          v-for="(block, index) in sortedBlocks"
          :key="block.id"
          class="card-container"
          :draggable="isDragging"
          @dragenter="onDragEnter(index)"
          @dragstart="onDragStart(block)"
          @dragend="onDragEnd(block)"
        >
          <HomeBlocksCard
            :block="block"
            :is-editing="isEditing"
            :field-value="formValues[block.id]"
            @dragstart="isDragging = true"
            @delete="deleteBlock"
            @change:type="onChangeType"
          />
        </li>
      </ul>

      <dsp-center>
        <dsp-icon-button
          type="button"
          icon="add"
          size="lg"
          is-rounded
          title="Ajouter un bloc"
          @click="addBlock"
        />
      </dsp-center>
    </dsp-smart-form>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
.editing-switch {
  margin-left: auto;
}

.home-editor-action-bar {
  position: sticky;
  top: var(--header-height);
  padding: var(--spacing-sm);
  background-color: var(--color-surface);
  z-index: 1;
}

.blocks-list {
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    position: relative;
  }
}

.card-container {
  border: solid 1px var(--color-separator);
}

.card-container:not(:first-child),
header {
  margin-top: var(--spacing-md);
}

.blocks-list {
  @include not-mobile {
    padding: var(--spacing-md);
  }
}

.home-editor__form-submit--hidden {
  visibility: hidden;
}
</style>

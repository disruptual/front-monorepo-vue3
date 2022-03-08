<script>
export default { name: 'RecommendedCategoryModal' };
</script>

<script setup>
import { computed } from 'vue';
import { useDebouncedRef } from '@dsp/core';
import { useRecommendedCategoryApi, useCategoryApi } from '@dsp/core';
import { useToast } from '@dsp/ui';
const { showError } = useToast();

const props = defineProps({
  isOpened: { type: Boolean, required: true },
  recommendedCategory: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['success', 'close']);

const lowCategoryFilter = useDebouncedRef('', 500);

const { data: categories } = useCategoryApi().findAllQuery(
  computed(() => ({
    filters: {
      name: lowCategoryFilter.value
    },
    enabled: !!lowCategoryFilter.value
  }))
);

const { createMutation, deleteMutation } = useRecommendedCategoryApi();

const { mutate: createRecommendedCategory, isLoading: isCreating } =
  createMutation({
    onSuccess() {
      emit('success');
    },
    onError(err) {
      console.error(err);
      showError('Erreur lors de la création du top vendeur');
    }
  });

const { mutate: deleteRecommendedCategory, isLoading: isDeleting } =
  deleteMutation({
    onSuccess() {
      emit('success');
    },
    onError(err) {
      console.error(err);
      showError('Erreur lors de la suppression du top vendeur');
    }
  });

const addCategoryToRecommended = category => {
  createRecommendedCategory({
    category: category.uri,
    position: props.recommendedCategory.value.totalItems
  });
};

const removeCategoryToRecommended = category => {
  const { id } = getCategoryRecommended(category);
  deleteRecommendedCategory(id);
};

const getCategoryRecommended = category => {
  return props.recommendedCategory.value.find(
    recommendedCategory => recommendedCategory.category.id === category.id
  );
};
</script>

<template>
  <dsp-modal :is-opened="isOpened" @close="emit('close')">
    <dsp-center>
      <h2>Ajouter une top catégorie</h2>
    </dsp-center>
    <dsp-form-control v-model="lowCategoryFilter" label="Nom de la catégorie">
      <dsp-input-text
        v-model="lowCategoryFilter"
        class="inputsearch"
        spellcheck="false"
      />
    </dsp-form-control>
    <ul class="results-list">
      <dsp-flex
        v-for="category in categories"
        :key="category.id"
        as="li"
        align="center"
        gap="sm"
      >
        <router-link class="result-category" target="_blank" :to="{}">
          {{ category.name }}
        </router-link>
        <dsp-flex align="center" gap="sm" class="container-action">
          <dsp-loading-button
            v-if="!!getCategoryRecommended(category)"
            class="button-remove"
            :show-label-while-loading="false"
            :is-loading="isCreating || isDeleting"
            @click="removeCategoryToRecommended(category)"
          >
            <dsp-icon icon="minus" size="sm" />
          </dsp-loading-button>
          <dsp-loading-button
            v-else
            class="button-add"
            :show-label-while-loading="false"
            :is-loading="isCreating || isDeleting"
            @click="addCategoryToRecommended(category)"
          >
            <dsp-icon icon="add" size="sm" />
          </dsp-loading-button>
        </dsp-flex>
      </dsp-flex>
    </ul>
  </dsp-modal>
</template>

<style lang="scss" scoped>
.dsp-input-text {
  margin-bottom: var(--spacing-md);
}
.button-add,
.button-remove {
  border-radius: var(--border-radius-circle);
  padding: var(--spacing-xs) !important;
}

.container-action {
  margin-left: auto;
}
.results-list {
  margin: 0;
  padding: 0;

  li {
    border-bottom: solid 1px var(--color-brand-200);

    .result-category {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--spacing-sm) 0;
      gap: var(--spacing-md);
      text-decoration: none;
      color: inherit;

      &:hover {
        transform: translateX(5px);
        transition: transform var(--transition-sm);
      }
    }
  }
}
</style>

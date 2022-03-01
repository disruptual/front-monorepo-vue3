<script>
export default { name: 'RecommendedBrandModal' };
</script>

<script setup>
import { computed } from 'vue';
import { useDebouncedRef } from '@dsp/core';
import { useRecommendedBrandApi, useBrandApi } from '@dsp/core';
import { useToast } from '@dsp/ui';
const { showError } = useToast();

const props = defineProps({
  isOpened: { type: Boolean, required: true },
  recommendedBrand: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['success', 'close']);

const brandFilter = useDebouncedRef('', 500);

const { data: brands } = useBrandApi().findAllQuery(
  computed(() => ({
    filters: {
      name: brandFilter.value
    },
    enabled: !!brandFilter.value
  }))
);

const { createMutation, deleteMutation } = useRecommendedBrandApi();

const { mutate: createRecommendedBrand, isLoading: isCreating } =
  createMutation({
    onSuccess() {
      emit('success');
    },
    onError(err) {
      console.error(err);
      showError('Erreur lors de la création de la top marque');
    }
  });

const { mutate: deleteRecommendedBrand, isLoading: isDeleting } =
  deleteMutation({
    onSuccess() {
      emit('success');
    },
    onError(err) {
      console.error(err);
      showError('Erreur lors de la suppression de la top marque');
    }
  });

const addBrandToRecommended = brand => {
  createRecommendedBrand({
    brand: brand.uri,
    position: props.recommendedBrand.value.totalItems
  });
};

const removeBrandToRecommended = brand => {
  const { id } = getBrandRecommended(brand);
  deleteRecommendedBrand(id);
};

const getBrandRecommended = brand => {
  return props.recommendedBrand.value.find(
    recommendedBrand => recommendedBrand.brand.id === brand.id
  );
};
</script>

<template>
  <dsp-modal :is-opened="isOpened" @close="emit('close')">
    <dsp-center>
      <h2>Ajouter une top marques</h2>
    </dsp-center>
    <dsp-input-text
      v-model="brandFilter"
      class="inputsearch"
      spellcheck="false"
    />
    <ul class="results-list">
      <dsp-flex
        v-for="brand in brands"
        :key="brand.id"
        as="li"
        align="center"
        gap="sm"
      >
        <span class="result-brand">
          {{ brand.name }}
        </span>

        <dsp-flex align="center" gap="sm" class="container-action">
          <dsp-loading-button
            v-if="!!getBrandRecommended(brand)"
            class="button-remove"
            :show-label-while-loading="false"
            :is-loading="isCreating || isDeleting"
            @click="removeBrandToRecommended(brand)"
          >
            <dsp-icon icon="minus" size="sm" />
          </dsp-loading-button>
          <dsp-loading-button
            v-else
            class="button-add"
            :show-label-while-loading="false"
            :is-loading="isCreating || isDeleting"
            @click="addBrandToRecommended(brand)"
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

    .result-brand {
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

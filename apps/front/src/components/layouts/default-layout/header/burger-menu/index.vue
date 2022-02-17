<script>
export default { name: 'HeaderBurgerMenu' };
</script>
<script setup>
import { ref, computed } from 'vue';
import { useCategoryApi } from '@dsp/core';

const { data: categories } = useCategoryApi().findAllQuery();
const rootCategories = computed(() => categories.value?.filter(c => !c.parent));

const isOpened = ref(false);
</script>

<template>
  <dsp-icon-button icon="bars" size="lg" is-plain @click="isOpened = true" />
  <dsp-drawer :is-opened="isOpened" @close="isOpened = false">
    <dsp-flex justify="space-between" as="header">
      <h2>Menu</h2>
      <dsp-drawer-close-button />
    </dsp-flex>

    <dsp-center gap="sm" class="actions-wrapper">
      <dsp-flex direction="column" gap="sm">
        <dsp-button is-full-width>Vendre</dsp-button>
        <dsp-button is-outlined is-full-width>
          Connexion / Inscription
        </dsp-button>
      </dsp-flex>
    </dsp-center>

    <ul v-if="rootCategories" class="categories">
      <dsp-flex
        v-for="category in rootCategories"
        :key="category.id"
        as="li"
        gap="sm"
        align="center"
      >
        <img
          v-if="category.picto"
          class="category__icon"
          :src="category.picto"
        />
        <span>{{ category.name }}</span>
      </dsp-flex>
    </ul>
  </dsp-drawer>
</template>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  background: var(--color-surface);
  border-bottom: solid 1px var(--color-gray-100);
  margin-bottom: var(--spacing-sm);
}

h2 {
  margin-left: var(--spacing-sm);
}

.categories {
  margin-top: var(--spacing-sm);

  li {
    padding: var(--spacing-sm);
  }

  img {
    width: 1em;
    height: 1em;
    object-fit: cover;
  }
}
</style>

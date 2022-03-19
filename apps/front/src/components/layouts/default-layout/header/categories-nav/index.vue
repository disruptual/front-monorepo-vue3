<script>
export default { name: 'HeaderCategoriesNav' };
</script>

<script setup>
import { computed } from 'vue';
import { useCategoryApi } from '@dsp/core';
import { vReadableColor } from '@dsp/ui';
import schema from './index.schema';

const props = schema.toProps(schema.toProps());
const componentContext = schema.toContext(props);

const { data: categories } = useCategoryApi().findAllQuery();

const rootCategories = computed(() =>
  categories.value?.filter(c => !c._parent)
);
</script>

<template>
  <nav v-readable-color class="categories-nav">
    <dsp-flex as="ul" gap="lg" justify="center" class="categories-nav__list">
      <dsp-flex
        v-for="category in rootCategories"
        :key="category.id"
        tag="li"
        gap="sm"
        class="categories-nav__item"
      >
        <router-link
          :to="{ name: 'ItemSearch', params: { category: category.slug } }"
        >
          <img v-if="category.picto" :src="category.picto" />
          {{ category.name }}
        </router-link>
      </dsp-flex>
    </dsp-flex>
  </nav>
</template>

<style lang="scss" scoped>
.categories-nav {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: v-bind('componentContext.backgroundColor');
}

.categories-nav__item {
  img {
    width: 1em;
    aspect-ratio: 1;
  }
}

.categories-nav__list {
  min-height: 1em;
}
</style>

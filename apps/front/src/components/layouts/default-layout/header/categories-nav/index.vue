<script>
export default { name: 'HeaderCategoriesNav' };
</script>

<script setup>
import { computed } from 'vue';
import { useCategoryApi } from '@dsp/core';
import { vReadableColor } from '@dsp/ui';
import schema from './index.schema';

const props = defineProps(schema.toProps());
const componentContext = schema.toContext(props);

const { data: categories } = useCategoryApi().findAllQuery();

const rootCategories = computed(() =>
  categories.value?.filter(c => !c._parent)
);
</script>

<template>
  <nav v-readable-color class="categories-nav">
    <dsp-flex as="ul" gap="lg" justify="center" class="categories-nav__list">
      <li
        v-for="category in rootCategories"
        :key="category.id"
        gap="sm"
        align="center"
      >
        <router-link
          :to="{ name: 'ItemSearch', params: { category: category.slug } }"
        >
          <dsp-flex gap="sm" align="center">
            <img v-if="category.picto" :src="category.picto" />
            {{ category.name }}
          </dsp-flex>
        </router-link>
      </li>
    </dsp-flex>
  </nav>
</template>

<style lang="scss" scoped>
.categories-nav {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: v-bind('componentContext.backgroundColor');
}

.categories-nav__list {
  min-height: 1.25em;

  li img {
    width: 1.25em;
    aspect-ratio: 1;
  }
}
</style>

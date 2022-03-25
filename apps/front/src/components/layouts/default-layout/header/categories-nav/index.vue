<script>
export default { name: 'HeaderCategoriesNav' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCategoryApi } from '@dsp/core';
import { vReadableColor } from '@dsp/ui';
import schema from './index.schema';

const props = defineProps(schema.toProps());
const componentContext = schema.toContext(props);
const { t } = useI18n();

const { data: categories } = useCategoryApi().findAllQuery();

const rootCategories = computed(() =>
  categories.value?.filter(c => !c._parent)
);

const alignment = computed(() => {
  const map = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
  };

  return map[componentContext.value.align];
});
</script>

<template>
  <nav v-readable-color class="categories-nav">
    <dsp-flex
      as="ul"
      gap="lg"
      :justify="alignment"
      class="categories-nav__list"
    >
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

      <li
        v-if="componentContext.hasMainsiteLink"
        class="categories-nav__main-site-link"
      >
        <a :href="componentContext.mainsiteUrl">
          {{ t('categoriesNav.mainsiteLink') }}
        </a>
      </li>
    </dsp-flex>
  </nav>
</template>

<style lang="scss" scoped>
.categories-nav {
  position: relative;
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: v-bind('componentContext.backgroundColor');
  /* font-size: var(--font-size-lg); */
}

.categories-nav__list {
  min-height: 1.25em;

  li img {
    width: 1.25em;
    aspect-ratio: 1;
  }
}

.categories-nav__main-site-link {
  position: absolute;
  right: 0;
  margin-right: var(--spacing-md);

  a {
    text-decoration: underline;
  }
}
</style>

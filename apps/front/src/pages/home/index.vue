<script setup>
import { useI18n } from 'vue-i18n';
import { useItemApi } from '@dsp/core';
import ItemCard from '@/components/item-card/index.vue';

const { t } = useI18n();
const query = useItemApi().searchQuery({
  relations: ['mainMedia', 'category', 'category.root', 'colors']
});
</script>

<template>
  <div>
    <h1>{{ t('home.title') }}</h1>
    <dsp-infinite-query-loader
      v-slot="{ entity }"
      :query="query"
      class="item-list"
    >
      <ItemCard :item="entity" />
    </dsp-infinite-query-loader>
  </div>
</template>

<style lang="scss" scoped>
:deep(.item-list) {
  --grid-size: 12em;
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fit, var(--grid-size));
  place-content: center;

  @include mobile-only {
    --grid-size: calc(50vw - var(--spacing-sm));
    gap: var(--spacing-sm);
  }
}
</style>

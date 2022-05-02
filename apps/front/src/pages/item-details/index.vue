<script>
export default { name: 'ItemDetailsPage' };
</script>

<script setup>
import { useRoute } from 'vue-router';
import { useItemApi } from '@dsp/core';

import ItemDetailsInfos from '@/components/item/details/infos/index.vue';
import ItemDetailsAction from '@/components/item/details/action/index.vue';
import ItemDetailsMedia from '@/components/item/details/media/index.vue';
import ItemDetailsSeller from '@/components/item/details/seller/index.vue';

const route = useRoute();

const query = useItemApi().findBySlugQuery(route.params.slug, {
  relations: ['user']
});

const { data: item } = query;
</script>

<template>
  <dsp-query-loader :query="query">
    <dsp-container is-large>
      <dsp-grid v-if="item" class="item-details-page" columns="60% 40%">
        <dsp-grid-item>
          <ItemDetailsMedia :item="item" />
        </dsp-grid-item>
        <dsp-grid-item>
          <ItemDetailsInfos :item="item" />
        </dsp-grid-item>
        <dsp-grid-item>
          <!-- <ItemDetailsDressing :item="item" /> -->
          sa boutique
        </dsp-grid-item>
        <dsp-grid-item>
          <ItemDetailsSeller :seller="item.user" />
        </dsp-grid-item>
        <dsp-grid-item column="1 / -1">item similaire</dsp-grid-item>
      </dsp-grid>
    </dsp-container>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
.item-details-page {
  background-color: var(--color-surface);
  padding: var(--spacing-lg);
}
</style>

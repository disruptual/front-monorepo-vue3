<script>
export default { name: 'ItemDetailsPage' };
</script>

<script setup>
import { useRoute } from 'vue-router';

import ItemDetailsInfos from '@/components/item/details/infos/index.vue';
import ItemDetailsAction from '@/components/item/details/action/index.vue';
import ItemDetailsMedia from '@/components/item/details/media/index.vue';
import ItemDetailsSeller from '@/components/item/details/seller/index.vue';
import ItemDetailsProvider from '@/components/item/details/item-details-provider.vue';

const route = useRoute();
</script>

<template>
  <ItemDetailsProvider :item-slug="route.params.slug">
    <dsp-container is-large>
      <dsp-grid class="item-details-page" columns="60% 40%">
        <dsp-grid-item>
          <ItemDetailsMedia />
        </dsp-grid-item>
        <dsp-grid-item>
          <ItemDetailsInfos />
        </dsp-grid-item>
        <dsp-grid-item>
          <!-- <ItemDetailsDressing :item="item" /> -->
          sa boutique
        </dsp-grid-item>
        <dsp-grid-item>
          <ItemDetailsSeller />
        </dsp-grid-item>
        <dsp-grid-item column="1 / -1">item similaire</dsp-grid-item>
      </dsp-grid>
    </dsp-container>
  </ItemDetailsProvider>
</template>

<style lang="scss" scoped>
.item-details-page {
  background-color: var(--color-surface);
  padding: var(--spacing-lg);
}
</style>

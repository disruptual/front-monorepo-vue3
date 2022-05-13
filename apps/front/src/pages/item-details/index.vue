<script>
export default { name: 'ItemDetailsPage' };
</script>

<script setup>
import { useRoute } from 'vue-router';
import { useDevice } from '@dsp/ui';

import ItemDetailsInfos from '@/components/item/details/infos/index.vue';
import ItemDetailsAction from '@/components/item/details/action/index.vue';
import ItemDetailsMedia from '@/components/item/details/media/index.vue';
import ItemDetailsSeller from '@/components/item/details/seller/index.vue';
import ItemDetailsProvider from '@/components/item/details/item-details-provider.vue';
import ItemDetailsDressing from '@/components/item/details/dressing/index.vue';
import ItemDetailsSimilarItems from '@/components/item/details/similar-items/index.vue';
import CartBottomPanel from '@/components/cart/bottom-panel/index.vue';

const route = useRoute();
const device = useDevice();
</script>

<template>
  <ItemDetailsProvider :item-slug="route.params.slug">
    <dsp-container is-large>
      <dsp-grid
        class="item-details-page"
        :columns="device.isMobile ? 1 : '6fr 4fr'"
        gap="sm"
      >
        <dsp-grid-item>
          <ItemDetailsMedia />
        </dsp-grid-item>

        <dsp-grid-item>
          <ItemDetailsInfos />
          <ItemDetailsAction class="item-details-page__actions" />
        </dsp-grid-item>

        <dsp-grid-item :row="device.isMobile ? 4 : null">
          <ItemDetailsDressing />
        </dsp-grid-item>

        <dsp-grid-item :row="device.isMobile ? 3 : null">
          <ItemDetailsSeller class="item-details-page__seller" />
        </dsp-grid-item>

        <dsp-grid-item column="1 / -1">
          <ItemDetailsSimilarItems />
        </dsp-grid-item>
      </dsp-grid>
      <CartBottomPanel />
    </dsp-container>
  </ItemDetailsProvider>
</template>

<style lang="scss" scoped>
.item-details-page {
  background-color: var(--color-surface);
  padding: var(--spacing-lg);

  @include mobile-only {
    padding: var(--spacing-sm);
  }
}

.item-details-page__seller {
  position: sticky;
  top: var(--header-height);

  @include mobile-only {
    margin: calc(-1 * var(--spacing-sm));
  }
}

.item-details-page__actions {
  margin-top: var(--spacing-lg);
}
</style>

<script>
export default { name: 'ItemDetailsProvider' };
</script>
<script setup>
import { provide, computed } from 'vue';
import { useItemApi } from '@dsp/core';
import { useDeliveryApi, useDeliveryPriceApi } from '@dsp/core';
import { ITEM_DETAILS_CONTEXT_KEY } from './item-details-constants';

const props = defineProps({
  itemSlug: { type: String, required: true }
});

const itemQuery = useItemApi().findBySlugQuery(props.itemSlug, {
  relations: ['user', 'brand', 'size', 'condition']
});

const deliveriesQuery = useDeliveryApi().findAllQuery();

const deliveryPricesQuery = useDeliveryPriceApi().findAllQuery();

const queries = [itemQuery, deliveriesQuery, deliveryPricesQuery];

const context = {
  item: computed(() => itemQuery.data.value),
  deliveries: computed(() => deliveriesQuery.data.value),
  deliveryPrices: computed(() => deliveryPricesQuery.data.value)
};
provide(ITEM_DETAILS_CONTEXT_KEY, context);
</script>

<template>
  <dsp-queries-loader :queries="queries">
    <slot />
  </dsp-queries-loader>
</template>

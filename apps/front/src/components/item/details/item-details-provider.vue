<script>
export default { name: 'ItemDetailsProvider' };
</script>
<script setup>
import { provide, computed, ref } from 'vue';
import {
  useDeliveryApi,
  useDeliveryPriceApi,
  useItemApi,
  useCurrentUser
} from '@dsp/core';
import { ITEM_DETAILS_CONTEXT_KEY } from './item-details-constants';

const props = defineProps({
  itemSlug: { type: String, required: true }
});

const { data: currentUser } = useCurrentUser({ relations: ['mainAddress'] });
const itemQuery = useItemApi().findBySlugQuery(props.itemSlug, {
  relations: ['user', 'brand', 'size', 'condition', 'category']
});

const deliveriesQuery = useDeliveryApi().findAllQuery();

const deliveryPricesQuery = useDeliveryPriceApi().findAllQuery();

const sellerItemsQuery = useItemApi().findAllByUserIdQuery(
  computed(() => itemQuery.data.value?.user?.id),
  computed(() => ({
    enabled: !!itemQuery.data.value?.user?.id,
    requestOptions: {
      params: {
        itemsPerPage: 6
      }
    }
  }))
);

const similarItemsQuery = useItemApi().searchQuery(
  computed(() => ({
    enabled: !!itemQuery.data.value,
    filters: {
      'category.id': itemQuery.data.value?.category?.id,
      'sort[rank]': 'desc',
      excludeItemId: itemQuery.data.value?.id,
      geolocation: currentUser.value?.mainAddress?.id
    }
  }))
);

const queries = [
  itemQuery,
  deliveriesQuery,
  deliveryPricesQuery,
  sellerItemsQuery,
  similarItemsQuery
];

const context = {
  item: computed(() => itemQuery.data.value),
  deliveries: computed(() => deliveriesQuery.data.value),
  deliveryPrices: computed(() => deliveryPricesQuery.data.value),
  sellerItems: computed(() => sellerItemsQuery.data.value),
  similarItems: computed(() => similarItemsQuery.data.value)
};
provide(ITEM_DETAILS_CONTEXT_KEY, context);
</script>

<template>
  <dsp-queries-loader :queries="queries">
    <slot />
  </dsp-queries-loader>
</template>

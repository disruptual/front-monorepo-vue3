<script>
export default { name: 'ItemDetailsProvider' };
</script>
<script setup>
import { provide, computed, unref } from 'vue';
import {
  useDeliveryApi,
  useDeliveryPriceApi,
  useItemApi,
  useCurrentUser,
  deepUnref
} from '@dsp/core';
import { ITEM_DETAILS_CONTEXT_KEY } from './item-details-constants';

const props = defineProps({
  itemSlug: { type: String, required: true }
});

const { data: currentUser } = useCurrentUser({
  relations: ['mainAddress', 'carts']
});
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
  similarItems: computed(() => similarItemsQuery.data.value),
  cart: computed(() =>
    currentUser.value?.carts?.find(
      cart => cart.order === null && cart._seller === itemQuery.data.value._user
    )
  )
};

const slotProps = computed(() =>
  Object.fromEntries(Object.entries(context).map(([k, v]) => [k, unref(v)]))
);
provide(ITEM_DETAILS_CONTEXT_KEY, context);
</script>

<template>
  <dsp-queries-loader :queries="queries">
    <slot v-bind="slotProps" />
  </dsp-queries-loader>
</template>

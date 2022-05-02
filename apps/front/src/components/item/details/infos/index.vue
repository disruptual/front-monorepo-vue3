<script>
export default { name: 'ItemDetailsInfos' };
</script>

<script setup>
import { computed } from 'vue';
import { Item } from '@dsp/business';
import { useDeliveryApi, useDeliveryPriceApi, deepUnref } from '@dsp/core';
import ItemFavoriteButton from '../../favorite-button/index.vue';
import DeliveryCard from '@/components/delivery/card/index.vue';

const props = defineProps({
  item: { type: Item, required: true }
});

const { data: deliveries } = useDeliveryApi().findAllQuery();
const { data: deliveryPrices } = useDeliveryPriceApi().findAllQuery();

const getDeliveries = computed(() => {
  return props.item.getDeliveries(
    deepUnref({
      deliveries,
      deliveryPrices,
      allowedDeliveriesOnly: true
    })
  );
});
</script>

<template>
  <dsp-section>
    <dsp-flex direction="column" wrap="nowrap">
      <dsp-flex align="center" justify="space-between">
        <dsp-section-heading>{{ item.title }}</dsp-section-heading>
        <ItemFavoriteButton :item="item" size="lg" />
      </dsp-flex>

      <p class="description">
        {{ item.content }}
      </p>
      <p>
        {{ item.formatedPrice }}
      </p>
      <div v-if="item.originalPrice" class="original-price">
        {{ item.formatedOriginalPrice }}
      </div>
      <p>Marque: {{ item.brand?.name }}</p>
      <p>Taille: {{ item.size?.name }}</p>
      <p>Etat: {{ item.condition?.stateName }}</p>
      <p>Mise à jour le: {{ item.updated }}</p>
      <p>mode de livraison :</p>
      <pre>
        {{ getDeliveries }}
      </pre>
      <!-- <DeliveryCard :delivery="" /> -->
    </dsp-flex>
  </dsp-section>
</template>

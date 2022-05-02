<script>
export default { name: 'ItemDetailsInfos' };
</script>

<script setup>
import { computed, watch, unref } from 'vue';
import { Item } from '@dsp/business';
import { deepUnref } from '@dsp/core';
import ItemFavoriteButton from '../../favorite-button/index.vue';
import DeliveryCard from '@/components/delivery/card/index.vue';
import { useItemDetails } from '../use-item-details';

const { item, deliveries, deliveryPrices } = useItemDetails();

const allowedDeliveries = computed(() => {
  return item.value.getDeliveries(
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
      <dl>
        <dt>Description</dt>
        <dd>
          {{ item.content }}
        </dd>

        <dt>Prix</dt>
        <dd>
          {{ item.formatedPrice }}
          <div v-if="item.originalPrice" class="original-price">
            {{ item.formatedOriginalPrice }}
          </div>
        </dd>

        <dt>Marque</dt>
        <dd>{{ item.brand?.name }}</dd>

        <dt>Taille</dt>
        <dd>{{ item.size?.name }}</dd>

        <dt>Etat</dt>
        <dd>{{ item.condition?.stateName }}</dd>

        <div>Mise à jour le: {{ item.updated }}</div>

        <dt>Modes de livraison :</dt>
        <dsp-flex as="dd" gap="lg">
          <DeliveryCard
            v-for="delivery in allowedDeliveries"
            :key="delivery.id"
            :delivery="delivery"
          />
        </dsp-flex>
      </dl>
    </dsp-flex>
  </dsp-section>
</template>

<style lang="scss" scoped>
dd {
  margin: 0;
}
</style>

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
        <p class="description">
          {{ item.content }}
        </p>

        <div class="price">
          {{ item.formatedPrice }}
          <div v-if="item.originalPrice" class="original-price">
            {{ item.formatedOriginalPrice }}
          </div>
        </div>

        <dsp-flex gap="sm" class="field">
          <dt>Marque</dt>
          <dd>{{ item.brand?.name }}</dd>
        </dsp-flex>

        <dsp-flex gap="sm" class="field">
          <dt>Taille</dt>
          <dd>{{ item.size?.name }}</dd>
        </dsp-flex>

        <dsp-flex gap="sm" class="field">
          <dt>Etat</dt>
          <dd>{{ item.condition?.stateName }}</dd>
        </dsp-flex>

        <dsp-flex gap="sm" class="field">
          <dt>Mise à jour le</dt>
          <dd>{{ item.updated }}</dd>
        </dsp-flex>

        <dsp-flex gap="sm" class="field" align="center">
          <dt>Livraison :</dt>
          <dsp-flex as="dd" gap="lg">
            <DeliveryCard
              v-for="delivery in allowedDeliveries"
              :key="delivery.id"
              :delivery="delivery"
            />
          </dsp-flex>
        </dsp-flex>
      </dl>
    </dsp-flex>
  </dsp-section>
</template>

<style lang="scss" scoped>
dl,
dt,
dd {
  margin: 0;
}

.description {
  margin: 0;
}

.price {
  font-size: var(--font-size-xl);
  margin: var(--spacing-sm) 0;
}

.original-price {
  font-size: var(--font-size-lg);
  text-decoration: line-through;
}

.field {
  padding: var(--spacing-sm) 0;
  border-bottom: solid 1px var(--color-separator);
}
</style>

<script>
export default { name: 'ItemDetailsInfos' };
</script>

<script setup>
import { Item } from '@dsp/business';
import ItemFavoriteButton from '../../favorite-button/index.vue';

const props = defineProps({
  item: { type: Item, required: true }
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
    </dsp-flex>
  </dsp-section>
</template>

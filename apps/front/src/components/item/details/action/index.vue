<script>
export default { name: 'ItemDetailsAction' };
</script>

<script setup>
import { useDevice } from '@dsp/ui';
import ItemBuyButton from '@/components/item/buy-button/index.vue';
import { useItemDetails } from '../use-item-details';

const device = useDevice();
const { item } = useItemDetails();
</script>

<template>
  <div>
    <dsp-grid :columns="device.isMobile ? 1 : 2" gap="md">
      <ItemBuyButton :item="item" />
      <dsp-button is-outlined>Faire une offre</dsp-button>
    </dsp-grid>
    <dsp-plain-button class="item-details-action__report-button">
      Signaler l'annonce
    </dsp-plain-button>
  </div>
</template>

<style scoped>
.item-details-action__report-button {
  text-decoration: underline;
  padding-left: 0;
}
</style>

<script>
export default { name: 'ItemDetailsAction' };
</script>

<script setup>
import { useDevice } from '@dsp/ui';

const device = useDevice();
</script>

<template>
  <div>
    <dsp-grid :columns="device.isMobile ? 1 : 2" gap="md">
      <dsp-button>Acheter</dsp-button>
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

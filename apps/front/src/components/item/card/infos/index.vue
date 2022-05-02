<script>
export default { name: 'ItemCardInfos' };
</script>

<script setup>
import { Item } from '@dsp/business';

defineProps({
  item: { type: Item, required: true }
});
</script>

<template>
  <dsp-flex justify="space-between" align="center">
    <div class="item-card-infos__price">{{ item.formatedPrice }}</div>
  </dsp-flex>
  <div class="item-card-infos__brand">
    {{ item.brand?.name }}
  </div>

  <dsp-truncated-text as="div" class="item-card-infos__category">
    {{ item.category?.name }}
  </dsp-truncated-text>
</template>

<style lang="scss" scoped>
.item-card-infos__brand {
  font-weight: var(--font-weight-bold);
}

.item-card-infos__category {
  font-size: var(--font-size-sm);
}

.item-card-infos__price {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}
</style>

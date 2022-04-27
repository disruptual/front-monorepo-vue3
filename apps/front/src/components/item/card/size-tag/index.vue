<script>
export default { name: 'ItemCardSizeTag' };
</script>
<script setup>
import { Item } from '@dsp/business';
import { vReadableColor } from '@dsp/ui';

const props = defineProps({
  item: { type: Item, required: true }
});
</script>

<template>
  <div v-if="props.item.size" v-readable-color class="item-card-size-tag">
    {{ props.item.size?.name }}
  </div>
</template>

<style lang="scss" scoped>
.item-card-size-tag {
  background: var(--color-brand-800);
  border-radius: var(--border-radius-pill);
  padding: var(--spacing-xxs) var(--spacing-xs);
  font-size: var(--font-size-sm);
}
</style>

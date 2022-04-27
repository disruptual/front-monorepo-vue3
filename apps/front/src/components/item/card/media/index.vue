<script>
export default { name: 'ItemCardMedia' };
</script>

<script setup>
import { Item } from '@dsp/business';
import { useItemCard } from '../use-item-card';

const props = defineProps({
  item: { type: Item, required: true }
});

const { imageUrl } = useItemCard(props);
</script>

<template>
  <dsp-grid columns="auto 1fr auto" rows="auto 1fr auto" justify="flex-start">
    <dsp-grid-item column="1 / -1" row="1 / -1">
      <router-link
        :to="{ name: 'ItemDetails', params: { slug: props.item.slug } }"
      >
        <dsp-image :src="imageUrl" :alt="item.title" draggable="false" />
      </router-link>
    </dsp-grid-item>

    <dsp-grid-item column="1" row="1">
      <slot name="top-left" />
    </dsp-grid-item>
    <dsp-grid-item column="3" row="1">
      <slot name="top-right" />
    </dsp-grid-item>
    <dsp-grid-item column="1" row="3">
      <slot name="bottom-left" />
    </dsp-grid-item>
    <dsp-grid-item column="3" row="3">
      <slot name="bottom-right" />
    </dsp-grid-item>
  </dsp-grid>
</template>

<style lang="scss" scoped>
img {
  transition: var(--transition-sm);
  width: 100%;
  aspect-ratio: 7 / 9;
}
</style>

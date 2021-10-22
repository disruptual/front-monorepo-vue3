<script>
export default { name: 'ItemCard' };
</script>

<script setup>
import { Item } from '@dsp/business';
import { vLazyText } from '@dsp/ui';

defineProps({
  item: { type: Item, required: true }
});
</script>

<template>
  <figure class="item">
    <dsp-aspect-ratio>
      <dsp-image
        :src="item.mainMedia?.thumbnails?.itemList"
        :alt="item.title"
      />
    </dsp-aspect-ratio>

    <figcaption class="item__infos">
      <div class="header">
        <div class="title">
          <dsp-truncated-text>{{ item.title }}</dsp-truncated-text>
        </div>
        <div class="colors">
          <div
            v-for="color in item.colors"
            :key="color.id"
            :style="{
              '--color': color.hexCode
            }"
          />
        </div>
      </div>
      <dsp-truncated-text v-lazy-text>
        {{ item.category?.name }}
      </dsp-truncated-text>
      <div class="price">{{ item.formatedPrice }}</div>
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
.item {
  margin: 0;
  background: var(--color-surface);
}

.item__infos {
  text-align: center;
  padding: var(--spacing-xs);
}

.header {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-sm);
}
.title {
  grid-column: 2;
  text-align: center;
  max-width: 100%;
}

.colors {
  grid-column: 3;
  margin-left: auto;
  display: flex;
  gap: var(--spacing-sm);
  > * {
    height: 1em;
    width: 1em;
    border-radius: var(--border-radius-circle);
    background: var(--color);
  }
}
.price {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}
</style>

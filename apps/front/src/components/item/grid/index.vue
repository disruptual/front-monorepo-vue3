<script>
export default { name: 'ITemGrid' };
</script>
<script setup>
import ItemCard from '@/components/item/card/index.vue';
import { vOnIntersect } from '@dsp/ui';

defineProps({
  query: { type: Object, required: true }
});

const emit = defineEmits(['item:viewed']);
const onIntersect = item => entry => {
  if (entry.isIntersecting) emit('item:viewed', item);
};
</script>

<template>
  <div v-if="query.isSuccess.value">
    <dsp-infinite-query-loader v-slot="{ data }" :query="query" :buffer="800">
      <ul role="feed" class="item-grid">
        <li v-for="item in data" :key="item.id" role="article" tabindex="0">
          <ItemCard :item="item" @intersect="onIntersect(entity)" />
        </li>
      </ul>
    </dsp-infinite-query-loader>
  </div>
</template>

<style lang="scss" scoped>
.item-grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(min-content, 200px));

  @include not-mobile {
    place-content: center;
  }

  @include mobile-only {
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  > li:focus {
    outline: none;
    box-shadow: var(--box-shadow-md);
  }
}
</style>

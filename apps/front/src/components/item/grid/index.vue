<script>
export default { name: 'ItemGrid' };
</script>
<script setup>
import ItemCard from '@/components/item/card/index.vue';

defineProps({
  items: { type: Array, required: true }
});

const emit = defineEmits(['item:viewed']);
const onIntersect = item => entry => {
  if (entry.isIntersecting) emit('item:viewed', item);
};
</script>

<template>
  <ul role="feed" class="item-grid">
    <li v-for="item in items" :key="item.id" role="article" tabindex="0">
      <ItemCard :item="item" @intersect="onIntersect(entity)" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.item-grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));

  @include not-mobile {
    place-content: center;
  }

  @include mobile-only {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
  }

  > li:focus {
    outline: none;
    box-shadow: var(--box-shadow-md);
  }
}
</style>

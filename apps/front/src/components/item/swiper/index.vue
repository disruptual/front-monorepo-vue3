<script>
export default { name: 'ItemSwiper' };
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
  <dsp-swiper gap="md" class="item-swiper" has-fade>
    <dsp-swiper-item v-for="item in items" :key="item.id">
      <ItemCard
        :item="item"
        class="item-swiper__card"
        @intersect="onIntersect(entity)"
      />
    </dsp-swiper-item>
  </dsp-swiper>
</template>

<style lang="scss" scoped>
.item-swiper__card {
  width: 13em;
}
</style>

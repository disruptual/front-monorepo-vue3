<script>
export default { name: 'HomeContentBlockUser' };
</script>

<script setup>
import { computed } from 'vue';
import UserGrid from '@/components/user/grid/index.vue';
import UserSwiper from '@/components/user/swiper/index.vue';

const props = defineProps({
  data: { type: Array, required: true },
  block: { type: Object, required: true }
});

const uiTypeToComponentMap = {
  GRID: UserGrid,
  SWIPER: UserSwiper
};

const is = computed(() => uiTypeToComponentMap[props.block.options.uiType]);
const users = computed(() =>
  props.data.map(recommendedUser => recommendedUser.user)
);
</script>

<template>
  <component :is="is" :users="users" />
</template>

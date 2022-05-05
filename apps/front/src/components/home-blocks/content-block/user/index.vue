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
</script>

<template>
  <div class="home-content-block-user">
    <component :is="is" v-slot="{ user }" :users="props.data">
      <dsp-button
        :to="{ name: 'Profile', params: { slug: user.slug } }"
        is-full-width
      >
        Voir le dressing
      </dsp-button>
    </component>
  </div>
</template>

<style lang="scss" scoped>
.home-content-block-user {
  @include mobile-only {
    padding: 0 var(--spacing-sm);
  }
}
</style>

<script>
export default { name: 'UserSwiper' };
</script>
<script setup>
import UserCard from '@/components/user/card/index.vue';

defineProps({
  users: { type: Array, required: true }
});
</script>

<template>
  <dsp-swiper gap="md" class="user-swiper" has-fade>
    <dsp-swiper-item v-for="user in users" :key="user.id">
      <UserCard :user="user" class="user-swiper__card" />
    </dsp-swiper-item>
  </dsp-swiper>
</template>

<style lang="scss" scoped>
.user-swiper__card {
  width: 15em;
}
</style>

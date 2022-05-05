<script>
export default { name: 'UserGrid' };
</script>
<script setup>
import UserCard from '@/components/user/card/index.vue';

defineProps({
  users: { type: Array, required: true }
});
</script>

<template>
  <ul role="feed" class="user-grid">
    <li v-for="user in users" :key="user.id" role="article" tabindex="0">
      <UserCard :user="user">
        <slot :user="user" />
      </UserCard>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.user-grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));

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

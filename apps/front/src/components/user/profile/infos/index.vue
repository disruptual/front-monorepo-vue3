<script>
export default { name: 'UserProfileInfos' };
</script>

<script setup>
import { useUserProfile } from '../use-user-profile';
import ItemGrid from '@/components/item/grid/index.vue';

const { user, userItems } = useUserProfile();
</script>

<template>
  <div>Hello, {{ user.firstName }}</div>
  <ItemGrid :items="userItems" />
</template>

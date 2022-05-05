<script>
export default { name: 'UserProfileInfos' };
</script>

<script setup>
import { useUserProfile } from '../use-user-profile';

const { user } = useUserProfile();
</script>

<template>
  <div>Hello, {{ user.firstName }}</div>
</template>

<script setup>
import UserProfileProvider from '@/components/user/profile/user-profile-provider.vue';
import UserProfileInfos from '@/components/user/profile/infos/index.vue';
import UserProfileItems from '@/components/user/profile/items/index.vue';
</script>

<template>
  <UserProfileProvider>
    <dsp-container is-large>
      <UserProfileInfos />
      <UserProfileItems />
    </dsp-container>
  </UserProfileProvider>
</template>

<script>
export default { name: 'UserProfileInfos' };
</script>

<script setup>
import { useUserProfile } from '../use-user-profile';
import ItemGrid from '@/components/item/grid/index.vue';

const { queries } = useUserProfile();
</script>

<template>
  <dsp-section>
    <dsp-section-heading>Ses articles</dsp-section-heading>

    <dsp-infinite-query-loader
      v-slot="{ data: items }"
      :query="queries.userItems"
    >
      <ItemGrid :items="items" />
    </dsp-infinite-query-loader>
  </dsp-section>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import UserProfileProvider from '@/components/user/profile/user-profile-provider.vue';
import UserProfileInfos from '@/components/user/profile/infos/index.vue';
import UserProfileItems from '@/components/user/profile/items/index.vue';
import UserProfileReviews from '@/components/user/profile/reviews/index.vue';

const { replace } = useRouter();
const route = useRoute();

const activeTab = computed({
  get() {
    return route.query.section || 'infos';
  },
  set(value) {
    replace({ ...route, query: { section: value } });
  }
});
</script>

<template>
  <UserProfileProvider>
    <dsp-tabs v-model="activeTab">
      <dsp-tab name="infos" label="A propos">
        <dsp-surface>
          <dsp-container>
            <UserProfileInfos />
          </dsp-container>
        </dsp-surface>
        <dsp-container>
          <UserProfileItems />
        </dsp-container>
      </dsp-tab>

      <dsp-tab name="reviews" label="Ses avis">
        <dsp-surface>
          <dsp-container>
            <UserProfileReviews />
          </dsp-container>
        </dsp-surface>
      </dsp-tab>
    </dsp-tabs>
  </UserProfileProvider>
</template>

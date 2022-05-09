<script>
export default { name: 'UserProfilePage' };
</script>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import UserProfileProvider from '@/components/user/profile/user-profile-provider.vue';
import UserProfileInfos from '@/components/user/profile/infos/index.vue';
import UserProfileItems from '@/components/user/profile/items/index.vue';
import UserProfileReviews from '@/components/user/profile/reviews/index.vue';

const { t } = useI18n();
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

const myProfile = computed(() => {
  return !route.params.slug;
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
        <dsp-surface>
          <dsp-container>
            <UserProfileItems />
          </dsp-container>
        </dsp-surface>
      </dsp-tab>

      <dsp-tab
        name="reviews"
        :label="t(myProfile ? 'profile.myReviews' : 'profile.hisReviews')"
      >
        <dsp-surface>
          <dsp-container>
            <UserProfileReviews />
          </dsp-container>
        </dsp-surface>
      </dsp-tab>
    </dsp-tabs>
  </UserProfileProvider>
</template>

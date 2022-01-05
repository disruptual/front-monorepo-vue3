<script>
export default { name: 'AdminUserDetailPage' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useUserApi } from '@dsp/core';
import { USER_DETAILS_TABS as TABS } from '@/utils/constants';

import UserDetails from '@/components/user-details/index.vue';
import UserOrders from '@/components/user-orders/index.vue';
import UserItems from '@/components/user-items/index.vue';

const props = defineProps({
  slug: { type: String, required: true }
});

const { t } = useI18n();
const { replace } = useRouter();
const route = useRoute();

const query = useUserApi().findBySlugQuery(props.slug);

const breadCrumbLabel = computed(
  () => query.data.value?.fullName ?? t('breadcrumb.userDetails')
);
useBreadCrumbs(breadCrumbLabel);

const activeTab = computed({
  get() {
    return route.query.section || TABS.INFOS;
  },
  set(value) {
    replace({ ...route, query: { section: value } });
  }
});
</script>

<template>
  <dsp-query-loader v-slot="{ entity: user }" :query="query">
    <dsp-center>
      <h2>{{ user.fullName }}</h2>
    </dsp-center>
    <dsp-tabs v-model="activeTab">
      <dsp-tab :name="TABS.INFOS" :label="t(`user.details.tabs.${TABS.INFOS}`)">
        <dsp-container is-small>
          <dsp-surface>
            <UserDetails :user="user" @success="query.refetch.value()" />
          </dsp-surface>
        </dsp-container>
      </dsp-tab>

      <dsp-tab
        :name="TABS.ORDERS"
        :label="t(`user.details.tabs.${TABS.ORDERS}`)"
      >
        <dsp-container>
          <UserOrders :user-id="user.id" />
        </dsp-container>
      </dsp-tab>

      <dsp-tab :name="TABS.ITEMS" :label="t(`user.details.tabs.${TABS.ITEMS}`)">
        <dsp-container>
          <UserItems :user-id="user.id" />
        </dsp-container>
      </dsp-tab>
    </dsp-tabs>
  </dsp-query-loader>
</template>

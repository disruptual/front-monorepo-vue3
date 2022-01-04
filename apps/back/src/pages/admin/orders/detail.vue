<script>
export default { name: 'AdminOrderDetailPage' };
</script>

<script setup>
import { useOrderApi } from '@dsp/core';
import { ORDER_DETAILS_TABS as TABS } from '@/utils/constants';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useI18n } from 'vue-i18n';

import OrderItems from '@/components/order-items/index.vue';
import OrderDetails from '@/components/order-details/index.vue';
import OrderHistory from '@/components/order-history/index.vue';

const props = defineProps({
  id: { type: String, required: true }
});
const { t } = useI18n();
const { replace } = useRouter();
const route = useRoute();

const query = useOrderApi().findByIdQuery(props.id, {
  relations: [
    'seller',
    'buyer',
    'orderItems',
    'delivery',
    'remuneration',
    'location',
    'orderStateHistos',
    'deliveryStateHistos'
  ]
});

const activeTab = computed({
  get() {
    return route.query.section || TABS.INFOS;
  },
  set(value) {
    replace({ ...route, query: { section: value } });
  }
});

const breadCrumbLabel = computed(
  () =>
    t('breadcrumb.orderNumber', { id: query.data.value?.id }) ??
    t('breadcrumb.orderDetails')
);
useBreadCrumbs(breadCrumbLabel);
</script>

<template>
  <dsp-query-loader v-slot="{ entity: order }" :query="query">
    <dsp-center>
      <h2>{{ t('order.details.title.page') }}{{ order.id }}</h2>
    </dsp-center>
    <dsp-tabs v-model="activeTab">
      <dsp-tab
        :name="TABS.INFOS"
        :label="t(`order.details.tabs.${TABS.INFOS}`)"
      >
        <dsp-container as="section">
          <OrderDetails :order="order" />
        </dsp-container>
      </dsp-tab>

      <dsp-tab
        :name="TABS.ITEMS"
        :label="t(`order.details.tabs.${TABS.ITEMS}`)"
      >
        <dsp-container as="section">
          <OrderItems :order-id="props.id" />
        </dsp-container>
      </dsp-tab>

      <dsp-tab
        :name="TABS.HISTORY"
        :label="t(`order.details.tabs.${TABS.HISTORY}`)"
      >
        <dsp-container as="section">
          <dsp-surface>
            <OrderHistory :order="order" @rollback="query.refetch()" />
          </dsp-surface>
        </dsp-container>
      </dsp-tab>
    </dsp-tabs>
  </dsp-query-loader>
</template>

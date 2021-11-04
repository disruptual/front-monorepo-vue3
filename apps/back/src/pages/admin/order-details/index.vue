<script>
export default { name: 'AdminOrderDetailPage' };
</script>

<script setup>
import { useOrderApi } from '@dsp/core';
import { ORDER_DETAILS_TABS as TABS } from '@/utils/constants';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import OrderItems from '@/components/order-items/index.vue'
import OrderDetails from '@/components/order-details/index.vue'

const props = defineProps({
  id: { type: String, required: true }
});
const { t } = useI18n();
const { replace } = useRouter();
const route = useRoute();

const query = useOrderApi().findByOrderIdQuery(props.id, {
  relations: ['seller', 'buyer', 'orderItems']
});

console.log(query);

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
  <dsp-query-loader v-slot="{ entity: order }" :query="query">
    <dsp-center>
      <h2>Détails commande n°{{ order.id }}</h2>
    </dsp-center>
    <dsp-tabs v-model="activeTab">
      <dsp-tab
        :name="TABS.INFOS"
        :label="t(`order.details.tabs.${TABS.INFOS}`)"
      >
      <dsp-container>
          <dsp-surface>
            <dsp-container is-small>
              <OrderDetails :order="order"/>
            </dsp-container>
          </dsp-surface>
        </dsp-container>
      </dsp-tab>

      <dsp-tab
        :name="TABS.ITEMS"
        :label="t(`order.details.tabs.${TABS.ITEMS}`)"
      >
        <dsp-container>
          <OrderItems :order-id="props.id"/>
          </dsp-container>
      </dsp-tab>
    </dsp-tabs>
  </dsp-query-loader>
</template>

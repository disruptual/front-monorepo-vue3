<script>
export default { name: 'OrderDetails' };
</script>

<script setup>
import { ref, unref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Order } from '@dsp/business';
import { useI18n } from 'vue-i18n';
import { useOrderApi } from '@dsp/core';
import { ORDER_DETAILS_TABS as TABS } from '@/utils/constants';

const props = defineProps({
  order: { type: Order, required: true }
});

const { t } = useI18n();
const { replace } = useRouter();
const route = useRoute();
const orderApi = useOrderApi();

const itemsLink = computed(() => ({
  query: { section: TABS.ITEMS }
}));
const ordersLink = computed(() => ({
  query: { section: TABS.ORDERS }
}));

console.log("order ====> ", props.order);
</script>

<template>
    <div>Date de commande</div>
    <div>{{order?.formatCreated()}}</div>
    <br/>
    <div>Nombre d'articles commandés</div>
    <div>{{ order?.orderItems?.length }}</div>
    <div><router-link :to="itemsLink">(voir le détail)</router-link></div>
    <br/>
    <div>Montant total</div>
    <div>{{ order?.moneyBox }}</div>
</template>

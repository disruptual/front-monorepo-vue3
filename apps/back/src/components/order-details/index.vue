<script>
export default { name: 'OrderDetails' };
</script>

<script setup>
import { computed } from 'vue';
import { Order } from '@dsp/business';
import { ORDER_DETAILS_TABS as TABS } from '@/utils/constants';

defineProps({
  order: { type: Order, required: true }
});

const itemsLink = computed(() => ({
  query: { section: TABS.ITEMS }
}));
</script>

<template>
  <div>Date de commande</div>

  <div>{{ order.formatCreated() }}</div>
  <br />
  <div>Nombre d'articles commandés</div>
  <div>{{ order.orderItems?.length }}</div>
  <div><router-link :to="itemsLink">(voir le détail)</router-link></div>
  <br />
  <div>Montant total</div>
  <div>{{ order.formatedPrice }}</div>
</template>

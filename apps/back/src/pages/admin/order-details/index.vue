<script>
export default { name: 'AdminOrderDetailPage' };
</script>

<script setup>
import { useOrderApi } from '@dsp/core';

const props = defineProps({
  id: { type: String, required: true }
});

const query = useOrderApi().findByOrderIdQuery(props.id, {
  relations: ['seller', 'buyer']
});

console.log(query);
</script>

<template>
  <dsp-query-loader v-slot="{ entity: order }" :query="query">
    <dsp-center>
      <h2>Commande numéro {{ order.id }}</h2>
    </dsp-center>
    <dsp-container>
      <dsp-surface>
        <dsp-container is-small>
          <p>Date de commande : {{ order.created }}</p>
          <p>Nombre d'articles commandés : {{ order.orderItems.length }}</p>
          <p>{{ order }}</p>
        </dsp-container>
      </dsp-surface>
    </dsp-container>
  </dsp-query-loader>
</template>

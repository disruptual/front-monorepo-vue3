<script>
export default { name: 'OrderHistory' };
</script>

<script setup>
const props = defineProps({
  orderId: { type: String, required: true }
});
</script>

<template>
  <div>Order History for order {{ props.orderId }}</div>
</template>

<script>
export default { name: 'ItemDetailsDressing' };
</script>

<script setup>
import { useItemDetails } from '../use-item-details';
const { sellerItems } = useItemDetails();
</script>

<template>
  <pre>
    {{ sellerItems }}
</pre
  >
</template>

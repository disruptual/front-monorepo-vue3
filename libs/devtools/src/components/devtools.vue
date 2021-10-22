<script>
export default { name: 'DspDevtools' };
</script>

<script setup>
import { inject } from 'vue';
const ctx = inject('devtoolsContext');
</script>

<template>
  <pre>{{ ctx.schema }}</pre>
</template>

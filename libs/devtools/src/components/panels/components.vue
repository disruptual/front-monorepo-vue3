<script>
export default { name: 'DspDevtools' };
</script>

<script setup>
import { inject } from 'vue';
import ComponentForm from '../component-form.vue';

const devtoolsContext = inject('devtoolsContext');
</script>

<template>
  <ul>
    <li v-for="(value, key) in devtoolsContext.schema" :key="key">
      <ComponentForm :component="key" :schema="value" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
li {
  margin-bottom: var(--spacing-md);
}
</style>

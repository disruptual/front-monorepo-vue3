<script>
export default { name: 'HomeBlocks' };
</script>

<script setup>
import { useFrontConfigApi } from '@dsp/core';
import ContentBlock from './content-block/index.vue';

const query = useFrontConfigApi().findByIdQuery(1, {
  staleTime: Infinity
});
</script>

<template>
  <dsp-query-loader v-slot="{ entity }" :query="query">
    <dsp-flex direction="column" wrap="nowrap">
      <section v-for="block of entity.homePageSettings" :key="block.id">
        <ContentBlock :block="block" />
      </section>
    </dsp-flex>
  </dsp-query-loader>
</template>

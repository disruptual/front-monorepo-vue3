<script setup>
import { useCmsPageApi } from '@dsp/core';

const props = defineProps({
  slug: { type: String, required: true }
});
const query = useCmsPageApi().findBySlugQuery(props.slug);
</script>

<template>
  <dsp-query-loader v-slot="{ entity: page }" :query="query">
    <dsp-container>
      <dsp-surface>
        <h2>{{ page.title }}</h2>
        <div class="cms-page" v-html="page.content" />
      </dsp-surface>
    </dsp-container>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
.cms-page {
  line-height: 1.5;
}
</style>

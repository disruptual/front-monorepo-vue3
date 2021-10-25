<script>
export default { name: 'AdminItemDetailPage' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useItemApi } from '@dsp/core';

const props = defineProps({
  id: { type: String, required: true }
});

const { t } = useI18n();
const query = useItemApi().findByIdQuery(props.id, {
  relations: []
});

const breadCrumbLabel = computed(
  () => query.data.value?.title ?? t('breadcrumb.itemDetail')
);
useBreadCrumbs(breadCrumbLabel);
</script>

<template>
  <dsp-query-loader v-slot="{ entity: item }" :query="query">
    <dsp-center>
      <h2>{{ item.title }}</h2>
    </dsp-center>
  </dsp-query-loader>
</template>

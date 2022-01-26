<script>
export default { name: 'AdminLocationDetails' };
</script>

<script setup>
import { computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useI18n } from 'vue-i18n';
import { useToast } from '@dsp/ui';
import { useLocationApi } from '@dsp/core';

import LocationDetails from '@/components/location-details/index.vue';

const { replace } = useRouter();
const route = useRoute();
const { push } = useRouter();
const { t } = useI18n();

const props = defineProps({
  id: { type: String, required: true }
});

const query = useLocationApi().findByIdQuery(props.id, {});

const breadCrumbLabel = computed(
  () => query.data.value?.name ?? t('breadcrumb.locationDetails')
);
useBreadCrumbs(breadCrumbLabel);
</script>

<template>
  <dsp-query-loader v-slot="{ entity: location }" :query="query">
    <dsp-flex direction="column" align="center" justify="center">
      <h2>{{ location.name }}</h2>
      <dsp-container is-small>
        <dsp-surface>
          <LocationDetails
            :location="location"
            @success="push({ name: 'AdminLocation' })"
          />
        </dsp-surface>
      </dsp-container>
    </dsp-flex>
  </dsp-query-loader>
</template>

<style lang="scss" scoped></style>

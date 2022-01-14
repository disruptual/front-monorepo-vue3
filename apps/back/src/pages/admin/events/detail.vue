<script>
export default { name: 'AdminEventDetails' };
</script>

<script setup>
import EventDetails from '@/components/event/details/index.vue';
import TableItems from '@/components/table-items/index.vue';

import { computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useEventApi, useItemApi } from '@dsp/core';
import { EVENT_DETAILS_TABS as TABS } from '@/utils/constants';
const { replace } = useRouter();
const route = useRoute();
const { t } = useI18n();

const props = defineProps({
  id: { type: String, required: true }
});

const query = useEventApi().findByIdQuery(props.id, {
  requestOptions: { params: { display: 'all' } }
});

const queryItemsOptions = reactive({
  requestOptions: {
    params: { display: 'all' },
    enabled: query.isSuccess.value
  }
});

const queryItemsDigital = useItemApi().findAllByEventDigitalDepositedIdQuery(
  props.id,
  queryItemsOptions
);
const queryItemsPhysical = useItemApi().findAllByEventPhysicalDepositedIdQuery(
  props.id,
  queryItemsOptions
);

const labelState = event => {
  if (!event.hasStarted) return t('event.details.notStarted');
  if (event.isInProgress) return t('event.details.inProgress');
  if (event.isFinished) return t('event.details.complete');
};

const activeTab = computed({
  get() {
    return route.query.section || TABS.INFOS;
  },
  set(value) {
    replace({ ...route, query: { section: value } });
  }
});
</script>

<template>
  <dsp-query-loader v-slot="{ entity: event }" :query="query">
    <dsp-flex align="center" justify="center">
      <h2>{{ event.title }}</h2>
      <dsp-center class="badge">
        {{ labelState(event) }}
      </dsp-center>
    </dsp-flex>
    <dsp-tabs v-model="activeTab">
      <dsp-tab
        :name="TABS.INFOS"
        :label="t(`event.details.tabs.${TABS.INFOS}`)"
      >
        <dsp-container>
          <EventDetails :event="event" />
        </dsp-container>
      </dsp-tab>

      <dsp-tab
        :name="TABS.ITEMS_DIGITAL"
        :label="t(`event.details.tabs.${TABS.ITEMS_DIGITAL}`)"
      >
        <TableItems :query="queryItemsDigital" />
      </dsp-tab>
      <dsp-tab
        :name="TABS.ITEMS_PHYSICAL"
        :label="t(`event.details.tabs.${TABS.ITEMS_PHYSICAL}`)"
      >
        <TableItems :query="queryItemsPhysical" />
      </dsp-tab>
    </dsp-tabs>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
.badge {
  margin-left: var(--spacing-sm);
  color: var(--color-red-500);
  border-radius: var(--border-radius-pill);
  padding: var(--spacing-xxs) var(--spacing-xs);
  font-size: var(--font-size-sm);
  border: solid 2px var(--color-red-500);
}
</style>

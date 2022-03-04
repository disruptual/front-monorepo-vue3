<script>
export default { name: 'StoreOrderDetailsPage' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useStoreOrder } from '@/hooks/useStoreOrder';

import StoreOrderDetails from '@/components/store/order-details/index.vue';

const props = defineProps({
  id: { type: String, required: true }
});

const { t } = useI18n();
const { query, isOrderValid, invalidOrderMessage } = useStoreOrder(props.id, {
  queryOptions: {
    relations: ['buyer', 'seller', 'location']
  }
});

useBreadCrumbs(
  computed(
    () =>
      t('breadcrumb.orderNumber', { id: query.data.value?.id }) ??
      t('breadcrumb.orderDetails')
  )
);
</script>

<template>
  <dsp-center class="order-details-page">
    <dsp-container is-small>
      <dsp-surface>
        <router-link :to="{ name: 'StoreOrders' }">
          <dsp-flex gap="xs" align="center">
            <dsp-icon icon="chevronLeft" />
            Retour
          </dsp-flex>
        </router-link>
        <dsp-query-loader :query="query">
          <template #error="{ error }">
            <div v-if="error.response?.status === 404">
              <dsp-form-error error="Cette commande n'existe pas." />
            </div>

            <div v-else>
              <dsp-form-error
                error="Impossible de récupérer les informations de la commande."
              />
            </div>
          </template>

          <template #default="{ entity: order }">
            <div v-if="!isOrderValid">
              <dsp-form-error :error="invalidOrderMessage" />
            </div>
            <StoreOrderDetails :order="order" />
          </template>
        </dsp-query-loader>
      </dsp-surface>
    </dsp-container>
  </dsp-center>
</template>

<style lang="scss" scoped>
a {
  color: inherit;
}

.order-details-page {
  margin-top: var(--spacing-lg);
}
</style>

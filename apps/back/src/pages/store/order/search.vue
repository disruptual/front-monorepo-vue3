<script>
export default { name: 'StoreOrderSearchPage' };
</script>

<script setup>
import { ref, computed, watch } from 'vue';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useStoreOrder } from '@/hooks/useStoreOrder';
import { useRouter } from 'vue-router';

useBreadCrumbs('Dépôt / retrait');
const { push } = useRouter();

const searchedOrderId = ref(null);

const formOptions = {
  onSubmit(values) {
    searchedOrderId.value = values.orderId;
  }
};

const { query, isOrderValid, invalidOrderMessage } = useStoreOrder(
  searchedOrderId,
  {
    queryOptions: {
      enabled: computed(() => !!searchedOrderId.value),
      relations: ['buyer', 'seller']
    }
  }
);

watch(isOrderValid, isValid => {
  if (isValid) {
    push({ name: 'StoreOrderDetail', params: { id: query.data.value.id } });
  }
});
</script>

<template>
  <dsp-center class="order-search-page">
    <dsp-container is-small>
      <dsp-surface>
        <h2>Rechercher une commande</h2>
        <dsp-alert>
          Veuillez scanner un QR code ou renseigner une numero de commande
          ci-dessous
        </dsp-alert>
        <dsp-smart-form
          :form-options="formOptions"
          class="order-search-page__form"
        >
          <dsp-smart-form-field v-slot="slotProps" name="orderId" required>
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              label="Numero de commande"
            />
          </dsp-smart-form-field>

          <dsp-flex justify="flex-end">
            <dsp-smart-form-submit>Rechercher</dsp-smart-form-submit>
          </dsp-flex>
        </dsp-smart-form>

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
              <dsp-grid :columns="2">
                <dsp-grid-item>
                  <h3>Acheteur</h3>
                  <dsp-flex align="center" gap="sm">
                    <dsp-avatar :user="order.buyer" />
                    <span>{{ order.buyer.fullName }}</span>
                  </dsp-flex>
                </dsp-grid-item>
                <dsp-grid-item>
                  <h3>Vendeur</h3>
                  <dsp-flex align="center" gap="sm">
                    <dsp-avatar :user="order.seller" />
                    <span>{{ order.seller.fullName }}</span>
                  </dsp-flex>
                </dsp-grid-item>
              </dsp-grid>
            </div>
          </template>
        </dsp-query-loader>
      </dsp-surface>
    </dsp-container>
  </dsp-center>
</template>

<style lang="scss" scoped>
.order-search-page {
  margin-top: var(--spacing-lg);
}

h2 {
  margin-top: 0;
}
.order-search-page__form ~ * {
  margin-top: var(--spacing-md);
}
</style>

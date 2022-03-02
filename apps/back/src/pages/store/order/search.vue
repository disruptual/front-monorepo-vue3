<script>
export default { name: 'StoreOrderSearchPage' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useOrderApi } from '@dsp/core';

useBreadCrumbs('Dépôt / retrait');

const searchedOrderId = ref(null);
const query = useOrderApi().findByIdQuery(searchedOrderId, {
  enabled: computed(() => !!searchedOrderId.value),
  relations: ['seller', 'buyer']
});

const formOptions = {
  onSubmit(values) {
    searchedOrderId.value = values.orderId;
  }
};
</script>

<template>
  <dsp-center style="height: 100%">
    <dsp-container>
      <dsp-surface>
        <h2>Rechercher une commande</h2>
        <dsp-alert color-scheme="brand">
          Veuillez scanner un QR code ou renseigner une numero de commande
          ci-dessous
        </dsp-alert>
        <dsp-smart-form :form-options="formOptions">
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
              Cette commande n'existe pas.
            </div>

            <div v-else>
              Impossible de récupérer les informations de la commande.
            </div>
          </template>

          <template #default="{ entity: order }">
            <dl>
              <dt>Vendeur</dt>
              <dd>{{ order.seller?.fullName }}</dd>

              <dt>Acheteur</dt>
              <dd>{{ order.buyer?.fullName }}</dd>
            </dl>
          </template>
        </dsp-query-loader>
      </dsp-surface>
    </dsp-container>
  </dsp-center>
</template>

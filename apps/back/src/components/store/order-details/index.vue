<script>
export default { name: 'StoreOrderDetails' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Order, ORDER_STATES } from '@dsp/business';
import { STORE_OPERATIONS } from '@/utils/constants';
import { useStoreOrder } from '@/hooks/useStoreOrder';

import OrderValidationModal from './modals/order-validation.vue';

const props = defineProps({
  order: { type: Order, required: true }
});

const { t } = useI18n();

const userType = ref(null);
const isModalOpened = ref(false);
const user = computed(() => props.order[userType.value]);

const { depositBySeller, pickupByBuyer } = useStoreOrder(props.order.id);
const actions = {
  [STORE_OPERATIONS.SELLER_DEPOSIT]: depositBySeller,
  [STORE_OPERATIONS.BUYER_PICKUP]: pickupByBuyer
};

const operation = computed(() => {
  const { order } = props;
  if (order.isRecoverable) return STORE_OPERATIONS.BUYER_PICKUP;
  if (order.orderState === ORDER_STATES.ORDER_ACCEPTED)
    return STORE_OPERATIONS.SELLER_DEPOSIT;
  if (order.orderState === ORDER_STATES.DISTRIBUTED)
    return STORE_OPERATIONS.BUYER_PICKUP;

  return null;
});

const onSubmit = formValues => {
  return actions[operation.value](formValues);
};

const isCorrectUser = computed(() => {
  switch (props.order.orderState) {
    case 'ORDER_ACCEPTED':
      return userType.value === 'seller';
    case 'DISTRIBUTED':
      return userType.value === 'buyer';
    default:
      return false;
  }
});
</script>

<template>
  <dsp-center as="h2">Commande n°{{ props.order.id }}</dsp-center>

  <dsp-flex v-if="userType" gap="sm" direction="column">
    <dsp-center>
      <dsp-avatar :user="user" size="lg" />
    </dsp-center>
    <dsp-alert v-if="!isCorrectUser" color-scheme="error" icon="warning">
      Aucune action n'est à effectuer pour ce client. Vérifiez l'état de sa
      commande dans son suivi de commande.
    </dsp-alert>

    <dsp-flex as="dl" gap="xs" direction="column">
      <dsp-grid :columns="2">
        <div>
          <dt>Vendeur :</dt>
          <dd>{{ order.seller.fullName }}</dd>
        </div>

        <div>
          <dt>Acheteur :</dt>
          <dd>{{ order.buyer.fullName }}</dd>
        </div>
      </dsp-grid>

      <div>
        <dt>Status</dt>
        <dd>{{ t(`order.status.${order.status}`) }}</dd>
      </div>

      <div>
        <dt>Magasin de retrait</dt>
        <dd>{{ order.location.name }}</dd>
      </div>

      <div v-if="order.tag">
        <dt>Numero de sac</dt>
        <dd>Sac N°{{ order.tag }}</dd>
      </div>

      <div>
        <dt>Articles ({{ order.orderItems?.length }})</dt>
        <dd>
          <dsp-loader v-if="!order.orderItems" size="lg" style="height: 6em" />
          <dsp-swiper v-else class="store-order-details__items-swiper">
            <dsp-swiper-item
              v-for="orderItem in order.orderItems"
              :key="orderItem.id"
            >
              <dsp-image
                :src="orderItem.item?.medias[0].thumbnails.itemList"
                class="store-order-details__image"
                @dragstart.prevent
              />
            </dsp-swiper-item>
          </dsp-swiper>
        </dd>
      </div>
    </dsp-flex>

    <dsp-button
      v-if="isCorrectUser"
      class="store-order-details__action-button"
      size="lg"
      is-rounded
      :disabled="!props.order.orderItems"
      @click="isModalOpened = true"
    >
      {{ t(`order.store.operations.${operation}`) }}
    </dsp-button>
  </dsp-flex>

  <div v-else>
    <dsp-center style="margin-bottom: var(--spacing-md)">
      Vérifier l'identité de l'acheteur grâce à une pièce d'identité
    </dsp-center>
    <dsp-flex justify="center" gap="lg">
      <dsp-button @click="userType = 'buyer'">
        {{ order.buyer.fullName }} (acheteur)
      </dsp-button>
      <dsp-button is-outlined @click="userType = 'seller'">
        {{ order.seller.fullName }} (vendeur)
      </dsp-button>
    </dsp-flex>
  </div>
  <OrderValidationModal
    v-if="order.orderItems"
    :order-items="order.orderItems"
    :operation="operation"
    :is-opened="isModalOpened"
    @close="isModalOpened = false"
    @submit="onSubmit"
  />
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 0;
}

dl {
  margin: 0;
}

dd {
  padding: 0;
  margin-left: 0;
  font-weight: var(--font-weight-bold);
}

.store-order-details__image {
  width: 6em;
  aspect-ratio: 1;
}

.store-order-details__items-swiper {
  margin-top: var(--spacing-xs);
}

.store-order-details__action-button {
  align-self: center;
}
</style>

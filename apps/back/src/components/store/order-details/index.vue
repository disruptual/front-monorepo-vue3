<script>
export default { name: 'StoreOrderDetails' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Order } from '@dsp/business';

const props = defineProps({
  order: { type: Order, required: true }
});

const { t } = useI18n();

const userType = ref(null);
const user = computed(() => props.order[userType.value]);

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

  <div v-if="userType">
    <dsp-center>
      <dsp-avatar :user="user" size="lg" />
    </dsp-center>
    <dl>
      <dt>Vendeur :</dt>
      <dd>{{ order.seller.fullName }}</dd>

      <dt>Acheteur :</dt>
      <dd>{{ order.buyer.fullName }}</dd>

      <dt>Status</dt>
      <dd>{{ t(`order.status.${order.status}`) }}</dd>

      <dt>Magasin de retrait</dt>
      <dd>{{ order.location.name }}</dd>

      <dt>Articles</dt>
      <dd>
        <dsp-loader v-if="!order.orderItems" size="lg" />
        <dsp-swiper v-else>
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
    </dl>

    <dsp-button v-if="isCorrectUser">Action</dsp-button>
    <dsp-center v-else>
      Aucune action n'est à effectuer pour ce client. Vérifiez l'état de sa
      commande dans son suivi de commande.
    </dsp-center>
  </div>

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
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 0;
}

dd {
  padding: 0;
  margin-left: 0;
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
}

.store-order-details__image {
  width: 6em;
  aspect-ratio: 1;
}
</style>

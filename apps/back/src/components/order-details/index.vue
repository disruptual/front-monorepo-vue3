<script>
export default { name: 'OrderDetails' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Order, USER_GENDERS } from '@dsp/business';
import { formatPrice } from '@dsp/core';
import { ORDER_DETAILS_TABS as TABS } from '@/utils/constants';

const props = defineProps({
  order: { type: Order, required: true }
});

const { t } = useI18n();

const itemsLink = computed(() => ({
  query: { section: TABS.ITEMS }
}));

const statusClass = computed(() => ({
  'order-status--cancelled': props.order.isCancelled,
  'order-status--finished': props.order.isFinished
}));

const sellerLabel = computed(() =>
  props.order.seller?.gender === USER_GENDERS.FEMALE ? 'Vendeuse' : 'Vendeur'
);
const buyerLabel = computed(() =>
  props.order.buyer?.gender === USER_GENDERS.FEMALE ? 'Acheteuse' : 'Acheteur'
);
</script>

<template>
  <div class="order-details">
    <dsp-surface as="section" class="order-details__general">
      <h3>Informations générales</h3>
      <dl>
        <dt>Statut</dt>
        <dd class="order-status" :class="statusClass">
          {{ t(`order.status.${order.status}`) }}
        </dd>

        <dt>Date de commande</dt>
        <dd>{{ order.formatCreated() }}</dd>

        <dt>Nombre d'articles</dt>
        <dd>
          {{ order.orderItems?.length }}
          <router-link :to="itemsLink">(voir le détail)</router-link>
        </dd>

        <dt>Mode de livraison</dt>
        <dd>{{ t(`delivery.modes.${order.delivery.tag}`) }}</dd>

        <template v-if="order.isCocolis">
          <dt>Numéro d'éxpédition</dt>
          <dd>
            {{ order.deliveryDetail?.expeditionNum }}
          </dd>
        </template>

        <template v-if="order.isLocationDelivery">
          <dt>Magasin de dépôt/retrait</dt>
          <dd>
            {{ order.location.name }} {{ order.location.address.route }}
            {{ order.location.address.postalCode }} {{ order.address.city }}
          </dd>
        </template>

        <template v-if="order.deliveryData?.MondialRelay">
          <dt>Numero de Suivi MondialRelay</dt>
          <dd>
            <span>{{ order.deliveryData.MondialRelay.ExpeditionNum }}</span>
            <br />
            <a
              :href="order.deliveryData.MondialRelay.URL_Etiquette"
              target="_blank"
            >
              Télécharger l'étiquette de suivi MondialRelay
            </a>
          </dd>
        </template>

        <template
          v-if="order.isRelaisColis && order.deliveryDetail?.expeditionNum"
        >
          <dt>Numero de Suivi Relais Colis</dt>
          <dd>
            <span>{{ order.deliveryDetail.expeditionNum }}</span>
            <br />
            <a
              :href="order.deliveryDetail.buyerDeliveryFormUrl"
              target="_blank"
            >
              Télécharger l'étiquette de suivi Relais Colis
            </a>
          </dd>
        </template>
      </dl>
    </dsp-surface>

    <dsp-surface as="section" class="order-details__remuneration">
      <h3>Rémuneration</h3>
      <dl>
        <dt>Mode de rémuneration</dt>
        <dd>{{ t(`remuneration.${order.remuneration.remunerationName}`) }}</dd>

        <dt>Frais de service:</dt>
        <dd>{{ formatPrice(order.serviceFeeAmount || 0) }}</dd>

        <dt>Frais de livraison:</dt>
        <dd>{{ formatPrice(order.deliveryPrice || 0) }}</dd>

        <dt>Montant remboursé :</dt>
        <dd>{{ formatPrice(order.refundAmount || 0) }}</dd>

        <dt>Montant abondé:</dt>
        <dd>{{ formatPrice(order.abundedPriceSeller || 0) }}</dd>

        <dt>Montant total</dt>
        <dd>{{ formatPrice(order.totalAmountBeforeNegotiation) }}</dd>

        <template v-if="order.isNegotiated">
          <dt class="title">Montant total après négociation :</dt>
          <dd>{{ formatPrice(order.totalAmount || order.moneyBox) }}</dd>
        </template>
      </dl>
    </dsp-surface>

    <dsp-surface as="section" class="order-details__buyer">
      <h3>{{ buyerLabel }}</h3>
      <router-link
        v-if="order.buyer"
        :to="{ name: 'AdminUserDetails', params: { slug: order.buyer?.slug } }"
        class="user-card"
      >
        <dsp-avatar :user="order.buyer" size="lg" />
        <span>{{ order.buyer.fullName }}</span>
        <span>{{ order.buyer.email }}</span>
      </router-link>
      <span v-else>Informations de l'acheteur non disponibles.</span>
    </dsp-surface>

    <dsp-surface as="section" class="order-details__seller">
      <h3>{{ sellerLabel }}</h3>
      <router-link
        v-if="order.seller"
        :to="{
          name: 'AdminUserDetails',
          params: { slug: order.seller?.slug }
        }"
        class="user-card"
      >
        <dsp-avatar :user="order.seller" size="lg" />
        <span>{{ order.seller.fullName }}</span>
        <span>{{ order.seller.email }}</span>
      </router-link>

      <span v-else>Informations du vendeur non disponibles.</span>
    </dsp-surface>
  </div>
</template>

<style lang="scss" scoped>
a {
  color: inherit;
}

.order-details {
  display: grid;
  grid-gap: var(--spacing-md);

  @include not-mobile {
    grid-template-columns: 6fr 4fr;
    grid-template-areas: 'general buyer' 'remuneration seller';
  }
}

.order-details__general {
  @include not-mobile {
    grid-area: general;
  }
}

.order-details__remuneration {
  @include not-mobile {
    grid-area: remuneration;
  }
}

.order-details__buyer {
  @include not-mobile {
    grid-area: buyer;
  }
}

.order-details__seller {
  @include not-mobile {
    grid-area: seller;
  }
}

dl {
  @include desktop-only {
    display: grid;
    grid-template-columns: minmax(15em, auto) 1fr;
    grid-column-gap: var(--spacing-md);
  }

  > *:nth-child(odd) {
    font-weight: var(--font-weight-light);
  }
}

dd {
  margin-left: 0;
  margin-bottom: var(--spacing-sm);
}

h3 {
  margin-top: 0;
}

.user-card {
  color: inherit;
  text-decoration: none;
  transition: transform var(--transition-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.order-status {
  font-weight: var(--font-weight-bold);
}
.order-status--cancelled {
  color: var(--color-red-500);
}

.order-status--finished {
  color: var(--color-green-700);
}
</style>

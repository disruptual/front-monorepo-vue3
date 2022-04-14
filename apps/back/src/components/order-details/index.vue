<script>
export default { name: 'OrderDetails' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Order, USER_GENDERS, SENDING_TYPE } from '@dsp/business';
import { formatPrice } from '@dsp/core';
import { ORDER_DETAILS_TABS as TABS } from '@/utils/constants';
import { DELIVERY_MODES } from '@dsp/business';
// import createAsyncReader from '@dsp/core';
// import { openNewTabPdf } from '@dsp/core';

import OrderProblem from '../order-problem/index.vue';

const props = defineProps({
  order: { type: Order, required: true }
});

const { t } = useI18n();

const statusClass = computed(() => ({
  'order-status--cancelled': props.order.isCancelled,
  'order-status--finished': props.order.isFinished
}));

const sellerLabel = computed(() =>
  props.order.seller?.gender === USER_GENDERS.FEMALE
    ? t(`order.details.title.buyer.female`)
    : t(`order.details.title.seller.male`)
);
const buyerLabel = computed(() =>
  props.order.buyer?.gender === USER_GENDERS.FEMALE
    ? t(`order.details.title.buyer.female`)
    : t(`order.details.title.buyer.male`)
);

// const etiquetteActionPayload = computed(() => {
//   if (props.order.delivery?.tag === DELIVERY_MODES.LAPOSTE_LETTER_FOLLOW)
//     return {
//       orderId: props.order.id
//     };

//   if (sendingType === SENDING_TYPE.POST_OFFICE) {
//     return {
//       orderId: props.order.id
//       addressId: props.order.selectedAddress.id
//     };
//   }

//   return {
//     orderId: props.order.id
//     addressId: props.order.selectedAddress.id,
//     eligibility: props.eligibility
//   };
// });
// getEtiquetteDataUrl = async () => {
//   if (props.deliveryDetail && props.deliveryDetail.base64EncodedTicket) {
//     return `data:application/pdf;base64,${encodeURI(
//       props.deliveryDetail.base64EncodedTicket
//     )}`;
//   } else {
//     const response = await this.$store.dispatch(
//       'generateColissimoTicket',
//       etiquetteActionPayload
//     );
//     if (!response.ok) {
//       throw response;
//     }
//     const reader = createAsyncReader();
//     const file = await response.blob();

//     return reader.readAsDataURL(file);
//   }
// },
// generateTicketColissimo = async () => {
//   try {
//     const pdfUrl = await this.getEtiquetteDataUrl();
//     openNewTabPdf(props.order.id, pdfUrl);
//     // $refreshApi('deliveryDetail_');
//   } catch (err) {
//     console.error(err);
//   }
// };
</script>

<template>
  <div class="order-details">
    <dsp-surface as="section" class="order-details__general">
      <h3>{{ t(`order.details.title.informations`) }}</h3>
      <dl>
        <dt>{{ t(`order.details.label.status`) }}</dt>
        <dsp-flex
          as="dd"
          direction="column"
          gap="xs"
          class="order-status"
          :class="statusClass"
        >
          <div>{{ t(`order.status.${order.status}`) }}</div>
          <OrderProblem
            v-if="order.hasProblem"
            :order="props.order"
            class="order-details__order-problem"
          />
        </dsp-flex>

        <dt>{{ t(`order.details.label.orderDate`) }}</dt>
        <dd>{{ order.formatCreated("dd-MM-yyyy à kk'h'mm") }}</dd>

        <dt>{{ t(`order.details.label.numberArticles`) }}</dt>
        <dd>
          {{ order.orderItems?.length }}
          <router-link
            :to="{
              query: { section: TABS.ITEMS }
            }"
          >
            (voir le détail)
          </router-link>
        </dd>

        <dt>{{ t(`order.details.label.modeDelivery`) }}</dt>
        <dd>{{ t(`delivery.modes.${order.delivery?.tag}`) }}</dd>

        <template v-if="order.isCocolis">
          <dt>{{ t(`order.details.label.numExpedition`) }}</dt>
          <dd>
            {{ order.deliveryDetail?.expeditionNum }}
          </dd>
        </template>

        <template v-if="order.isLocationDelivery">
          <dt>{{ t(`order.details.label.storeInOut`) }}</dt>
          <dd>
            {{ order.location?.name }} {{ order.location?.address?.route }}
            {{ order.location?.address?.postalCode }} {{ order.address?.city }}
          </dd>
        </template>

        <template v-if="order.trackingNumber">
          <dt>{{ t(`order.details.label.trackingNumber`) }}</dt>
          <dd>
            <component
              :is="order.trackingUrl ? 'a' : 'span'"
              :href="order.trackingUrl"
              target="_blank"
            >
              {{ order.trackingNumber }}
            </component>
          </dd>
        </template>
        <template v-if="order.Etiquette">
          <dt>{{ t('order.details.label.downloadEtiquette') }}</dt>
          <dd
            v-if="
              order.delivery?.tag === DELIVERY_MODES.LAPOSTE_COLISSIMO ||
              order.delivery?.tag === DELIVERY_MODES.LAPOSTE_LETTER
            "
          >
            <button @clic="printEtiquette">Cliquer ici</button>
          </dd>
          <dd v-else>
            <a target="_blank" :href="order.Etiquette">Cliquer ici</a>
          </dd>
        </template>
      </dl>
    </dsp-surface>

    <dsp-surface as="section" class="order-details__remuneration">
      <h3>{{ t(`order.details.title.remuneration`) }}</h3>
      <dl>
        <dt>{{ t(`order.details.label.modeRemuneration`) }}</dt>
        <dd>
          {{
            order.remuneration
              ? t(`remuneration.${order.remuneration?.remunerationName}`)
              : t(`remuneration.pending`)
          }}
        </dd>

        <dt>{{ t(`order.details.label.itemsAmount`) }}</dt>
        <dd>
          {{ formatPrice(order.itemsAmount ?? 0) }}
          <span v-if="order.isNegotiated" class="non-negotiated-price">
            ({{ formatPrice(order.itemsAmountBeforeNegotiation ?? 0) }})
          </span>
        </dd>

        <dt>{{ t(`order.details.label.serviceFees`) }}</dt>
        <dd>{{ formatPrice(order.serviceFeeAmount ?? 0) }}</dd>

        <dt>{{ t(`order.details.label.shippingFees`) }}</dt>
        <dd>{{ formatPrice(order.deliveryPrice ?? 0) }}</dd>

        <template v-if="order.hasPoblem">
          <dt>{{ t(`order.details.label.reimbursementAmount`) }}</dt>
          <dd>{{ formatPrice(order.refundAmount ?? 0) }}</dd>
        </template>

        <template v-if="order.remuneration && order.remuneration?.isGiftCard">
          <dt>{{ t(`order.details.label.abundantAmount`) }}</dt>
          <dd>{{ formatPrice(order.abundedPriceSeller ?? 0) }}</dd>
        </template>

        <template v-if="order.isFinished">
          <dt>{{ t(`order.details.label.creditedTotal`) }}</dt>
          <dd>{{ formatPrice(order.creditedTotal ?? 0) }}</dd>
        </template>

        <dt>{{ t(`order.details.label.totalAmount`) }}</dt>
        <dd>{{ formatPrice(order.paidTotal ?? 0) }}</dd>
      </dl>
    </dsp-surface>

    <dsp-surface as="section" class="order-details__buyer">
      <h3>{{ buyerLabel }}</h3>
      <router-link
        v-if="order.buyer"
        :to="{
          name: 'AdminUserDetails',
          params: { slug: order.buyer?.slug }
        }"
        class="user-card"
      >
        <dsp-avatar :user="order.buyer" size="lg" />
        <span>{{ order.buyer.fullName }}</span>
        <span>{{ order.buyer.email }}</span>
        <div v-if="order.buyerOrderAddress">
          <div>{{ order.buyerOrderAddress.route }}</div>
          <div>
            {{ order.buyerOrderAddress.postalCode }}
            {{ order.buyerOrderAddress.city }}
          </div>
          <div>{{ order.buyerOrderAddress.country }}</div>
        </div>
      </router-link>
      <span v-else>{{ t(`order.details.noResultBuyer`) }}</span>
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
        <div v-if="order.sellerOrderAddress">
          <div>{{ order.sellerOrderAddress.route }}</div>
          <div>
            {{ order.sellerOrderAddress.postalCode }}
            {{ order.sellerOrderAddress.city }}
          </div>
          <div>{{ order.sellerOrderAddress.country }}</div>
        </div>
      </router-link>

      <span v-else>{{ t(`order.details.noResultSeller`) }}</span>
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
    grid-template-columns: minmax(0, 7fr) 3fr;
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
    grid-template-columns: minmax(15em, auto) minmax(0, 1fr);
    grid-column-gap: var(--spacing-md);
  }
}

dt {
  font-weight: var(--font-weight-light);
}

dd {
  width: 100%;
  margin-left: 0;
  margin-bottom: var(--spacing-sm);
}

h3 {
  margin-top: 0;
}

.user-card {
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  align-items: center;
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

.non-negotiated-price {
  text-decoration: line-through;
}
</style>

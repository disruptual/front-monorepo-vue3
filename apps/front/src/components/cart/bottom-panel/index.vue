<script>
export default { name: 'CartBottomPanel' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { useQueryClient } from 'vue-query';
import { vReadableColor, vOnResize } from '@dsp/ui';
import { formatPrice, useCartApi, useCurrentUser } from '@dsp/core';

import ItemSwiper from '@/components/item/swiper/index.vue';

const props = defineProps({
  cartId: { type: String, required: true }
});

const { findByIdQuery, deleteMutation } = useCartApi();
const cartQuery = findByIdQuery(props.cartId, {
  relations: ['cartItems', 'cartItems.item']
});
const { data: cart } = cartQuery;

const items = computed(() =>
  cart.value?.cartItems?.map(cartItem => cartItem.item)
);

const { data: currentUser } = useCurrentUser();
const queryClient = useQueryClient();
const refreshUserCarts = () =>
  queryClient.refetchQueries({
    predicate: ({ queryKey }) =>
      queryKey.startsWith(`${currentUser.value.uri}/carts`)
  });

const { isLoading: isDeleting, mutate: deleteCart } = deleteMutation({
  onSuccess() {
    refreshUserCarts();
  }
});

const contentHeight = ref('999px');
const onContentResize = entries => {
  for (let entry of entries) {
    contentHeight.value = `${entry.target.offsetHeight}px`;
  }
};
const isOpened = ref(false);
const transform = computed(() => {
  return isOpened.value ? 0 : contentHeight.value;
});
</script>

<template>
  <dsp-query-loader :query="cartQuery">
    <template #loader>
      <div />
    </template>

    <dsp-surface class="cart-bottom-panel">
      <header v-readable-color>
        <dsp-plain-button
          :right-icon="isOpened ? 'chevronDown' : 'chevronUp'"
          left-icon="cart"
          @click="isOpened = !isOpened"
        >
          Mon lot({{ items.length }} produits) -
          {{ formatPrice(cart.detail.price) }}
        </dsp-plain-button>
      </header>

      <div v-on-resize="onContentResize" class="cart-bottom-panel__content">
        <ItemSwiper :items="items" />
        <dsp-center>
          <dsp-grid :columns="2" gap="sm">
            <dsp-grid-item column="1 / -1">
              <dsp-button is-full-width :to="{ name: 'Cart' }">
                Valider
              </dsp-button>
            </dsp-grid-item>
            <dsp-button is-outlined>Faire une offre</dsp-button>
            <dsp-loading-button
              is-outlined
              :is-loading="isDeleting"
              @click="deleteCart(cart.id)"
            >
              Supprimer le lot
            </dsp-loading-button>
          </dsp-grid>
        </dsp-center>
      </div>
    </dsp-surface>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
.cart-bottom-panel {
  position: fixed;
  z-index: 4;
  width: 100%;
  padding: 0;
  bottom: 0;
  left: 0;
  transform: translateY(v-bind(transform));
  transition: transform var(--transition-md);

  @include not-desktop {
    bottom: var(--app-bar-height);
  }

  > header {
    background-color: var(--color-brand-500);
    font-size: var(--font-size-lg);

    button {
      width: 100%;
    }
    button:hover {
      color: inherit !important;
    }
  }
}

.cart-bottom-panel__content {
  padding: var(--spacing-md);
}
</style>

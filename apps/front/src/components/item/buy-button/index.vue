<script>
export default { name: 'ItemBuyButton' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useQueryClient } from 'vue-query';
import { useCurrentUser, useCartItemApi } from '@dsp/core';
import { Item } from '@dsp/business';
import ConnectedOnlyButton from '@/components/user/connected-only-button/index.vue';

const props = defineProps({
  item: { type: Item, required: true }
});

const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUser({
  relations: ['carts', 'carts.cartItems']
});
const { createMutation, deleteMutation } = useCartItemApi();
const isLoading = ref(false);

const queryClient = useQueryClient();
const refreshUserCarts = () =>
  queryClient.refetchQueries({
    predicate: ({ queryKey }) =>
      queryKey.startsWith(`${currentUser.value.uri}/carts`)
  });

const { mutateAsync: createCartItem } = createMutation({
  async onSuccess() {
    await refreshUserCarts();
    isLoading.value = false;
  },
  onError() {
    isLoading.value = false;
  }
});

const { mutateAsync: deleteCartItem } = deleteMutation({
  async onSuccess() {
    await refreshUserCarts();
    isLoading.value = false;
  },
  onError() {
    isLoading.value = false;
  }
});

const cartFromItemSeller = computed(() =>
  currentUser.value?.carts?.find(
    cart => cart.order === null && cart._seller === props.item._user
  )
);

const cartItem = computed(() => {
  if (!cartFromItemSeller.value) return null;

  return cartFromItemSeller.value.cartItems?.find(cartItem => {
    return cartItem._item === props.item.uri;
  });
});

const label = computed(() => {
  if (cartItem.value) {
    return 'Retirer du lot';
  }
  if (cartFromItemSeller.value) {
    return 'Ajouter au lot';
  }
  return 'Acheter';
});

const onClick = () => {
  if (!currentUser.value) return;

  isLoading.value = true;
  if (cartItem.value) {
    return deleteCartItem(cartItem.value.id);
  }
  if (cartFromItemSeller.value) {
    return createCartItem({
      user: currentUser.value.uri,
      item: props.item.uri
    });
  }

  return createCartItem({
    user: currentUser.value.uri,
    item: props.item.uri
  });
};
</script>

<template>
  <ConnectedOnlyButton
    :show-label-while-loading="!isCurrentUserLoading"
    :is-loading="isLoading || isCurrentUserLoading"
    @click="onClick"
  >
    {{ label }}
  </ConnectedOnlyButton>
</template>

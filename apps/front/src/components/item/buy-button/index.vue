<script>
export default { name: 'ItemBuyButton' };
</script>

<script setup>
import { computed } from 'vue';
import { useCurrentUser } from '@dsp/core';
import { Item } from '@dsp/business';

const props = defineProps({
  item: { type: Item, required: true }
});

const { data: currentUser } = useCurrentUser({ relations: ['carts'] });

const cartFromItemSeller = computed(() =>
  currentUser.value?.carts?.find(
    cart => cart.order === null && cart._seller === props.item._user
  )
);

const isItemInCart = computed(() => {
  if (!cartFromItemSeller.value) return false;

  // console.log(cartFromItemSeller.value);
  return cartFromItemSeller.value.cartItems?.some(cartItem => {
    return cartItem._item === props.item.uri;
  });
});

const label = computed(() => {
  if (isItemInCart.value) {
    return 'Retirer du lot';
  }
  if (cartFromItemSeller.value) {
    return 'Ajouter au lot';
  }
  return 'Acheter';
});

const onClick = () => {
  if (isItemInCart.value) {
    console.log('Retirer du lot');
  }
  if (cartFromItemSeller.value) {
    console.log('Ajouter au lot');
  }
  return console.log('Acheter');
};
</script>

<template>
  <dsp-button :to="!currentUser && { name: 'Login' }" @click="onClick">
    {{ label }}
  </dsp-button>
</template>

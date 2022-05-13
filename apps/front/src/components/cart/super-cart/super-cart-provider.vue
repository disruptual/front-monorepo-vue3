<script>
export default { name: 'SuperCartProvider' };
</script>

<script setup>
import { provide, computed, unref } from 'vue';
import { useCurrentUser } from '@dsp/core';
import { SUPER_CART_CONTEXT_KEY } from './super-cart-constants';

const currentUserQuery = useCurrentUser({
  relations: [
    'superCart',
    { carts: { requestOptions: { params: { 'sort[created]': 'desc' } } } }
  ]
});
const { data: currentUser } = currentUserQuery;

const context = {
  superCart: computed(() => currentUser.value.superCart),
  carts: computed(() => currentUser.value.carts)
};
provide(SUPER_CART_CONTEXT_KEY, context);

const slotProps = computed(() =>
  Object.fromEntries(Object.entries(context).map(([k, v]) => [k, unref(v)]))
);
</script>

<template>
  <dsp-queries-loader :queries="[currentUserQuery]">
    <slot v-bind="slotProps" />
  </dsp-queries-loader>
</template>

<script>
export default { name: 'OrderValidationItem' };
</script>

<script setup>
import { computed } from 'vue';
import { useDevice } from '@dsp/ui';
import { formatPrice, oneOf } from '@dsp/core';
import { STORE_OPERATIONS } from '@/utils/constants';
import { OrderItem, ORDER_ITEM_CONFORMITY_STATES } from '@dsp/business';

const props = defineProps({
  orderItem: { type: OrderItem, required: true },
  operation: oneOf(Object.values(STORE_OPERATIONS))
});
const emit = defineEmits(['change']);

const device = useDevice();

const itemCategoryHierarchy = computed(() => {
  const { orderItem } = props;
  const { item } = orderItem;

  if (!item?.category) return null;
  let current = item.category;
  const categories = [current.name];

  while (current.parent) {
    categories.push(current.parent.name);
    current = current.parent;
  }

  return categories.reverse().join(' / ');
});

const colors = computed(() => {
  const { orderItem } = props;
  const { item } = orderItem;

  if (!item.colors) return null;

  return item.colors.map(c => c.name).join(' / ');
});

const canMarkAsOk = computed(() =>
  [STORE_OPERATIONS.SELLER_DEPOSIT, STORE_OPERATIONS.BUYER_PICKUP].includes(
    props.operation
  )
);
const canMarkAsKo = computed(() =>
  [STORE_OPERATIONS.SELLER_DEPOSIT, STORE_OPERATIONS.BUYER_PICKUP].includes(
    props.operation
  )
);
const canMarkAsLost = computed(() =>
  [STORE_OPERATIONS.BUYER_PICKUP, STORE_OPERATIONS.SELLER_PICKEUP].includes(
    props.operation
  )
);
const canMarkAsRecovered = computed(
  () => props.operations === STORE_OPERATIONS.SELLER_PICKEUP
);

const options = computed(() =>
  [
    canMarkAsOk.value && {
      label: 'OK',
      value:
        props.operation === STORE_OPERATIONS.SELLER_DEPOSIT
          ? ORDER_ITEM_CONFORMITY_STATES.ACCEPTED_BY_LOCATION
          : ORDER_ITEM_CONFORMITY_STATES.ACCEPTED_BY_BUYER
    },
    canMarkAsKo.value && {
      label: 'KO',
      value:
        props.operation === STORE_OPERATIONS.SELLER_DEPOSIT
          ? ORDER_ITEM_CONFORMITY_STATES.REFUSED_BY_LOCATION
          : ORDER_ITEM_CONFORMITY_STATES.REFUSED_BY_BUYER
    },
    canMarkAsLost.value && {
      label: 'Perdu',
      value: ORDER_ITEM_CONFORMITY_STATES.LOST_BY_LOCATION
    },
    canMarkAsRecovered.value && {
      label: 'Récupéré',
      value: ORDER_ITEM_CONFORMITY_STATES.RECOVERED_BY_BUYER
    }
  ].filter(Boolean)
);
</script>

<template>
  <dsp-grid
    :columns="device.isMobile ? 1 : 2"
    gap="sm"
    class="order-validation-item"
    align="center"
    justify="center"
  >
    <dsp-swiper>
      <dsp-swiper-item v-for="media in orderItem.item?.medias" :key="media.id">
        <dsp-image :src="media.thumbnails.itemList" />
      </dsp-swiper-item>
    </dsp-swiper>

    <dsp-flex as="dl" direction="column" gap="xs">
      <dt>Titre</dt>
      <dd>{{ orderItem.item?.title }}</dd>

      <dt>Categorie</dt>
      <dd>{{ itemCategoryHierarchy }}</dd>

      <dt>Taille</dt>
      <dd>{{ orderItem.item?.size?.name }}</dd>

      <dt>Couleur</dt>
      <dd>{{ colors }}</dd>

      <dt>État</dt>
      <dd>{{ orderItem.item?.condition?.stateName }}</dd>

      <dsp-grid :columns="2">
        <div>
          <dt>Prix de vente initial</dt>
          <dd>{{ formatPrice(orderItem.price) }}</dd>
        </div>

        <div>
          <dt>Prix de vente négocié</dt>
          <dd>{{ formatPrice(orderItem.negotiatedAmount) }}</dd>
        </div>
      </dsp-grid>
    </dsp-flex>

    <dsp-grid-item column="1 / -1">
      <dsp-smart-form-field
        v-slot="slotProps"
        :name="String(orderItem.id)"
        required
      >
        <dsp-radio-group
          v-model="slotProps.field.value"
          :values="options"
          row
          @change="emit('change', slotProps.field.value)"
        />
      </dsp-smart-form-field>
    </dsp-grid-item>
  </dsp-grid>
</template>

<style scoped lang="scss">
dl,
dd,
dt {
  margin: 0;
  padding: 0;
}

dd {
  font-weight: var(--font-weight-bold);
}

.order-validation-item {
  padding: var(--spacing-md);
  border-bottom: solid 1px var(--color-separator);

  img {
    aspect-ratio: 1;
    max-width: 100%;
  }
}
</style>

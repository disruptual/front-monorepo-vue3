<script>
export default { name: 'OrderValidationModal' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { oneOf, isUndefinedOrNull } from '@dsp/core';
import { useForm } from '@dsp/ui';
import { ORDER_ITEM_CONFORMITY_STATES } from '@dsp/business';
import { STORE_OPERATIONS } from '@/utils/constants';

import OrderValidationItem from './order-item.vue';

const props = defineProps({
  orderItems: { type: Array, required: true },
  operation: oneOf(Object.values(STORE_OPERATIONS)),
  isOpened: { type: Boolean, required: true }
});
const emit = defineEmits(['close', 'submit']);

const { t } = useI18n();
const form = useForm({
  async onSubmit(values) {
    emit('submit', values);
  }
});
const [, { values: formValues, isValid, isSubmitted }] = form;

const getItemStyle = orderItem => {
  const value = formValues.value[String(orderItem.id)];
  if (isUndefinedOrNull(value)) return null;

  const validStates = [
    ORDER_ITEM_CONFORMITY_STATES.ACCEPTED_BY_LOCATION,
    ORDER_ITEM_CONFORMITY_STATES.ACCEPTED_BY_BUYER,
    ORDER_ITEM_CONFORMITY_STATES.RECOVERED_BY_BUYER
  ];

  const isValid = validStates.includes(value);

  return {
    '--order-item-bg-color': isValid
      ? 'var(--color-success-100'
      : 'var(--color-error-100)',
    '--order-item-border-color': isValid
      ? 'var(--color-success-300'
      : 'var(--color-error-300)'
  };
};

const listElement = ref(null);
const onChange = (index, value) => {
  const nextElement = listElement.value.querySelector(
    `li[data-id="${index + 1}"]`
  );
  if (!nextElement) return;

  nextElement.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <dsp-modal v-slot="{ focusRef }" :is-opened="isOpened" @close="emit('close')">
    <h2>{{ t(`order.store.operations.${props.operation}`) }}</h2>
    <dsp-smart-form :form="form">
      <ul ref="listElement">
        <li
          v-for="(orderItem, index) in props.orderItems"
          :key="orderItem.id"
          :data-id="index"
        >
          <OrderValidationItem
            class="order-validation__item"
            :order-item="orderItem"
            :operation="operation"
            :style="getItemStyle(orderItem)"
            @change="onChange(index, $event)"
          />
        </li>
      </ul>
      <dsp-flex justify="flex-end" gap="md" align="center" as="footer">
        <dsp-form-error
          :error="
            isSubmitted && !isValid
              ? 'Veuillez valider tous les articles'
              : null
          "
        />
        <dsp-button
          type="button"
          is-outlined
          :button-ref="focusRef"
          @click="emit('close')"
        >
          Annuler
        </dsp-button>
        <dsp-smart-form-submit>Valider</dsp-smart-form-submit>
      </dsp-flex>
    </dsp-smart-form>
  </dsp-modal>
</template>

<style scoped lang="scss">
h2 {
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 450px;
  overflow-y: auto;

  li:not(:last-of-type) {
    margin-bottom: var(--spacing-md);
  }
}

footer {
  margin-top: var(--spacing-md);
}
.order-validation__item {
  background-color: var(--order-item-bg-color);
  border: solid 2px;
  border-color: var(--order-item-border-color, transparent);
  margin-right: var(--spacing-sm);
}

.order-validation__item-actions {
  > button {
    min-width: 8.5em;
  }
}
</style>

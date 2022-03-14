<script>
export default { name: 'SolveProblemModal' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Order } from '@dsp/business';
import { useRemunerationApi, useOrderProblemApi, formatPrice } from '@dsp/core';
import { useDevice, useForm, useToast, VALIDATION_MODES } from '@dsp/ui';

const props = defineProps({
  order: { type: Order, required: true },
  isOpened: { type: Boolean, required: true }
});

const emit = defineEmits(['close', 'success']);

const { t } = useI18n();
const { showSuccess, showError } = useToast();
const device = useDevice();

const { data: remunerations } = useRemunerationApi().findAllQuery();
const { mutateAsync: solveProblem } = useOrderProblemApi().solveMutation({
  onSuccess() {
    emit('close');
    emit('success');
    showSuccess(t('toasts.orderProblem.solveSuccess'));
  },
  onError(err) {
    console.error(err);
    showError(t('toasts.orderProblem.solveSuccess'));
  }
});

const form = useForm({
  mode: VALIDATION_MODES.ON_INPUT,
  async onSubmit(values) {
    return solveProblem({
      id: props.order.orderProblems[0].id,
      entity: values
    });
  }
});

const [, { values: formValues }] = form;

const getRemaining = (total, spent) => (total - (spent ?? 0)).toFixed(2);
const remainingItemsAmount = computed(() =>
  getRemaining(props.order.itemsAmount, formValues.value.buyerPrice)
);
const remainingFeesAmount = computed(() =>
  getRemaining(props.order.serviceFeeAmount, formValues.value.buyerFees)
);
const remainingDeliveryAmount = computed(() =>
  getRemaining(props.order.deliveryPrice, formValues.value.buyerDelivery)
);

const remunerationOptions = computed(() =>
  remunerations.value?.map?.(rem => ({
    label: t(`remuneration.${rem.remunerationName}`),
    value: rem.uri
  }))
);
</script>

<template>
  <dsp-modal
    v-slot="{ focusRef }"
    :is-opened="isOpened"
    @close="$emit('close')"
  >
    <h4>{{ t('orderProblem.solveModal.title') }}</h4>
    <dsp-smart-form :form="form">
      <dsp-grid :columns="device.isDesktop ? 2 : 1" gap="lg">
        <dsp-grid-item>
          <fieldset>
            <legend>{{ t('orderProblem.solveModal.orderAmounts') }}</legend>
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              :model-value="remainingItemsAmount"
              :label="t('orderProblem.solveModal.itemAmount')"
            >
              <dsp-input-text
                v-bind="formControlProps"
                right-icon="euroSign"
                readonly
                v-on="on"
              />
            </dsp-form-control>

            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              :model-value="remainingFeesAmount"
              :label="t('orderProblem.solveModal.feesAmount')"
            >
              <dsp-input-text
                v-bind="formControlProps"
                right-icon="euroSign"
                readonly
                v-on="on"
              />
            </dsp-form-control>

            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              :model-value="remainingDeliveryAmount"
              :label="t('orderProblem.solveModal.deliveryAmount')"
            >
              <dsp-input-text
                v-bind="formControlProps"
                right-icon="euroSign"
                readonly
                v-on="on"
              />
            </dsp-form-control>
          </fieldset>
        </dsp-grid-item>
        <dsp-grid-item>
          <fieldset>
            <legend>{{ t('orderProblem.solveModal.creditBuyer') }}</legend>
            <dsp-smart-form-field
              v-slot="slotProps"
              name="refundAmount"
              :max="order.itemsAmount"
              :initial-value="0"
            >
              <dsp-form-control
                v-slot="{ on, ...formControlProps }"
                v-model.number="slotProps.field.value"
                v-bind="slotProps"
                :label="t('orderProblem.solveModal.refund')"
              >
                <dsp-input-text
                  v-bind="formControlProps"
                  right-icon="euroSign"
                  type="number"
                  step="any"
                  v-on="on"
                />
              </dsp-form-control>
            </dsp-smart-form-field>

            <dsp-smart-form-field
              v-slot="slotProps"
              name="buyerCommercialGestureAmount"
              :initial-value="0"
            >
              <dsp-form-control
                v-slot="{ on, ...formControlProps }"
                v-model.number="slotProps.field.value"
                v-bind="slotProps"
                :label="t('orderProblem.solveModal.commercialGesture')"
              >
                <dsp-input-text
                  v-bind="formControlProps"
                  right-icon="euroSign"
                  type="number"
                  step="any"
                  v-on="on"
                />
              </dsp-form-control>
            </dsp-smart-form-field>

            <dsp-smart-form-field
              v-slot="slotProps"
              name="buyerCommercialGestureRemuneration"
              :initial-value="remunerations[0].uri"
            >
              <dsp-radio-group
                v-model="slotProps.field.value"
                :values="remunerationOptions"
                row
              />
            </dsp-smart-form-field>
          </fieldset>

          <fieldset>
            <legend>{{ t('orderProblem.solveModal.creditSeller') }}</legend>

            <dsp-smart-form-field
              v-slot="slotProps"
              name="sellerCommercialGestureAmount"
              :initial-value="0"
            >
              <dsp-form-control
                v-slot="{ on, ...formControlProps }"
                v-model.number="slotProps.field.value"
                v-bind="slotProps"
                :label="t('orderProblem.solveModal.commercialGesture')"
              >
                <dsp-input-text
                  v-bind="formControlProps"
                  right-icon="euroSign"
                  type="number"
                  step="any"
                  v-on="on"
                />
              </dsp-form-control>
            </dsp-smart-form-field>

            <dsp-smart-form-field
              v-slot="slotProps"
              name="sellerCommercialGestureRemuneration"
              :initial-value="remunerations[0].uri"
            >
              <dsp-radio-group
                v-model="slotProps.field.value"
                :values="remunerationOptions"
                row
              />
            </dsp-smart-form-field>
          </fieldset>
        </dsp-grid-item>
      </dsp-grid>
      <dsp-flex as="footer" justify="flex-end" gap="md">
        <dsp-button
          type="button"
          :button-ref="focusRef"
          is-outlined
          @click="emit('close')"
        >
          {{ t('cancel') }}
        </dsp-button>
        <dsp-smart-form-submit>
          {{ t('validate') }}
        </dsp-smart-form-submit>
      </dsp-flex>
    </dsp-smart-form>
  </dsp-modal>
</template>

<style lang="scss" scoped>
h4 {
  font-size: var(--font-size-lg);
  margin-top: 0;
}

fieldset {
  border: 0;
  padding: 0;
  min-width: 0;
  margin-bottom: var(--spacing-xl);
}

small {
  display: block;
  margin: var(--spacing-md) 0;
}

legend {
  display: block;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}
</style>

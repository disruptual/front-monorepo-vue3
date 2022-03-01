<script>
export default { name: 'SolveProblemModal' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Order } from '@dsp/business';
import { useRemunerationApi, useOrderProblemApi, formatPrice } from '@dsp/core';
import { useForm, useToast, VALIDATION_MODES } from '@dsp/ui';

const props = defineProps({
  order: { type: Order, required: true },
  isOpened: { type: Boolean, required: true }
});

const emit = defineEmits(['close', 'success']);

const { t } = useI18n();
const { showSuccess, showError } = useToast();

const { data: remunerations } = useRemunerationApi().findAllQuery();
const { mutateAsync: solveProblem } = useOrderProblemApi().solveMutation({
  onSuccess() {
    emit('close');
    emit('success');
    showSuccess('Litige résolu');
  },
  onError(err) {
    console.error(err);
    showError('Erreur lors de la résolution du litige');
  }
});

const form = useForm({
  mode: VALIDATION_MODES.ON_INPUT,
  async onSubmit(values) {
    const { buyerPrice, buyerFees, buyerDelivery, ...rest } = values;

    return solveProblem({
      id: (await props.order.orderProblems)[0].id,
      entity: {
        ...rest,
        refundAmount: refundTotalAmount.value
      }
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

const refundTotalAmount = computed(() => {
  const { value } = formValues;
  return value.buyerPrice + value.buyerFees + value.buyerDelivery;
});

const remunerationOptions = computed(() =>
  remunerations.value?.map?.(rem => ({
    label: t(`remuneration.${rem.remunerationName}`),
    value: rem.remunerationName
  }))
);
</script>

<template>
  <dsp-modal
    v-slot="{ focusRef }"
    :is-opened="isOpened"
    @close="$emit('close')"
  >
    <h4>Clôre le litige</h4>
    <dsp-smart-form :form="form">
      <dsp-grid columns="repeat(2, 300px)" gap="lg">
        <dsp-grid-item>
          <fieldset>
            <legend>Montants Commande</legend>
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              :model-value="remainingItemsAmount"
              label="Montant des articles"
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
              label="Frais de service"
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
              label="Frais de livraison"
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
            <legend>Créditer l'acheteur</legend>
            <dsp-smart-form-field
              v-slot="slotProps"
              name="buyerPrice"
              :max="order.itemsAmount"
              :initial-value="0"
            >
              <dsp-form-control
                v-slot="{ on, ...formControlProps }"
                v-model.number="slotProps.field.value"
                v-bind="slotProps"
                label="Montant des articles"
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
              name="buyerFees"
              :max="order.serviceFeeAmount"
              :initial-value="0"
            >
              <dsp-form-control
                v-slot="{ on, ...formControlProps }"
                v-model.number="slotProps.field.value"
                v-bind="slotProps"
                label="Frais de service"
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
              name="buyerDelivery"
              :max="order.deliveryPrice"
              :initial-value="0"
            >
              <dsp-form-control
                v-slot="{ on, ...formControlProps }"
                v-model.number="slotProps.field.value"
                v-bind="slotProps"
                label="Frais de livraison"
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

            <small>Total: {{ formatPrice(refundTotalAmount) }}</small>

            <dsp-smart-form-field
              v-slot="slotProps"
              name="buyerCommercialGestureAmount"
              :initial-value="0"
            >
              <dsp-form-control
                v-slot="{ on, ...formControlProps }"
                v-model.number="slotProps.field.value"
                v-bind="slotProps"
                label="Geste commercial"
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
              :initial-value="remunerations[0].remunerationName"
            >
              <dsp-radio-group
                v-model="slotProps.field.value"
                :values="remunerationOptions"
                row
              />
            </dsp-smart-form-field>
          </fieldset>

          <fieldset>
            <legend>Créditer le vendeur</legend>

            <dsp-smart-form-field
              v-slot="slotProps"
              name="sellerCommercialGestureAmount"
              :initial-value="0"
            >
              <dsp-form-control
                v-slot="{ on, ...formControlProps }"
                v-model.number="slotProps.field.value"
                v-bind="slotProps"
                label="Geste commercial"
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
              :initial-value="remunerations[0].remunerationName"
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
        <dsp-button type="button" :button-ref="focusRef" is-outlined>
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

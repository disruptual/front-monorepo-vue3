<script>
export default { name: 'SolveProblemModal' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Order } from '@dsp/business';
import { useRemunerationApi } from '@dsp/core';
import { useForm, VALIDATION_MODES } from '@dsp/ui';

const props = defineProps({
  order: { type: Order, required: true },
  isOpened: { type: Boolean, required: true }
});

defineEmits(['close']);

const { t } = useI18n();
const { data: remunerations } = useRemunerationApi().findAllQuery();

const form = useForm({
  mode: VALIDATION_MODES.ON_INPUT,
  onSubmit(values) {
    console.log(values);
  }
});
const [, { values: formValues }] = form;

const remainingPrices = computed(() => {
  const { buyerPrice, buyerFees, buyerDelivery } = formValues.value;

  return {
    items: (props.order.totalItemPrices - buyerPrice).toFixed(2),
    fees: (props.order.serviceFeeAmount - buyerFees).toFixed(2),
    delivery: (props.order.deliveryPrice - buyerDelivery).toFixed(2)
  };
});

const remunerationOptions = computed(() =>
  remunerations.value?.map?.(rem => ({
    label: t(`remuneration.${rem.remunerationName}`),
    value: rem.id
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
      <dsp-grid :columns="2" gap="lg">
        <dsp-grid-item>
          <fieldset>
            <legend>Montants Commande</legend>
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              :model-value="remainingPrices.items"
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
              :model-value="remainingPrices.fees"
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
              :model-value="remainingPrices.delivery"
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
              :max="order.totalItemPrices"
              :initial-value="0"
            >
              <dsp-form-control
                v-slot="{ on, ...formControlProps }"
                v-model.number="slotProps.field.value"
                v-bind="slotProps"
                label="Montant des articles"
              >
                <dsp-input-text
                  :input-ref="focusRef"
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

            <dsp-smart-form-field
              v-slot="slotProps"
              name="buyerGesture"
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
              name="buyerRemuneration"
              :initial-value="remunerations[0].id"
              :max="order.serviceFeeAmount"
            >
              <dsp-radio-group
                v-model.number="slotProps.field.value"
                :values="remunerationOptions"
                row
              />
            </dsp-smart-form-field>
          </fieldset>

          <fieldset>
            <legend>Créditer le vendeur</legend>

            <dsp-smart-form-field
              v-slot="slotProps"
              name="sellerGesture"
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
              name="sellerRemuneration"
              :max="order.serviceFeeAmount"
              :initial-value="remunerations[0].id"
            >
              <dsp-radio-group
                v-model.number="slotProps.field.value"
                :values="remunerationOptions"
                row
              />
            </dsp-smart-form-field>
          </fieldset>
        </dsp-grid-item>
      </dsp-grid>
      <dsp-flex justify="flex-end" gap="md">
        <dsp-button type="button" is-outlined>{{ t('cancel') }}</dsp-button>
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
  margin: 0 0 var(--spacing-xl);
  min-width: 0;
}

legend {
  display: block;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}
</style>

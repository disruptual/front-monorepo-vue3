<script>
export default { name: 'ItemFiltersPrice' };
</script>

<script setup>
import { inject, computed, ref, watch } from 'vue';
import { CONTEXT_KEYS, useForm } from '@dsp/ui';
import { useItemApi } from '@dsp/core';

const { data: mostExpensiveItems } = useItemApi().findAllQuery({
  itemsPerPage: 1,
  filters: {
    'sort[price]': 'desc'
  }
});
const maxPrice = computed(() => mostExpensiveItems.value?.[0]?.price);
const { filters, setFilter } = inject(CONTEXT_KEYS.FILTER_BAR);

const form = useForm({
  onSubmit(values) {
    setFilter('price', values);
  }
});
</script>

<template>
  <dsp-filter-bar-item label="Prix" name="price">
    <dsp-smart-form v-if="maxPrice" :form="form" class="item-filter-price">
      <dsp-smart-form-field
        v-slot="slotProps"
        name="min"
        :initial-value="filters.price.value?.min"
      >
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="slotProps.field.value"
          v-bind="slotProps"
          label="Min"
        >
          <dsp-input-text
            type="number"
            v-bind="formControlProps"
            right-icon="euroSign"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>

      <dsp-smart-form-field
        v-slot="slotProps"
        name="max"
        :initial-value="filters.price.value?.max"
      >
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="slotProps.field.value"
          v-bind="slotProps"
          label="Max"
        >
          <dsp-input-text
            type="number"
            v-bind="formControlProps"
            right-icon="euroSign"
            :placeholder="`max: ${maxPrice}€`"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>

      <dsp-smart-form-submit :is-full-width="true">
        Valider
      </dsp-smart-form-submit>
    </dsp-smart-form>
  </dsp-filter-bar-item>
</template>

<style lang="scss" scoped>
.item-filter-price {
  padding: 0 var(--spacing-sm);
}
</style>

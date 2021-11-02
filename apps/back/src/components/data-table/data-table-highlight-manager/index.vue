<script>
export default { name: 'DataTableHighlightManager' };
</script>

<script setup>
import { inject, toRaw, computed } from 'vue';
import { CONTEXT_KEYS, DATATABLE_HIGHLIGHT_OPERATORS } from '@/utils/constants';
import { useForm } from '@dsp/ui';

const { model } = inject(CONTEXT_KEYS.DATATABLE);

defineProps({
  isOpened: { type: Boolean, required: true }
});

const emit = defineEmits(['update:isOpened']);

const colors = [
  { text: 'var(--color-red-600)', bg: 'var(--color-red-100)' },
  { text: 'var(--color-red-50)', bg: 'var(--color-red-600)' },
  { text: 'var(--color-orange-800)', bg: 'var(--color-orange-100)' },
  { text: 'var(--color-orange-50)', bg: 'var(--color-orange-600)' },
  { text: 'var(--color-blue-600)', bg: 'var(--color-blue-100)' },
  { text: 'var(--color-blue-50)', bg: 'var(--color-blue-600)' },
  { text: 'var(--color-green-700)', bg: 'var(--color-green-100)' },
  { text: 'var(--color-green-50)', bg: 'var(--color-green-700)' },
  { text: 'var(--color-teal-700)', bg: 'var(--color-teal-100)' },
  { text: 'var(--color-teal-50)', bg: 'var(--color-teal-800)' },
  { text: 'var(--color-purple-600)', bg: 'var(--color-purple-100)' },
  { text: 'var(--color-purple-50)', bg: 'var(--color-purple-600)' }
];
const form = useForm({
  onSubmit(values) {
    model.addHighlight(toRaw({ ...values, column: selectedColumn.value }));
    emit('update:isOpened', false);
  }
});

const formValues = computed(() => form[1].values.value);
const selectedColumn = computed(() =>
  model.columns.find(col => col.name === formValues.value.column)
);
const operators = computed(() =>
  Object.values(DATATABLE_HIGHLIGHT_OPERATORS[selectedColumn.value.type])
);
const highlightableColumns = computed(() =>
  model.highlightableColumns.map(column => ({
    label: column.label,
    value: column.name
  }))
);
</script>

<template>
  <dsp-modal :is-opened="isOpened" @close="$emit('update:isOpened', false)">
    <dsp-smart-form :form="form" class="data-table-filter-drawer">
      <dsp-smart-form-field
        v-slot="slotProps"
        name="name"
        :initial-value="null"
      >
        <dsp-form-control
          v-model="slotProps.field.value"
          v-bind="slotProps"
          label="Titre du surlignage"
        />
      </dsp-smart-form-field>
      <dsp-flex align="center" gap="sm">
        <dsp-smart-form-field
          v-slot="slotProps"
          name="column"
          :initial-value="null"
        >
          <dsp-form-control
            v-slot="{ on, formControlProps }"
            v-model="slotProps.field.value"
            v-bind="slotProps"
            label=""
          >
            <select
              v-model="slotProps.field.value"
              v-bind="formControlProps"
              v-on="on"
            >
              <option disabled :value="null">Colonne</option>
              <option
                v-for="column in highlightableColumns"
                :key="column.value"
                :value="column.value"
              >
                {{ column.label }}
              </option>
            </select>
          </dsp-form-control>
        </dsp-smart-form-field>
        <dsp-smart-form-field
          v-if="selectedColumn"
          v-slot="slotProps"
          name="operator"
          :initial-value="null"
        >
          <dsp-form-control
            v-slot="{ on, formControlProps }"
            v-model="slotProps.field.value"
            v-bind="slotProps"
            label=""
          >
            <select
              v-model="slotProps.field.value"
              v-bind="formControlProps"
              v-on="on"
            >
              <option disabled :value="null">Opérateur</option>
              <option
                v-for="operator in operators"
                :key="operator"
                :value="operator"
              >
                {{ operator }}
              </option>
            </select>
          </dsp-form-control>
        </dsp-smart-form-field>

        <dsp-smart-form-field
          v-if="selectedColumn"
          v-slot="slotProps"
          name="value"
        >
          <dsp-form-control
            v-model="slotProps.field.value"
            v-bind="slotProps"
            label=""
          />
        </dsp-smart-form-field>

        <dsp-smart-form-field
          v-if="selectedColumn"
          v-slot="slotProps"
          name="color"
          :initial-value="null"
        >
          <dsp-form-control
            v-slot="{ on, formControlProps }"
            v-model="slotProps.field.value"
            v-bind="slotProps"
            label=""
          >
            <select
              v-model="slotProps.field.value"
              v-bind="formControlProps"
              v-on="on"
            >
              <option disabled :value="null">Aa</option>
              <option
                v-for="(color, index) in colors"
                :key="index"
                :value="color"
                :style="{ color: color.text, backgroundColor: color.bg }"
              >
                Aa
              </option>
            </select>
          </dsp-form-control>
        </dsp-smart-form-field>
      </dsp-flex>

      <dsp-flex justify="flex-end" gap="lg" class="actions">
        <dsp-button
          is-outlined
          type="button"
          @click="$emit('update:isOpened', false)"
        >
          Annuler
        </dsp-button>
        <dsp-smart-form-submit>Ajouter</dsp-smart-form-submit>
      </dsp-flex>
    </dsp-smart-form>
  </dsp-modal>
</template>

<style lang="scss" scoped>
.actions {
  margin-top: var(--spacing-xl);
}

form {
  min-width: 55vw;
}

select {
  padding: var(--spacing-xs);
  border: solid 1px var(--color-separator);
  background-color: var(--color-surface);
}
</style>

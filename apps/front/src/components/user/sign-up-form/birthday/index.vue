<script>
export default { name: 'SignUpFormBirthday' };
</script>

<script setup>
import { ref, computed, useAttrs } from 'vue';
import { isDefined } from '@dsp/core';

const props = defineProps({
  modelValue: { type: String, default: '' }
});
const emit = defineEmits(['update:modelValue']);

const tokens = computed(() => {
  if (!isDefined(props.modelValue)) {
    return { day: '', month: '', year: '' };
  }
  const [year, month, day] = props.modelValue.split('-');

  return { year, month, day };
});

const day = computed({
  get() {
    return tokens.value.day;
  },
  set(val) {
    emit('update:modelValue', `${year.value}-${month.value}-${val}`);
  }
});

const month = computed({
  get() {
    return tokens.value.month;
  },
  set(val) {
    emit('update:modelValue', `${year.value}-${val}-${day.value}`);
  }
});

const year = computed({
  get() {
    return tokens.value.year;
  },
  set(val) {
    emit('update:modelValue', `${val}-${month.value}-${day.value}`);
  }
});

const dayElement = ref(null);
const monthElement = ref(null);
const yearElement = ref(null);
const makeFocusManager = (maxLength, nextInputRef, previousInputRef) => {
  return {
    input(e) {
      if (e.target.value > maxLength) nextInputRef?.value?.focus();
    },

    keyup(e) {
      if (e.target.value) return;
      if (e.key === 'Backspace') previousInputRef?.value?.focus();
    }
  };
};
const dayListeners = makeFocusManager(2, monthElement);
const monthListeners = makeFocusManager(2, yearElement, dayElement);
const yearListeners = makeFocusManager(4, null, monthElement);

const attrs = useAttrs();
const labels = computed(() => ({
  day: `${attrs.id}-day`,
  month: `${attrs.id}-month`,
  year: `${attrs.id}-year`
}));
</script>

<template>
  <dsp-flex as="fieldset" gap="sm" wrap="nowrap" class="sign-up-form-birthday">
    <div>
      <label :for="labels.day">Jour</label>
      <dsp-input-text
        :id="labels.day"
        v-model="day"
        maxlength="2"
        placeholder="DD"
        :input-ref="el => (dayElement = el)"
        v-on="dayListeners"
      />
    </div>

    <div>
      <label :for="labels.month">Mois</label>
      <dsp-input-text
        :id="labels.month"
        v-model="month"
        maxlength="2"
        placeholder="MM"
        :input-ref="el => (monthElement = el)"
        v-on="monthListeners"
      />
    </div>

    <div>
      <label :for="labels.year">Année</label>
      <dsp-input-text
        :id="labels.year"
        v-model="year"
        maxlength="4"
        placeholder="YYYY"
        :input-ref="el => (yearElement = el)"
        v-on="yearListeners"
      />
    </div>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.sign-up-form-birthday {
  border: none;
  padding: 0;
  margin: 0;

  &:deep(.dsp-input-text input) {
    width: 5em;
  }
  &:deep(.dsp-input-text:nth-of-type(3) input) {
    width: 8em;
  }

  label {
    font-size: var(--font-size-sm);
  }
}
</style>

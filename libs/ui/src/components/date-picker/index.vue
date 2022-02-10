<script>
export default { name: 'DspDatePicker' };
</script>

<script setup>
import { reactive, computed, watchEffect } from 'vue';
import {
  format,
  addMonths,
  getDate,
  getMonth,
  getYear,
  isEqual
} from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { getMonthMatrix } from '@dsp/ui/utils/getMonthMatrix';
import { DAYS } from '@dsp/ui/utils/constants';
import { vReadableColor } from '@dsp/ui/directives/readableColor';

const props = defineProps({
  modelValue: { type: [Date, null], required: true },
  isTeleport: { type: Boolean, default: false }
});
const emit = defineEmits(['update:modelValue']);

const state = reactive({
  isCalendarOpened: false,
  internalValue: props.modelValue
});

watchEffect(() => {
  state.internalValue = props.modelValue ?? new Date();
});

const headerLabel = computed(() =>
  format(state.internalValue, 'MMM yyyy', { locale: frLocale })
);

const nextMonth = () => {
  state.internalValue = addMonths(state.internalValue, 1);
};

const previousMonth = () => {
  state.internalValue = addMonths(state.internalValue, -1);
};

const calendar = computed(() =>
  getMonthMatrix({
    year: getYear(state.internalValue),
    month: getMonth(state.internalValue),
    weekStartsOn: DAYS.MONDAY
  }).flat()
);

const getCalendarCellLabel = d => getDate(d);
const isCellDisabled = d => getMonth(d) !== getMonth(state.internalValue);
const onCellClick = d => {
  emit('update:modelValue', d);
  state.isCalendarOpened = false;
};

const inputValue = computed(() =>
  props.modelValue
    ? format(props.modelValue, 'dd-MM-yyyy', { locale: frLocale })
    : null
);

const isActive = d =>
  isEqual(
    new Date(format(props.modelValue || new Date(), 'MM-dd-yyyy')),
    new Date(format(d, 'MM-dd-yyyy'))
  );

const onFocus = () => {
  state.isCalendarOpened = true;
};
</script>

<template>
  <dsp-input-text
    v-bind="$attrs"
    :model-value="inputValue"
    readonly="true"
    @focus="onFocus"
  />
  <dsp-dropdown
    v-model:is-opened="state.isCalendarOpened"
    :is-teleport="props.isTeleport"
    :close-on-focus-outside="false"
    class="dsp-date-picker"
  >
    <template #menu>
      <div class="dsp-date-picker__menu">
        <dsp-flex gap="xs" justify="space-around">
          <dsp-plain-button type="button" @click="previousMonth">
            <dsp-icon icon="caretLeft" size="sm" />
          </dsp-plain-button>
          <span>{{ headerLabel }}</span>
          <dsp-plain-button type="button" @click="nextMonth">
            <dsp-icon icon="caretRight" size="sm" />
          </dsp-plain-button>
        </dsp-flex>

        <div class="dsp-date-picker__calendar">
          <dsp-plain-button
            v-for="(day, dayIndex) in calendar"
            :key="dayIndex"
            v-readable-color
            type="button"
            class="dsp-date-picker__cell"
            :disabled="isCellDisabled(day)"
            :class="{ 'dsp-date-picker__cell--active': isActive(day) }"
            @click="onCellClick(day)"
          >
            {{ getCalendarCellLabel(day) }}
          </dsp-plain-button>
        </div>
      </div>
    </template>
  </dsp-dropdown>
</template>

<style lang="scss" scoped>
.dsp-date-picker__calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  &::after {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  .dsp-date-picker__cell {
    padding: var(--spacing-sm);

    &:hover,
    &:focus {
      outline: solid 1px var(--color-brand-500);
    }
    &:focus {
      background-color: var(--color-brand-200);
    }
  }

  .dsp-date-picker__cell--active {
    background-color: var(--color-brand-500);
  }
}
</style>

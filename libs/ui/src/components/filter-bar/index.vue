<script>
export default { name: 'FilterBar' };
</script>

<script setup>
import { provide, ref, computed } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';
import { isArray, isDefined } from '@dsp/core';

const context = {
  filters: ref({}),
  activeFilters: computed(() =>
    Object.values(context.filters.value).filter(({ value }) => {
      return isArray(value) ? value.length > 0 : isDefined(value);
    })
  ),
  register(
    name,
    { initialValue = null, template, resultTemplate, multiple, label }
  ) {
    context.filters.value[name] = {
      value: initialValue,
      template,
      resultTemplate,
      multiple,
      label: label,
      name
    };
  },
  setFilter(name, value) {
    context.filters.value[name].value = value;
  },
  resetFilter(name) {
    context.filters.value[name].value = null;
  }
};

provide(CONTEXT_KEYS.FILTER_BAR, context);
</script>

<template>
  <dsp-flex gap="sm" align="center" wrap="nowrap">
    <dsp-plain-button left-icon="filter">Filtrer</dsp-plain-button>
    <dsp-button is-rounded size="sm">
      <template #right-icon>
        <!-- <dsp-icon-button
              icon="remove"
              is-plain
              @click.stop="context.resetFilter(filter.name)"
            /> -->
        RIGHT ICON
      </template>

      <template #default>
        <div>
          <span>DEFALT SLOT</span>
        </div>
      </template>
    </dsp-button>

    <dsp-loading-button is-loading>Loading button</dsp-loading-button>
    <dsp-swiper class="filter-group-mobile__active-filters">
      <dsp-swiper-item
        v-for="filter in context.activeFilters.value"
        :key="filter.name"
      ></dsp-swiper-item>
    </dsp-swiper>
    <slot />
  </dsp-flex>
</template>

<script>
export default { name: 'FilterBar' };
</script>

<script setup>
import { provide, ref, computed } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';
import { isArray, isDefined } from '@dsp/core';

const props = defineProps({
  modelValue: { type: Object, required: true }
});
const emit = defineEmits(['update:modelValue']);

const context = {
  filters: ref({}),
  activeFilters: computed(() =>
    Object.values(context.filters.value).filter(({ value }) => {
      return isArray(value) ? value.length > 0 : isDefined(value);
    })
  ),
  register(name, { template, resultTemplate, multiple, label }) {
    context.filters.value[name] = {
      value: computed({
        get() {
          return props.modelValue[name];
        },
        set(val) {
          emit('update:modelValue', {
            ...props.modelValue,
            [name]: val
          });
        }
      }),
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
    context.setFilter(name, null);
  },
  openedFilter: ref(null),
  isDrawerOpened: ref(false),
  openFilter(filterName) {
    context.openedFilter.value = context.filters.value[filterName];
    context.isDrawerOpened.value = true;
  },
  closeDrawer() {
    context.openedFilter.value = null;
    context.isDrawerOpened.value = false;
  }
};
const { filters, activeFilters, openedFilter, isDrawerOpened } = context;

provide(CONTEXT_KEYS.FILTER_BAR, context);
</script>

<template>
  <dsp-flex gap="sm" align="center" wrap="nowrap">
    <dsp-plain-button left-icon="filter" @click="isDrawerOpened = true">
      Filtrer
    </dsp-plain-button>

    <dsp-swiper class="filter-group-mobile__active-filters">
      <dsp-swiper-item v-for="filter in activeFilters" :key="filter.name">
        <dsp-button
          is-rounded
          size="sm"
          @click="context.openFilter(filter.name)"
        >
          <span>{{ filter.label }}</span>
          <span v-show="filter.multiple">({{ filter.value?.length }})</span>

          <template #right-icon>
            <dsp-icon-button
              icon="remove"
              is-plain
              @click.stop="context.resetFilter(filter.name)"
            />
          </template>
        </dsp-button>
      </dsp-swiper-item>
    </dsp-swiper>
    <slot />
  </dsp-flex>

  <dsp-drawer :is-opened="isDrawerOpened" @close="context.closeDrawer">
    <div class="filter-bar__drawer">
      <div v-if="openedFilter">
        <dsp-back-link
          :label="openedFilter.label"
          @click="openedFilter = null"
        />
        <dsp-v-node :vnode="openedFilter.template" v-bind="context" />
      </div>

      <div v-else>
        <dsp-back-link label="Filtrer" @click="context.closeDrawer" />
        <ul class="filter-bar__root-filters">
          <li v-for="filter in filters" :key="filter.name">
            <dsp-plain-button
              right-icon="chevronRight"
              @click="openedFilter = filter"
            >
              {{ filter.label }}
            </dsp-plain-button>
          </li>
        </ul>
      </div>
    </div>
  </dsp-drawer>
</template>

<style lang="scss" scoped>
.filter-bar__drawer {
  min-width: 18em;

  .filter-bar__root-filters {
    > li {
      padding: var(--spacing-xs);
      border-bottom: solid 1px var(--color-separator);

      button {
        width: 100%;
        justify-content: space-between;
      }
    }
  }
}
</style>

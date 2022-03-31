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

const infiniteScrollRoot = ref(null);

const context = {
  infiniteScrollRoot,
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
          const val = props.modelValue[name];
          if (multiple && !isDefined(val)) return [];

          return val;
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

const backLinkLabel = computed(() =>
  openedFilter.value ? openedFilter.value.label : 'Filtrer'
);
const onBackLinkClick = () => {
  if (openedFilter.value) {
    openedFilter.value = null;
  } else {
    context.closeDrawer();
  }
};
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
      <dsp-flex
        direction="column"
        wrap="nowrap"
        class="filter-bar__opened-filter"
      >
        <dsp-back-link :label="backLinkLabel" @click="onBackLinkClick" />
        <dsp-slide-transition invert-on-out distance="-100%" :duration="200">
          <div
            v-if="openedFilter"
            ref="infiniteScrollRoot"
            class="filter-bar__filter-content"
          >
            <dsp-v-node :vnode="openedFilter.template" v-bind="context" />
          </div>

          <div v-else>
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
        </dsp-slide-transition>
      </dsp-flex>
    </div>
  </dsp-drawer>
</template>

<style lang="scss" scoped>
.filter-bar__drawer {
  overflow-x: hidden;
  min-width: 22em;
  max-width: 100%;

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

  .filter-bar__opened-filter {
    height: 100vh;
  }

  .filter-bar__filter-content {
    flex-grow: 1;
    overflow-y: auto;
  }
}
</style>

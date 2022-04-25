<script>
export default { name: 'HeaderCategoriesNav' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCategoryApi } from '@dsp/core';
import { vReadableColor, vClickOutside } from '@dsp/ui';
import schema from './index.schema';
import CategoriesNavDropdown from './dropdown/index.vue';

const props = defineProps(schema.toProps());
const componentContext = schema.toContext(props);
const { t } = useI18n();

const { data: categories } = useCategoryApi().findAllQuery({
  relations: ['children', 'children.children']
});
const dropdownToggleElement = ref(null);

const rootCategories = computed(() =>
  categories.value?.filter(c => !c._parent)
);

const selectedCategory = ref(null);
const isDropdownOpened = computed({
  get() {
    return !!selectedCategory.value;
  },
  set(val) {
    if (!val) selectedCategory.value = null;
    console.log(selectedCategory.value);
    setTimeout(() => {
      console.log(selectedCategory.value);
    }, 1000);
  }
});

const alignment = computed(() => {
  const map = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
  };

  return map[componentContext.value.align];
});

const selectCategory = (e, category) => {
  dropdownToggleElement.value = e.target;
  selectedCategory.value = category;
};
const onClickOutside = () => {
  selectedCategory.value = null;
};

let closeTimeout = null;
const onMouseleave = () => {
  closeTimeout = setTimeout(() => {
    selectedCategory.value = null;
  }, 50);
};
const onMouseenter = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
};
const menuToggleEvents = {
  onMouseenter,
  onMouseleave
};
</script>

<template>
  <nav
    v-click-outside="onClickOutside"
    v-readable-color
    class="categories-nav"
    v-bind="menuToggleEvents"
  >
    <dsp-flex
      as="ul"
      gap="lg"
      :justify="alignment"
      class="categories-nav__list"
    >
      <li
        v-for="category in rootCategories"
        :key="category.id"
        @mouseenter="selectCategory($event, category)"
      >
        <router-link
          :to="{ name: 'ItemSearch', params: { category: category.slug } }"
          :class="selectedCategory === category && 'active'"
          @focus="selectCategory($event, category)"
        >
          <dsp-flex gap="sm" align="center">
            <img v-if="category.picto" :src="category.picto" />
            {{ category.name }}
          </dsp-flex>
        </router-link>
      </li>

      <li
        v-if="componentContext.hasMainsiteLink"
        class="categories-nav__main-site-link"
      >
        <a :href="componentContext.mainsiteUrl">
          {{ t('categoriesNav.mainsiteLink') }}
        </a>
      </li>
    </dsp-flex>
    <dsp-dropdown
      v-model:is-opened="isDropdownOpened"
      :toggle-ref="dropdownToggleElement"
      return-focus-on-close
      close-on-focus-outside
      class="categories-nav__dropdown"
    >
      <template #menu>
        <CategoriesNavDropdown
          v-if="selectedCategory"
          :selected-category="selectedCategory"
          v-bind="menuToggleEvents"
        />
      </template>
    </dsp-dropdown>
  </nav>
</template>

<style lang="scss" scoped>
.categories-nav {
  position: relative;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: v-bind('componentContext.backgroundColor');
}

.categories-nav__list {
  min-height: 1.25em;

  li {
    a {
      &.active {
        color: v-bind('componentContext.activeColor');
      }
    }

    img {
      width: 1.25em;
      aspect-ratio: 1;
    }
  }
}

.categories-nav__main-site-link {
  position: absolute;
  right: 0;
  margin-right: var(--spacing-md);

  a {
    text-decoration: underline;
  }
}

.categories-nav__dropdown {
  position: absolute;
}
</style>

<script>
export default { name: 'CategoriesNavDropdown' };
</script>

<script setup>
import { ref, watch } from 'vue';
import { Category } from '@dsp/business';

const props = defineProps({
  selectedCategory: { type: Category, required: true }
});

const selectedChild = ref(null);

watch(
  () => props.selectedCategory.id,
  () => {
    selectedChild.value = null;
  }
);
</script>

<template>
  <div class="categories-nav-dropdown">
    <dsp-grid :columns="2">
      <ul>
        <li
          v-for="category in props.selectedCategory.children"
          :key="category.id"
          @mouseenter="selectedChild = category"
        >
          <router-link
            :to="{ name: 'ItemSearch', params: { category: category.slug } }"
          >
            {{ category.name }}
          </router-link>
        </li>
        <li>
          <router-link
            class="see-all"
            :to="{
              name: 'ItemSearch',
              params: { category: props.selectedCategory.slug }
            }"
          >
            Voir tout
          </router-link>
        </li>
      </ul>

      <ul v-if="selectedChild">
        <li v-for="category in selectedChild.children" :key="category.id">
          <router-link
            :to="{ name: 'ItemSearch', params: { category: category.slug } }"
          >
            {{ category.name }}
          </router-link>
        </li>
        <li>
          <router-link
            class="see-all"
            :to="{
              name: 'ItemSearch',
              params: { category: selectedChild.slug }
            }"
          >
            Voir tout
          </router-link>
        </li>
      </ul>
    </dsp-grid>
  </div>
</template>

<style lang="scss" scoped>
.categories-nav-dropdown {
  ul:first-of-type {
    border-right: solid 1px var(--color-separator);
    min-width: 12em;
  }

  li {
    padding: var(--spacing-xs) var(--spacing-md);

    &:hover {
      background-color: var(--color-gray-200);
    }
  }
}

.see-all {
  font-weight: var(--font-weight-bold);
}
</style>

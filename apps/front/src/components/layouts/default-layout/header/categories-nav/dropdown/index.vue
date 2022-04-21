<script>
export default { name: 'CategoriesNavDropdown' };
</script>

<script setup>
import { ref } from 'vue';
import { Category } from '@dsp/business';

const props = defineProps({
  selectedCategory: { type: Category, required: true }
});

const selectedChild = ref(null);
</script>

<template>
  <div>
    <router-link
      :to="{
        name: 'ItemSearch',
        params: { category: props.selectedCategory.slug }
      }"
    >
      Voir tout
    </router-link>
    <dsp-flex>
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
      </ul>
      <ul v-if="selectedChild">
        <li
          v-for="category in selectedChild.children"
          :key="category.id"
          @mouseenter="selectedChild = category"
        >
          <router-link
            :to="{ name: 'ItemSearch', params: { category: category.slug } }"
          >
            {{ category.name }}
          </router-link>
        </li>
      </ul>
    </dsp-flex>
  </div>
</template>

<script>
export default { name: 'HeaderSearchBar' };
</script>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const search = ref(route.query.search);
const { push } = useRouter();

const onChange = () => {
  push({ name: 'ItemSearch', query: { search: search.value } });
};
</script>

<template>
  <dsp-input-search
    v-model="search"
    button-position="right"
    aria-label="rechercher"
    placeholder="Vous cherchez quelque chose ?"
    @change="onChange"
  />
</template>

<style lang="scss" scoped></style>

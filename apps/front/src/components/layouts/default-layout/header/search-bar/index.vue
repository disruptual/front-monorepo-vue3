<script>
export default { name: 'HeaderSearchBar' };
</script>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const search = ref(null);
const { push } = useRouter();

const onChange = () => {
  push({ name: 'ItemSearch', query: { search: search.value } });
};
</script>

<template>
  <dsp-input-search
    v-model="search"
    button-position="right"
    @change="onChange"
  />
</template>

<style lang="scss" scoped></style>

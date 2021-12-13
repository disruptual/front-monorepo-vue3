<script setup>
import { inject } from 'vue';

const myContext = inject('myContext');
</script>

<template>
  <div>{{ myContext }}</div>
</template>

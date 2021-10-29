<script setup>
const props = defineProps({
  emits: { type: Array, default: () => [] }
});

const hasEmits = props.emits.length > 0;
</script>

<template>
  <p v-if="!hasEmits">Ce composant n'émet aucun évènement</p>
  <ul v-else>
    <li v-for="event in emits" :key="event">
      {{ event }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: var(--spacing-md);
}
</style>

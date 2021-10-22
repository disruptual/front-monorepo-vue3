<script>
export default { name: 'FullPageLayout' };
</script>

<template>
  <main><slot /></main>
</template>

<style scoped>
main {
  min-height: 100vh;
}
</style>

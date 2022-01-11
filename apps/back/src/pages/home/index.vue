<script setup>
const releaseNotesModules = import.meta.globEager('./release-notes/*.md');

const releaseNotesComponents = Object.values(releaseNotesModules)
  .map(module => module.default)
  .reverse();
</script>

<template>
  <dsp-container>
    <h2>Home Page</h2>
    <h3>Release Notes</h3>
    <dsp-flex direction="column" gap="md">
      <dsp-surface
        v-for="(component, index) in releaseNotesComponents"
        :key="index"
        as="article"
        class="release-note"
      >
        <component :is="component" />
      </dsp-surface>
    </dsp-flex>
  </dsp-container>
</template>

<style lang="scss" scoped>
.release-note {
  :deep(ul) {
    list-style-type: disc;
  }

  :deep(li) {
    margin-bottom: var(--spacing-sm);
  }
}
</style>

<script setup>
import { ref } from 'vue';

const releaseNotesModules = import.meta.globEager('./versions/*.md');

const releaseNotes = Object.entries(releaseNotesModules)
  .map(([path, module]) => ({
    version: path.replace('./versions/', '').replace('.md', ''),
    component: module.default
  }))
  .filter(({ version }) => import.meta.env.DEV || version !== 'Latest')
  .reverse();

const isCollapsed = ref(true);

const versionClass = index => {
  if (index === releaseNotes.length - 1) return 'minor';

  const [currentMajor, currentMinor] = releaseNotes[index].version.split('.');
  const [previousMajor, previousMinor] =
    releaseNotes[index + 1].version.split('.');
  console.group(releaseNotes[index].version);

  console.log(currentMajor, currentMinor);
  console.log(previousMajor, previousMinor);
  console.groupEnd();
  if (currentMajor > previousMajor) return 'major';
  if (currentMinor > previousMinor) return 'minor';
  return 'patch';
};
</script>

<template>
  <h2>Notes de mise à jour</h2>
  <ul
    class="release-notes__summary"
    :class="isCollapsed && 'release-notes__summary--is-collapsed'"
  >
    <li v-for="(releaseNote, index) in releaseNotes" :key="index">
      <a :href="`#${releaseNote.version}`" :class="versionClass(index)">
        {{ releaseNote.version }}
      </a>
    </li>
  </ul>
  <div class="release-notes__summary-divider" />
  <dsp-center>
    <dsp-icon-button
      :icon="isCollapsed ? 'chevronDown' : 'chevronUp'"
      is-plain
      @click="isCollapsed = !isCollapsed"
    />
  </dsp-center>
  <dsp-flex direction="column" gap="md">
    <dsp-surface
      v-for="(releaseNote, index) in releaseNotes"
      :key="index"
      as="article"
      class="release-note"
    >
      <a :id="releaseNote.version" />
      <component :is="releaseNote.component" />
    </dsp-surface>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.release-note {
  :deep(ul) {
    list-style-type: disc;
  }

  :deep(li) {
    margin-bottom: var(--spacing-sm);
  }
  a {
    position: relative;
    top: calc(-1 * var(--header-height));
  }
}

.release-notes__summary {
  list-style: disc;
  margin-bottom: 0;
  padding-bottom: var(--spacing-md);

  a {
    color: inherit;
    line-height: 1.4;
  }

  .major {
    font-size: var(--font-size-md);
    color: var(--color-brand-500);
    font-weight: var(--font-weight-bold);
  }

  .minor {
    font-size: var(--font-size-md);
  }

  .patch {
    font-size: var(--font-size-sm);
  }
}

.release-notes__summary--is-collapsed {
  max-height: 150px;
  overflow: hidden;
  mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
  -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
}

.release-notes__summary-divider {
  height: 1px;
  width: 100%;
  border-bottom: solid 1px var(--color-gray-300);
}
</style>

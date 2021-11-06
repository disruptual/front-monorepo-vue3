<script>
export default { name: 'DefaultLayoutSidebar' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { vReadableColor } from '@dsp/ui';
import { useCurrentUser } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

import { MENU } from '@/utils/constants';
const { data: currentUser } = useCurrentUser();

const allowedSections = computed(() =>
  MENU.filter(section =>
    section.permissions.some(permission =>
      currentUser.value.hasRole(permission)
    )
  )
);

const openedSections = ref([]);
const isSectionOpened = sectionName =>
  openedSections.value.includes(sectionName);
const toggleSection = sectionName => {
  console.log(sectionName);
  if (isSectionOpened(sectionName)) {
    openedSections.value.splice(openedSections.value.indexOf(sectionName), 1);
  } else {
    openedSections.value.push(sectionName);
  }
};

const breadcrumbs = useBreadCrumbs();
const onLinkClick = () => {
  breadcrumbs.reset();
};
</script>

<template>
  <aside v-readable-color>
    <nav role="navigation">
      <dsp-flex
        v-for="section in allowedSections"
        :key="section.name"
        as="section"
        direction="column"
      >
        <dsp-flex
          v-readable-color
          as="button"
          align="center"
          class="section__toggle"
          @click="toggleSection(section.name)"
        >
          <dsp-icon
            :icon="section.icon"
            as="span"
            is-inline
            class="section__icon"
          />
          <span class="section__name">{{ section.name }}</span>
          <dsp-icon icon="caretDown" class="section__caret" />
        </dsp-flex>
        <ul v-if="isSectionOpened(section.name)" class="section-list">
          <li v-for="link in section.links" :key="link.label">
            <router-link
              :to="link.target"
              class="menu-item"
              @click="onLinkClick"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </dsp-flex>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  background-color: var(--color-brand-500);
  padding: var(--spacing-lg) var(--spacing-md);
  width: 50px;
  transition: width var(--transition-sm);
  overflow-x: hidden;

  &:hover,
  &:focus-within {
    width: 270px; // @FIXME how to keep transition with auto width ?
  }

  &:not(:hover):not(:focus-within) {
    ul,
    .section__name,
    .section__caret {
      display: none;
    }
    .section__toggle {
      padding-left: 0;
      background-color: transparent;
    }
  }
}

section {
  margin-bottom: var(--spacing-md);
}

.section__toggle {
  background: transparent;
  border: transparent;
  margin-top: 0;
  margin-bottom: 0;
  min-width: max-content;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  transition: background-color var(--transition-sm);
  padding: var(--spacing-sm);
  cursor: pointer;
  background-color: var(--color-brand-500);

  &:hover {
    background-color: var(--color-brand-600);
  }

  &:focus-visible {
    background-color: var(--color-brand-700);
    outline: none;
  }
}

.section__icon {
  margin-right: var(--spacing-sm);
}

.section__caret {
  margin-left: auto;
}

ul {
  margin: var(--spacing-sm) 0 0;
  padding: 0;
}

a {
  display: block;
  color: inherit;
  text-decoration: none;
  width: max-content;
  margin-bottom: var(--spacing-xs);
  width: 100%;
  padding: var(--spacing-xs);
  padding-left: var(--spacing-lg);
  &:hover,
  &:focus-visible {
    outline: none;
    background-color: var(--color-brand-300);
  }
}
</style>

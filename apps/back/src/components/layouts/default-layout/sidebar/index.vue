<script>
export default { name: 'DefaultLayoutSidebar' };
</script>

<script setup>
import { computed, ref, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { vReadableColor } from '@dsp/ui';
import { useCurrentUser, useAppContext, isFunction } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { MENU } from '@/utils/constants';

const { t } = useI18n();
const { data: currentUser } = useCurrentUser();
const context = useAppContext();
const containerEl = ref(null);

const allowedSections = computed(() =>
  MENU.filter(section =>
    section.permissions.some(permission =>
      currentUser.value.hasRole(permission)
    )
  ).filter(section => context.features[section.id].isEnabled)
);

const openedSections = ref([]);
const isSectionOpened = sectionName =>
  openedSections.value.includes(sectionName);

const toggleSection = sectionName => {
  if (isSectionOpened(sectionName)) {
    openedSections.value.splice(openedSections.value.indexOf(sectionName), 1);
  } else {
    openedSections.value.push(sectionName);
  }
};

const breadcrumbs = useBreadCrumbs();
const onLinkClick = () => {
  breadcrumbs.reset();
  nextTick(() => {
    document.activeElement.blur();
  });
};

const getEnabledLinks = links =>
  links
    .filter(link => !isFunction(link.isEnabled) || link.isEnabled(context))
    .filter(link => currentUser.value.hasRoles(...(link.permissions || [])));

const onmouseleave = () => {
  if (containerEl.value.contains(document.activeElement)) {
    document.activeElement.blur();
  }
};
</script>

<template>
  <aside ref="containerEl" v-readable-color @mouseleave="onmouseleave">
    <nav role="navigation">
      <dsp-flex
        v-for="section in allowedSections"
        :key="section.id"
        as="section"
        direction="column"
      >
        <dsp-flex
          v-readable-color
          as="button"
          align="center"
          class="section__toggle"
          @click="toggleSection(section.id)"
        >
          <dsp-icon
            :icon="section.icon"
            as="span"
            is-inline
            class="section__icon"
          />
          <span class="section__name">
            {{ t(`menu.sections.${section.id}`) }}
          </span>
          <dsp-icon icon="caretDown" class="section__caret" />
        </dsp-flex>
        <ul v-if="isSectionOpened(section.id)" class="section-list">
          <li v-for="link in getEnabledLinks(section.links)" :key="link.label">
            <component
              :is="link.isWIP ? 'span' : 'router-link'"
              v-readable-color
              :to="link.target"
              class="menu-item"
              @click="onLinkClick"
            >
              {{ t(`menu.links.${link.id}`) }}
              <span v-if="link.isWIP">Soon !</span>
            </component>
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
  max-height: 100vh;
  position: sticky;
  top: 0;

  &:hover,
  &:focus-within {
    transition-delay: 100ms;
    width: 320px; // @FIXME how to keep transition with auto width ?
  }

  &:not(:hover):not(:focus-within) {
    ul {
      display: none;
    }
    ul,
    .section__name,
    .section__caret {
      visibility: hidden;
    }
    .section__toggle {
      background-color: transparent;
    }
  }
}

section {
  margin-bottom: var(--spacing-md);
}

.section__toggle {
  border: transparent;
  margin-top: 0;
  margin-bottom: 0;
  min-width: max-content;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  transition: background-color var(--transition-sm);
  padding: var(--spacing-sm);
  padding-left: 0;
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

.menu-item {
  display: flex;
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

.menu-item:not(a) span {
  color: var(--color-brand-200);
  font-weight: var(--font-weight-bold);
  margin-left: auto;
}
</style>

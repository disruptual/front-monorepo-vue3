<script>
export default { name: 'HeaderMenu' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCurrentUser, useAppContext, isFunction } from '@dsp/core';
import { useReadableColor } from '@dsp/ui';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { MENU } from '@/utils/constants';

const isOpened = ref(false);
const search = ref('');

const { t } = useI18n();
const { data: currentUser } = useCurrentUser();
const breadcrumbs = useBreadCrumbs();
const context = useAppContext();

const allowedSections = computed(() =>
  MENU.filter(section =>
    section.permissions.some(permission =>
      currentUser.value.hasRole(permission)
    )
  ).filter(section => context.features[section.id].isEnabled)
);

const displayedLinksForSection = section =>
  section.links
    .filter(link => !isFunction(link.isEnabled) || link.isEnabled(context))
    .filter(link =>
      t(`menu.links.${link.id}`).includes(search.value.toLowerCase())
    );

const onLinkClick = () => {
  isOpened.value = false;
  breadcrumbs.reset();
};

const focusedTextColor = useReadableColor('--color-brand-500');
</script>

<template>
  <dsp-plain-button @click="isOpened = true">
    <dsp-icon size="lg" icon="bars" />
  </dsp-plain-button>
  <dsp-drawer
    v-model:isOpened="isOpened"
    class="header-menu"
    @close="isOpened = false"
  >
    <nav class="content">
      <dsp-flex justify="space-between" align="center" as="header">
        <h2>Menu</h2>
        <dsp-input-search class="search" @input="search = $event" />
        <dsp-icon-button
          class="close-button"
          icon="remove"
          is-plain
          size="lg"
          @click="isOpened = false"
        />
      </dsp-flex>

      <dsp-flex
        v-for="section in allowedSections"
        :key="section.id"
        as="section"
        direction="column"
      >
        <h3>{{ t(`menu.sections.${section.id}`) }}</h3>

        <ul class="section-list">
          <li v-for="link in displayedLinksForSection(section)" :key="link.id">
            <router-link
              v-show="!link.isWIP"
              :to="link.target"
              class="menu-item"
              @click="onLinkClick"
            >
              {{ t(`menu.links.${link.id}`) }}
            </router-link>
          </li>
        </ul>
      </dsp-flex>
    </nav>
  </dsp-drawer>
</template>

<style lang="scss" scoped>
.header-menu :deep(.dropdown-toggle) {
  padding-left: 0;
  padding-right: 0;
}

header {
  padding: var(--spacing-sm);
  h2 {
    margin: 0;
  }

  @include mobile-only {
    .close-button {
      order: 2;
    }

    .search {
      order: 3;
    }
  }
}

.content {
  overflow: auto;
  --cell-size: 7em;
  @include mobile-only {
    width: 100%;
    --cell-size: 6em;
  }
}

.menu-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border: solid 1px var(--color-brand-500);
  border-radius: var(--border-radius-md);
  background-color: var(--color-brand-100);
  padding: var(--spacing-xs);
  text-decoration: none;
  color: inherit;
  font-size: var(--font-size-sm);
  hyphens: auto;
  text-align: right;

  &:hover {
    background-color: var(--color-brand-200);
  }

  &:focus {
    outline: none;
    background-color: var(--color-brand-500);
    color: v-bind(focusedTextColor);
  }
}

section {
  padding: var(--spacing-sm);
}

.section-list {
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, var(--cell-size));
  grid-auto-rows: var(--cell-size);
  gap: var(--spacing-sm);

  @include mobile-only {
    grid-template-columns: repeat(3, var(--cell-size));
    place-content: center;
  }
}
</style>

<script>
export default { name: 'HeaderMenu' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { useCurrentUser } from '@dsp/core';
import { USER_ROLES } from '@dsp/business';
import { useReadableColor } from '@dsp/ui';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

const isOpened = ref(false);
const search = ref('');

const { data: currentUser } = useCurrentUser();
const breadcrumbs = useBreadCrumbs();

const sections = [
  {
    name: 'Administration',
    permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
    links: [
      { target: { name: 'AdminItems' }, label: 'Annonces' },
      { target: { name: 'AdminUsers' }, label: 'Utilisateurs' },
      { target: '/', label: 'Commandes' },
      { target: '/', label: 'Support client' },
      { target: '/', label: 'Mails' }
    ]
  },
  {
    name: 'Interface Magasin',
    permissions: [
      USER_ROLES.ADMIN,
      USER_ROLES.PROJECT_MANAGER,
      USER_ROLES.STORE
    ],
    links: [
      { target: '/', label: 'Dépôt / retrait' },
      { target: '/', label: 'Rechercher un utilisateur' },
      { target: '/', label: 'Gestion des stocks' }
    ]
  },
  {
    name: 'Interface Evenements',
    permissions: [
      USER_ROLES.ADMIN,
      USER_ROLES.PROJECT_MANAGER,
      USER_ROLES.EVENT_MANAGER
    ],
    links: [
      { target: '/', label: 'Dépôt' },
      { target: '/', label: 'Vente' }
    ]
  }
];

const allowedSections = computed(() =>
  sections.filter(section =>
    section.permissions.some(permission =>
      currentUser.value.hasRole(permission)
    )
  )
);

const displayedLinksForSection = section =>
  section.links.filter(link =>
    link.label.toLowerCase().includes(search.value.toLowerCase())
  );

const onLinkClick = () => {
  isOpened.value = false;
  breadcrumbs.reset();
};

const focusedTextColor = useReadableColor('--color-brand-500');
</script>

<template>
  <dsp-dropdown v-model:isOpened="isOpened" class="header-menu" as="div">
    <template #toggle>
      <dsp-icon size="lg" icon="bars" />
    </template>

    <template #menu>
      <nav class="content">
        <dsp-flex justify="space-between" align="center" as="header">
          <h2>Menu</h2>
          <dsp-input-search @input="search = $event" />
        </dsp-flex>

        <dsp-flex
          v-for="section in allowedSections"
          :key="section.name"
          as="section"
          direction="column"
        >
          <h3>{{ section.name }}</h3>
          <ul class="section-list">
            <li
              v-for="link in displayedLinksForSection(section)"
              :key="link.label"
            >
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
    </template>
  </dsp-dropdown>
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
}

.content {
  max-height: 450px;
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

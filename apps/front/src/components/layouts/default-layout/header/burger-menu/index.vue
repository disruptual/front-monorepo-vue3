<script>
export default { name: 'HeaderBurgerMenu' };
</script>
<script setup>
import { ref, computed } from 'vue';
import {
  useCategoryApi,
  useCurrentUser,
  useAuth,
  useAppContext
} from '@dsp/core';
import schema from './index.schema';

const props = defineProps(schema.toProps());
const componentContext = schema.toContext(props);

const context = useAppContext();
const { logout } = useAuth();
const { data: currentUser } = useCurrentUser();
const { data: categories } = useCategoryApi().findAllQuery();
const rootCategories = computed(() => categories.value?.filter(c => !c.parent));

const isOpened = ref(false);

const onLogoutClick = () => {
  logout();
  isOpened.value = false;
};
</script>

<template>
  <dsp-icon-button icon="bars" size="lg" is-plain @click="isOpened = true" />
  <dsp-drawer :is-opened="isOpened" @close="isOpened = false">
    <dsp-flex justify="space-between" as="header">
      <h2>
        <img v-if="componentContext.hasLogo" :src="context.logo" />
        <span v-else>Menu</span>
      </h2>
      <dsp-drawer-close-button />
    </dsp-flex>

    <div class="burger-menu__content">
      <dsp-center v-if="!currentUser" gap="sm" class="actions-wrapper">
        <dsp-button
          is-outlined
          is-full-width
          :to="{ name: 'Login' }"
          @click="isOpened = false"
        >
          Connexion / Inscription
        </dsp-button>
      </dsp-center>

      <ul v-if="rootCategories" class="burger-menu__categories">
        <dsp-flex
          v-for="category in rootCategories"
          :key="category.id"
          as="li"
          gap="sm"
          align="center"
        >
          <img v-if="category.picto" :src="category.picto" />
          <span>{{ category.name }}</span>
        </dsp-flex>
      </ul>

      <dsp-plain-button
        :to="{ name: 'Home' }"
        class="burger-menu__logout-button"
        @click="onLogoutClick"
      >
        <dsp-flex gap="sm" align="center">
          <dsp-icon icon="logout" />
          Se déconnecter
        </dsp-flex>
      </dsp-plain-button>
    </div>
  </dsp-drawer>
</template>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  background: var(--color-surface);
  border-bottom: solid 1px var(--color-gray-100);
}

h2 {
  margin-left: var(--spacing-sm);

  > img {
    display: block;
    height: 1.5em;
  }
}

.burger-menu__categories {
  margin-bottom: 0;

  li {
    padding: var(--spacing-sm) 0;

    > img {
      width: 1em;
      aspect-ratio: 1;
      object-fit: cover;
    }
  }
}

.burger-menu__content {
  padding: 0 var(--spacing-sm);
}

.burger-menu__logout-button {
  display: block;
  padding-left: 0;
  font-size: var(--font-size-lg);
}
</style>

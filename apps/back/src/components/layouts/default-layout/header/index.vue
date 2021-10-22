<script>
export default { name: 'DefaultLayoutHeader' };
</script>

<script setup>
import { ref } from 'vue';
import { useCurrentUser } from '@dsp/core';
import HeaderMenu from './header-menu/index.vue';
import HeaderBreadcrumbs from './header-breadcrumbs/index.vue';
import UserMenu from '@/components/user-menu/index.vue';

const { data: currentUser } = useCurrentUser();

const isUserMenuOpened = ref(false);
</script>

<template>
  <div>
    <dsp-flex justify="space-between" align="center" class="header">
      <dsp-flex gap="sm">
        <HeaderMenu />
        <router-link :to="{ name: 'Home' }" class="logo">
          <h1>DISRUPTUAL</h1>
        </router-link>
      </dsp-flex>
      <dsp-flex gap="sm" as="ul" align="center">
        <li v-if="currentUser">
          <dsp-plain-button
            class="avatar"
            @click="isUserMenuOpened = !isUserMenuOpened"
          >
            <dsp-avatar :user="currentUser" />
          </dsp-plain-button>

          <UserMenu v-model="isUserMenuOpened" />
        </li>
      </dsp-flex>
    </dsp-flex>
    <HeaderBreadcrumbs class="breadcrumbs" />
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--color-surface);
  padding: var(--spacing-sm) var(--spacing-xl);

  @include mobile-only {
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}

.menu {
  justify-self: end;
}

.logo {
  height: 50px;
  justify-self: center;
}

.logo {
  letter-spacing: 10px;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  > h1 {
    font-weight: var(--font-weight-light);
    margin: 0;

    @include mobile-only {
      font-size: var(--font-size-md);
    }
  }
}

.breadcrumbs {
  padding: 0 var(--spacing-xl);
  @include mobile-only {
    padding: 0;
  }
}

.avatar {
  padding: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: center;
  }
}
</style>

<script>
export default { name: 'DefaultLayoutHeader' };
</script>

<script setup>
import { ref } from 'vue';
import { useCurrentUser } from '@dsp/core';
import { useDevice } from '@dsp/ui';
import HeaderMenu from './header-menu/index.vue';
import HeaderBreadcrumbs from './header-breadcrumbs/index.vue';
import UserMenu from '@/components/user-menu/index.vue';

const { data: currentUser } = useCurrentUser();
const device = useDevice();

const isUserMenuOpened = ref(false);
</script>

<template>
  <header>
    <dsp-flex justify="space-between" align="center" class="header" gap="sm">
      <HeaderMenu v-if="device.isMobile" />
      <router-link :to="{ name: 'Home' }" class="logo">
        <h1>DISRUPTUAL</h1>
      </router-link>
      <dsp-plain-button
        class="avatar"
        @click="isUserMenuOpened = !isUserMenuOpened"
      >
        <dsp-avatar :user="currentUser" />
      </dsp-plain-button>

      <UserMenu v-model="isUserMenuOpened" />
    </dsp-flex>
    <HeaderBreadcrumbs class="breadcrumbs" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--color-surface);
  padding: var(--spacing-sm) var(--spacing-xl) var(--spacing-sm)
    var(--spacing-md);

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
  padding: 0;
}

.avatar {
  padding: 0;
  margin-left: auto;
}
</style>

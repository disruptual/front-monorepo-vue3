<script>
export default { name: 'DefaultLayoutHeader' };
</script>

<script setup>
import { useI18n } from 'vue-i18n';
import { useAppContext } from '@dsp/core';
import { useDevice } from '@dsp/ui';
import HeaderMenu from './header-menu/index.vue';
import HeaderBreadcrumbs from './header-breadcrumbs/index.vue';
import UserMenu from '@/components/user-menu/index.vue';
import schema from './index.schema';

const props = defineProps(schema.toProps());

const device = useDevice();

const { t } = useI18n();

const context = useAppContext();
const componentContext = schema.toContext(props);
</script>

<template>
  <header>
    <dsp-flex justify="space-between" align="center" class="header" gap="sm">
      <HeaderMenu v-if="device.isMobile" />
      <router-link :to="{ name: 'Home' }" class="logo">
        <h1>
          <img v-if="componentContext.isLogoDisplayed" :src="context.logo" />
          <span v-else>
            {{ t('platformName') }}
          </span>
        </h1>
      </router-link>
      <div class="menu">
        <UserMenu />
      </div>
    </dsp-flex>
    <HeaderBreadcrumbs class="breadcrumbs" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--color-surface);
  padding: var(--spacing-sm) var(--spacing-md);

  @include mobile-only {
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}

.menu {
  display: grid;
  > * {
    grid-column: 1;
    grid-row: 1;
  }
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

    > img {
      display: block;
      height: 1.5em;
    }
  }
}

.breadcrumbs {
  padding: 0;
}
</style>

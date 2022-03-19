<script>
export default { name: 'DefaultLayoutHeader' };
</script>
<script setup>
import { ref } from 'vue';
import { throttle } from 'lodash-es';
import { useDevice, vReadableColor, useEventListener } from '@dsp/ui';
import HeaderMenu from './menu/index.vue';
import HeaderSearchBar from './search-bar/index.vue';
import BurgerMenu from './burger-menu/index.vue';
import HeaderAnnouncement from './announcement/index.vue';
import HeaderCategoriesNav from './categories-nav/index.vue';

const device = useDevice();
const announcementOffset = ref(0);
const isAnnouncementClosing = ref(false);

const onAnnouncementClose = element => {
  isAnnouncementClosing.value = true;
  const { height } = element.getBoundingClientRect();
  announcementOffset.value = `${-1 * height}px`;
};
const onAnnouncementCloseEnd = () => {
  isAnnouncementClosing.value = false;
  announcementOffset.value = 0;
};

const isCollapsed = ref(false);
let scrollY = window.scrollY;
useEventListener(
  'scroll',
  throttle(e => {
    isCollapsed.value = window.scrollY > scrollY;
    scrollY = window.scrollY;
  }, 250)
);
</script>

<template>
  <dsp-slide-transition
    direction="vertical"
    distance="-100%"
    @leave="onAnnouncementClose"
    @after-leave="onAnnouncementCloseEnd"
  >
    <HeaderAnnouncement />
  </dsp-slide-transition>
  <header
    class="header"
    :class="isAnnouncementClosing && 'header--is-closing'"
    justify="space-around"
    align="center"
  >
    <HeaderSearchBar v-if="device.isDesktop" class="header-search-bar" />
    <dsp-flex v-else><BurgerMenu /></dsp-flex>
    <router-link :to="{ name: 'Home' }" class="logo">
      <h1 v-readable-color>DISRUPTUAL</h1>
    </router-link>
    <HeaderMenu class="menu" />
  </header>
  <HeaderSearchBar v-if="!device.isDesktop" />
  <div v-else class="header__categories-nav-wrapper">
    <dsp-slide-transition direction="vertical" distance="-100%">
      <HeaderCategoriesNav v-if="!isCollapsed" />
    </dsp-slide-transition>
  </div>
</template>

<style lang="scss" scoped>
.header {
  margin-top: v-bind(announcementOffset);
  background-color: var(--color-surface);
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: var(--spacing-xs) 0;

  @include desktop-only {
    padding: var(--spacing-sm) var(--spacing-xl);
  }
}

.header--is-closing {
  transition: margin 600ms;
}

.menu {
  justify-self: end;
}

.logo {
  height: 50px;
  justify-self: center;
}

.header-search-bar {
  max-width: 18em;
}

.logo {
  letter-spacing: 10px;
  text-decoration: none;
  color: var(--color-text);
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

.header__categories-nav-wrapper {
  overflow: hidden;
}
</style>

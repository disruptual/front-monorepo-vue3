<script>
export default { name: 'HeaderMenu' };
</script>
<script setup>
import { ref } from 'vue';
import { useCurrentUser } from '@dsp/core';
import { useDevice } from '@dsp/ui';
import UserMenu from '@/components/user/menu/index.vue';
import NotificationsDropdown from '@/components/notification/dropdown/index.vue';

const device = useDevice();

const { data: currentUser } = useCurrentUser();

const isUserMenuOpened = ref(false);
const toggleUserMenu = () => {
  isUserMenuOpened.value = !isUserMenuOpened.value;
};
</script>

<template>
  <nav class="header-menu">
    <dsp-flex as="ul" align="center">
      <li v-if="!device.isMobile">
        <dsp-button :to="{ name: 'ItemCreation' }">Vendre</dsp-button>
      </li>
      <li v-if="device.isDesktop && currentUser">
        <NotificationsDropdown />
      </li>
      <li v-if="device.isDesktop && currentUser">
        <dsp-icon-button
          :to="{ name: 'Cart' }"
          icon="cart"
          is-plain
          size="lg"
          aria-label="panier"
        />
      </li>
      <li v-if="currentUser">
        <UserMenu v-model="isUserMenuOpened">
          <dsp-avatar :user="currentUser" />
        </UserMenu>
      </li>
      <li v-else>
        <dsp-icon-button
          icon="user"
          size="lg"
          :to="{ name: 'Login' }"
          is-plain
          aria-label="login"
        />
      </li>
    </dsp-flex>
  </nav>
</template>

<style lang="scss" scoped>
.header-menu {
  width: 100%;
  .dsp-icon-button {
    padding: 0;
  }
}

ul {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: center;

    &:first-child {
      margin: 0 auto;
    }
  }
}
</style>

<script>
export default { name: 'HeaderMenu' };
</script>
<script setup>
import { ref } from 'vue';
import { useCurrentUser } from '@dsp/core';
import { useDevice } from '@dsp/ui';
import UserMenu from '@/components/user-menu/index.vue';

const device = useDevice();

const { data: currentUser } = useCurrentUser();

const isUserMenuOpened = ref(false);
</script>

<template>
  <nav class="header-menu">
    <dsp-flex gap="sm" as="ul" align="center">
      <li v-if="device.isDesktop">
        <dsp-icon-button
          :to="{ name: 'Home' }"
          icon="home"
          is-plain
          size="lg"
        />
      </li>
      <li v-if="currentUser">
        <dsp-plain-button
          class="avatar"
          @click="isUserMenuOpened = !isUserMenuOpened"
        >
          <dsp-avatar :user="currentUser" />
        </dsp-plain-button>

        <UserMenu v-model="isUserMenuOpened" />
      </li>
      <li v-else>
        <dsp-icon-button
          icon="user"
          size="lg"
          :to="{ name: 'Login' }"
          is-plain
        />
      </li>
    </dsp-flex>
  </nav>
</template>

<style lang="scss" scoped>
.header-menu {
  button {
    padding: 0;
  }
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

.avatar {
  padding: 0;

  img {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    object-fit: cover;
  }
}
</style>

<script>
export default { name: 'UserMenu' };
</script>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@dsp/core';
import { useDevice } from '@dsp/ui';
import { useCurrentUser } from '@dsp/core';

const { data: currentUser } = useCurrentUser();
const toggleElement = ref(null);
const isOpened = ref(false);

const { logout } = useAuth();
const { push } = useRouter();
const device = useDevice();

const onLogout = async () => {
  push({ name: 'Login' });
  await logout();
};

const setToggle = el => {
  toggleElement.value = el;
};
</script>

<template>
  <dsp-plain-button
    :button-ref="setToggle"
    class="avatar"
    @click="isOpened = !isOpened"
  >
    <dsp-avatar :user="currentUser" />
  </dsp-plain-button>

  <dsp-drawer
    v-if="device.isMobile"
    :is-opened="isOpened"
    @close="isOpened = false"
  >
    <dsp-back-link label="Retour" @click="isOpened = false" />
    <dsp-flex direction="column">
      <dsp-plain-button class="drawer-item" @click="onLogout">
        Logout
      </dsp-plain-button>
    </dsp-flex>
  </dsp-drawer>

  <dsp-dropdown v-else v-model:isOpened="isOpened" :toggle-ref="toggleElement">
    <template #menu>
      <dsp-dropdown-item @click="onLogout">Logout</dsp-dropdown-item>
    </template>
  </dsp-dropdown>
</template>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.drawer-item {
  text-align: left;
}

.avatar {
  padding: 0;
  margin-left: auto;
  position: relative;
  z-index: 1;
}
</style>

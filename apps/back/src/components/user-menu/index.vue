<script>
export default { name: 'UserMenu' };
</script>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@dsp/core';
import { useDevice } from '@dsp/ui';

const props = defineProps({
  modelValue: { type: Boolean, required: true }
});
const emit = defineEmits(['update:modelValue']);

const { logout } = useAuth();
const { push } = useRouter();
const device = useDevice();

const onLogout = async () => {
  push({ name: 'Login' });
  await logout();
};

const isOpened = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue');
  }
});
</script>

<template>
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

  <dsp-dropdown v-else v-model:isOpened="isOpened">
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
</style>

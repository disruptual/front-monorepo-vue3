<script async setup>
import { ref } from 'vue';
import {
  ON_TOKEN_UPDATE,
  ON_AUTH_READY
} from '@dsp/core/services/auth.service';
import { useAuth } from '@dsp/core/hooks';

const isLoading = ref(true);

const auth = useAuth();

const onAuthStatusChange = () => {
  isLoading.value = false;
};
auth.on(ON_TOKEN_UPDATE, onAuthStatusChange);
auth.on(ON_AUTH_READY, onAuthStatusChange);
</script>

<template>
  <slot v-if="isLoading" name="loading" />
  <slot v-else />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import LoginForm from '@/components/login-form/index.vue';

const { push } = useRouter();
const route = useRoute();

const onSuccess = () => {
  if (route.query.from) {
    push(route.query.from);
  } else {
    push({ name: 'Home' });
  }
};
</script>

<template>
  <dsp-center class="login-page">
    <dsp-container is-small>
      <dsp-surface>
        <h1>Connexion</h1>
        <LoginForm @success="onSuccess" />
      </dsp-surface>
    </dsp-container>
  </dsp-center>
</template>

<style scoped>
.login-page {
  height: 100%;
}
</style>

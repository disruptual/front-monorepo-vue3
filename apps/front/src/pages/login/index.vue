<script setup>
import { useRouter, useRoute } from 'vue-router';
import LoginForm from '@/components/user/login-form/index.vue';

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
  <dsp-section></dsp-section>
  <dsp-center class="login-page">
    <dsp-container is-small>
      <dsp-surface>
        <dsp-section-heading class="login-page__heading">
          Connexion
        </dsp-section-heading>
        <LoginForm @success="onSuccess" />
      </dsp-surface>
    </dsp-container>
  </dsp-center>
</template>

<style scoped>
.login-page {
  height: 100%;
}

.login-page__heading {
  margin: 0;
}
</style>

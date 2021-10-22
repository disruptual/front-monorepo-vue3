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
  <div class="login-page">
    <dsp-container is-small>
      <dsp-surface class="content">
        <h1>Connexion</h1>
        <LoginForm @success="onSuccess" />
      </dsp-surface>
    </dsp-container>
  </div>
</template>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
}

h1 {
  text-align: center;
  margin: 0;
}

.content {
  padding: var(--spacing-xl);
}
</style>

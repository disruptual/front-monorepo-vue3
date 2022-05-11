<script setup>
import { useRoute, useRouter } from 'vue-router';
import SignUpForm from '@/components/user/sign-up-form/index.vue';

const route = useRoute();
const { push } = useRouter();

const onSuccess = () => {
  push({ name: 'Home' });
};
</script>

<template>
  <dsp-section>
    <dsp-container is-small class="sign-up-page">
      <dsp-surface>
        <dsp-section-heading class="sign-up-page__heading">
          Inscription
        </dsp-section-heading>
        <SignUpForm :email="route.query.email" @success="onSuccess" />
      </dsp-surface>
    </dsp-container>
  </dsp-section>
</template>

<style lang="scss" scoped>
.sign-up-page {
  margin-top: var(--spacing-md);
}

.sign-up-page__heading {
  margin: 0;
  margin-bottom: var(--spacing-md);
}
</style>

<script setup>
import SignUpForm from '@/components/user/sign-up-form/index.vue';
</script>

<template>
  <dsp-section>
    <dsp-container is-small class="sign-up-page">
      <dsp-surface>
        <dsp-section-heading class="sign-up-page__heading">
          Inscription
        </dsp-section-heading>
        <SignUpForm />
      </dsp-surface>
    </dsp-container>
  </dsp-section>
</template>

<style scoped>
.sign-up-page {
  margin-top: var(--spacing-md);
}

.sign-up-page__heading {
  margin: 0;
}
</style>

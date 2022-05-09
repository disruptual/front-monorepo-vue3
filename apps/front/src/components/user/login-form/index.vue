<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuth, useUserApi } from '@dsp/core';
import { VALIDATION_MODES } from '@dsp/ui';

const emit = defineEmits(['success']);
const { t } = useI18n();
const { push } = useRouter();
const { login, authenticate } = useAuth();
const { checkUserExistsMutation } = useUserApi();
const { mutateAsync: checkUserExists } = checkUserExistsMutation();

const submitError = ref(null);

const onSubmit = async values => {
  await login(values);
  await authenticate();
  emit('success');
};

const formOptions = {
  onSubmit,
  async onError(error, values) {
    try {
      console.error(error);
      await checkUserExists(values.username);
      submitError.value = t('loginForm.error');
    } catch {
      push({ name: 'SignUp', query: { email: values.username } });
    }
  },
  mode: VALIDATION_MODES.ON_BLUR
};
</script>

<template>
  <dsp-smart-form :form-options="formOptions">
    <dsp-smart-form-field v-slot="slotProps" name="username" required email>
      <dsp-form-control
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Email"
      />
    </dsp-smart-form-field>

    <dsp-smart-form-field v-slot="slotProps" name="password" required>
      <dsp-form-control
        v-slot="{ on, ...formControlProps }"
        v-model="slotProps.field.value"
        label="Mot de passe"
        v-bind="slotProps"
      >
        <dsp-input-password
          v-model="slotProps.field.value"
          v-bind="formControlProps"
          v-on="on"
        />
      </dsp-form-control>
    </dsp-smart-form-field>

    <dsp-flex direction="row-reverse" justify="space-between">
      <dsp-smart-form-submit>Se connecter</dsp-smart-form-submit>
      <dsp-plain-button :to="{ name: 'SignUp' }">
        Je n'ai pas de compte
      </dsp-plain-button>
      <dsp-form-error :error="submitError" class="submit-error" />
    </dsp-flex>
  </dsp-smart-form>
</template>

<style scoped lang="scss">
.submit-error {
  margin-top: var(--spacing-sm);
}
</style>

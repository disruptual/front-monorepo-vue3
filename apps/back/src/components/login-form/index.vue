<script setup>
import { ref } from 'vue';
import { useAuth } from '@dsp/core';
import { VALIDATION_MODES } from '@dsp/ui';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['success']);
const { t } = useI18n();
const { login, authenticate } = useAuth();

const submitError = ref(null);

const formOptions = {
  async onSubmit(values) {
    console.log(values);
    await login(values);
    await authenticate();
    emit('success');
  },
  onError(error) {
    console.log(error.response);
    const status = error.response?.status ?? 'generic';
    submitError.value = t(`login.error.${status}`);
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
        <dsp-input-password v-bind="formControlProps" v-on="on" />
      </dsp-form-control>
    </dsp-smart-form-field>

    <dsp-flex direction="row-reverse" justify="space-between">
      <dsp-smart-form-submit>Submit</dsp-smart-form-submit>
    </dsp-flex>

    <dsp-form-error :error="submitError" class="submit-error" />
  </dsp-smart-form>
</template>

<style scoped lang="scss">
.submit-error {
  margin-top: var(--spacing-sm);
}
</style>

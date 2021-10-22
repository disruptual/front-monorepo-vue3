<script setup>
import { useAuth } from '@dsp/core/hooks';
import { VALIDATION_MODES } from '@dsp/ui';

const emit = defineEmits(['success']);
const { login, authenticate } = useAuth();

const onSubmit = async values => {
  await login(values);
  await authenticate();
  emit('success');
};

const formOptions = {
  onSubmit,
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
        type="password"
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
      <dsp-smart-form-submit>Submit</dsp-smart-form-submit>
      <dsp-plain-button type="button">Je n'ai pas de compte</dsp-plain-button>
    </dsp-flex>
  </dsp-smart-form>
</template>

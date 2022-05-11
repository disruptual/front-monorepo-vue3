<script>
export default { name: 'SignUpFormPassword' };
</script>

<script setup>
import { unref } from 'vue';
import { VALIDATION_MODES } from '@dsp/ui';
import { isDefined } from '@dsp/core';

const containsNumber = val => /[0-9]/.test(val);
const containsUppercase = val => /[A-Z]/.test(val);
const containsLowercase = val => /[a-z]/.test(val);

const passwordValidators = [
  {
    name: 'containsNumber',
    message: 'form.errors.containsNumber',
    handler(value) {
      return !isDefined(value) || containsNumber(value);
    }
  },
  {
    name: 'containsUppercase',
    message: 'form.errors.containsUppercase',
    handler(value) {
      return !isDefined(value) || containsUppercase(value);
    }
  },
  {
    name: 'containsLowercase',
    message: 'form.errors.containsLowercase',
    handler(value) {
      return !isDefined(value) || containsLowercase(value);
    }
  }
];

const passwordConfirmValidators = [
  {
    name: 'passwordMatch',
    message: 'form.errors.passwordMatch',
    handler(value, { formContext }) {
      const { values } = unref(formContext);
      if (!values.value.plainPassword) return true;

      return value === values.value.plainPassword;
    }
  }
];
</script>

<template>
  <dsp-smart-form-field
    v-slot="slotProps"
    name="plainPassword"
    :minlength="8"
    :validators="passwordValidators"
    :mode="VALIDATION_MODES.ON_INPUT"
    required
  >
    <dsp-form-control
      v-slot="formProps"
      v-model="slotProps.field.value"
      v-bind="slotProps"
      label="Mot de passe"
    >
      <dsp-input-password v-bind="formProps" v-on="formProps.on" />
    </dsp-form-control>
  </dsp-smart-form-field>

  <dsp-smart-form-field
    v-slot="slotProps"
    name="confirmedPassword"
    :validators="passwordConfirmValidators"
    :mode="VALIDATION_MODES.ON_INPUT"
  >
    <dsp-form-control
      v-slot="formProps"
      v-model="slotProps.field.value"
      v-bind="slotProps"
      label="Confirmez le mot de passe"
    >
      <dsp-input-password v-bind="formProps" v-on="formProps.on" />
    </dsp-form-control>
  </dsp-smart-form-field>
</template>

<style lang="scss" scoped>
.sign-up-form-password__hint {
  font-size: var(--font-size-sm);
  color: var(--color-success-500);
  margin-bottom: var(--spacing-xs);

  &.invalid {
    color: var(--color-error-500);
  }
}
</style>

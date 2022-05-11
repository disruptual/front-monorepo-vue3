<script>
export default { name: 'SignUpForm' };
</script>

<script setup>
import { unref } from 'vue';
import { useForm, VALIDATION_MODES } from '@dsp/ui';
import { useRoute } from 'vue-router';
import { USER_GENDERS } from '@dsp/business';
import { isDefined, useUserApi } from '@dsp/core';

const { checkUserExistsMutation } = useUserApi();

const form = useForm({
  onSubmit(values) {
    console.log(values);
  }
});

const route = useRoute();

const genders = [
  { label: 'Madame', value: USER_GENDERS.FEMALE },
  { label: 'Monsieur', value: USER_GENDERS.MALE }
];

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

const { mutateAsync: checkUsernameExists, isLoading: isCheckingUsername } =
  checkUserExistsMutation();
const usernameValidators = [
  {
    name: 'usernameExists',
    message: 'form.errors.usernameExists',
    handler: async value => {
      if (!value) return true;
      try {
        await checkUsernameExists(value);
        return false;
      } catch (err) {
        return err.response?.status === 404;
      }
    }
  }
];
</script>

<template>
  <dsp-smart-form :form="form">
    <dsp-smart-form-field v-slot="slotProps" name="gender" required>
      <dsp-form-control
        v-slot="formProps"
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Civilité"
      >
        <dsp-radio-group
          v-bind="formProps"
          :values="genders"
          row
          v-on="formProps.on"
        />
      </dsp-form-control>
    </dsp-smart-form-field>

    <dsp-smart-form-field v-slot="slotProps" name="lastName" required>
      <dsp-form-control
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Nom"
      />
    </dsp-smart-form-field>

    <dsp-smart-form-field v-slot="slotProps" name="firstName" required>
      <dsp-form-control
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Prénom"
      />
    </dsp-smart-form-field>

    <dsp-smart-form-field
      v-slot="slotProps"
      name="username"
      required
      :minlength="4"
      :maxlength="30"
      :validators="usernameValidators"
      :mode="VALIDATION_MODES.ON_INPUT"
      :debounce-timeout="250"
    >
      <dsp-form-control
        v-slot="formProps"
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Pseudo"
        hint="entre 4 et 30 caractères"
      >
        <dsp-input-text v-bind="formProps" v-on="formProps.on">
          <template #right-icon>
            <dsp-center class="sign-up-form__username-loader">
              <dsp-loader v-if="isCheckingUsername" />
            </dsp-center>
          </template>
        </dsp-input-text>
      </dsp-form-control>
    </dsp-smart-form-field>

    <dsp-smart-form-field
      v-slot="slotProps"
      name="email"
      required
      :initial-value="route.query.email"
    >
      <dsp-form-control
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Adresse e-mail"
      />
    </dsp-smart-form-field>

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

    <dsp-smart-form-submit is-full-width>Suivant</dsp-smart-form-submit>
  </dsp-smart-form>
</template>

<style lang="scss" scoped>
.sign-up-form__password-hint {
  font-size: var(--font-size-sm);
  color: var(--color-success-500);
  margin-bottom: var(--spacing-xs);

  &.invalid {
    color: var(--color-error-500);
  }
}

.sign-up-form__username-loader {
  padding: var(--spacing-xs);
}
</style>

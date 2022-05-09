<script>
export default { name: 'SignUpForm' };
</script>

<script setup>
import { unref } from 'vue';
import { useForm } from '@dsp/ui';
import { useRoute } from 'vue-router';
import { USER_GENDERS } from '@dsp/business';
import { isDefined } from '@dsp/core';

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

const passwordValidators = [
  {
    name: 'containsNumber',
    message: 'form.errors.containsNumber',
    handler(value) {
      return !isDefined(value) || /[0-9]/.test(value);
    }
  },
  {
    name: 'containsUppercase',
    message: 'form.errors.containsUppercase',
    handler(value) {
      return !isDefined(value) || /[A-Z]/.test(value);
    }
  },
  {
    name: 'containsLowercase',
    message: 'form.errors.containsLowercase',
    handler(value) {
      return !isDefined(value) || /[a-z]/.test(value);
    }
  }
];

const passwordConfirmValidators = [
  {
    name: 'passwordMatch',
    message: 'form.errors.passwordMatch',
    handler(value, { formContext }) {
      const { values } = unref(formContext);
      if (!values.plainPassword) return true;

      return value === values.value.plainPassword;
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
        <dsp-radio-group v-bind="formProps" :values="genders" row />
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
    >
      <dsp-form-control
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Pseudo"
        hint="entre 4 et 30 caractères"
      />
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
      required
    >
      <dsp-form-control
        v-slot="formProps"
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Mot de passe"
      >
        <dsp-input-password v-bind="formProps" />
      </dsp-form-control>
    </dsp-smart-form-field>

    <dsp-smart-form-field
      v-slot="slotProps"
      name="confirmedPassword"
      :validators="passwordValidators"
      required
    >
      <dsp-form-control
        v-slot="formProps"
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Confirmez le mot de passe"
      >
        <dsp-input-password v-bind="formProps" />
      </dsp-form-control>
    </dsp-smart-form-field>

    <dsp-smart-form-submit is-full-width>Suivant</dsp-smart-form-submit>
  </dsp-smart-form>
</template>

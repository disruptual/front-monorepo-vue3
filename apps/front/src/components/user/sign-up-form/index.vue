<script>
export default { name: 'SignUpForm' };
</script>

<script setup>
import { useForm } from '@dsp/ui';
import { useRoute } from 'vue-router';
import { USER_GENDERS } from '@dsp/business';

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
    <dsp-smart-form-submit is-full-width>Suivant</dsp-smart-form-submit>
  </dsp-smart-form>
</template>

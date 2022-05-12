<script>
export default { name: 'SignUpForm' };
</script>

<script setup>
import { useForm, useToast } from '@dsp/ui';
import { USER_GENDERS } from '@dsp/business';
import { useUserApi } from '@dsp/core';
import SignUpFormBirthday from './birthday/index.vue';
import SignUpFormPassword from './password/index.vue';
import SignUpFormUsername from './username/index.vue';
import SignUpFormOptins from './optins/index.vue';

const props = defineProps({
  email: { type: [String, null], default: null }
});
const emit = defineEmits(['success']);

const { createMutation } = useUserApi();
const { showError, showSuccess } = useToast();

const { mutate: createUser } = createMutation({
  onSuccess() {
    showSuccess('Inscription réussie !');
    emit('success');
  },

  onError(err) {
    console.error(err);
    showError("Une erreur s'est produite.");
  }
});

const form = useForm({
  onSubmit({ confirmedPassword, ...values }) {
    createUser(values);
  }
});

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
        <dsp-radio-group
          v-bind="formProps"
          :values="genders"
          row
          v-on="formProps.on"
        />
      </dsp-form-control>
    </dsp-smart-form-field>

    <dsp-smart-form-field
      v-slot="slotProps"
      name="lastName"
      :minlength="4"
      required
    >
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

    <SignUpFormUsername />

    <dsp-smart-form-field
      v-slot="slotProps"
      name="email"
      required
      :initial-value="props.email"
    >
      <dsp-form-control
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Adresse e-mail"
      />
    </dsp-smart-form-field>

    <dsp-smart-form-field v-slot="slotProps" name="birthday" required>
      <dsp-form-control
        v-slot="formProps"
        v-model="slotProps.field.value"
        v-bind="slotProps"
        label="Date de naissance"
      >
        <SignUpFormBirthday v-bind="formProps" v-on="formProps.on" />
      </dsp-form-control>
    </dsp-smart-form-field>

    <SignUpFormPassword />

    <dsp-flex direction="column" gap="sm">
      <SignUpFormOptins />
      <dsp-smart-form-submit is-full-width size="lg">
        Suivant
      </dsp-smart-form-submit>
    </dsp-flex>
  </dsp-smart-form>
</template>

<script>
export default { name: 'SignUpFormUsername' };
</script>

<script setup>
import { VALIDATION_MODES } from '@dsp/ui';
import { useUserApi } from '@dsp/core';

const { checkUserExistsMutation } = useUserApi();

const { mutateAsync, isLoading } = checkUserExistsMutation();
const usernameValidators = [
  {
    name: 'usernameExists',
    message: 'form.errors.usernameExists',
    handler: async value => {
      if (!value) return true;
      try {
        await mutateAsync(value);
        return false;
      } catch (err) {
        return err.response?.status === 404;
      }
    }
  }
];
</script>

<template>
  <dsp-smart-form-field
    v-slot="slotProps"
    name="username"
    required
    :minlength="4"
    :maxlength="30"
    :validators="usernameValidators"
    :mode="VALIDATION_MODES.ON_INPUT"
    :validation-debounce-timeout="250"
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
            <dsp-loader v-if="isLoading" />
            <dsp-icon
              v-else-if="slotProps.field.isValid"
              icon="checkboxLight"
              class="sign-up-form__username-valid-icon"
            />
          </dsp-center>
        </template>
      </dsp-input-text>
    </dsp-form-control>
  </dsp-smart-form-field>
</template>

<style lang="scss" scoped>
.sign-up-form-username__loader {
  padding: var(--spacing-xs);
}

.sign-up-form-username__valid-icon {
  color: var(--color-success-500);
}
</style>

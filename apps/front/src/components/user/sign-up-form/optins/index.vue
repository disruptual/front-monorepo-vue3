<script>
export default { name: 'SignUpFormOptins' };
</script>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <dsp-smart-form-field v-slot="slotProps" name="cguOptin" required>
    <dsp-checkbox
      v-model="slotProps.field.value"
      v-bind="slotProps"
      v-on="slotProps.field.listeners"
    >
      <i18n-t keypath="signUpFormOptins.cgu.label" scope="global">
        <template #link>
          <router-link
            :to="{
              name: 'Cms',
              params: { slug: 'conditions-generales-dutilisation' }
            }"
          >
            {{ t('signUpFormOptins.cgu.link') }}
          </router-link>
        </template>
      </i18n-t>
    </dsp-checkbox>
    <dsp-form-error
      v-for="(error, key) in slotProps.field?.errors"
      :key="key"
      :error="error"
    />
  </dsp-smart-form-field>

  <dsp-smart-form-field v-slot="slotProps" name="cguPSPOptin" required>
    <dsp-checkbox
      v-model="slotProps.field.value"
      v-bind="slotProps"
      v-on="slotProps.field.listeners"
    >
      <i18n-t keypath="signUpFormOptins.cguPSP.label" scope="global">
        <template #link>
          <a
            href="https://www.mangopay.com/terms/MANGOPAY_Terms-FR.pdf"
            target="__blank"
          >
            {{ t('signUpFormOptins.cguPSP.link') }}
          </a>
        </template>
      </i18n-t>
    </dsp-checkbox>
    <dsp-form-error
      v-for="(error, key) in slotProps.field?.errors"
      :key="key"
      :error="error"
    />
  </dsp-smart-form-field>
</template>

<style scoped>
a {
  text-decoration: underline;
}
</style>

<script>
export default { name: 'DspInputPassword' };
</script>

<script setup>
import { ref, computed } from 'vue';
const isPasswordDisplayed = ref(false);
const toggle = () => {
  isPasswordDisplayed.value = !isPasswordDisplayed.value;
};

const icon = computed(() => (isPasswordDisplayed.value ? 'eyeSlash' : 'eye'));
const type = computed(() => (isPasswordDisplayed.value ? 'text' : 'password'));
</script>

<template>
  <dsp-input-text v-bind="$attrs" :type="type">
    <template #right-icon>
      <dsp-plain-button type="button" @click="toggle">
        <dsp-icon :icon="icon" />
      </dsp-plain-button>
    </template>
  </dsp-input-text>
</template>

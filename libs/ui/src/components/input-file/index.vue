<script>
export default { name: 'DspInputFile' };
</script>
<script setup>
import { makeRandomId } from '@dsp/core';

defineProps({
  icon: { type: String, default: 'fileUpload' },
  label: { type: String, default: 'Choisissez un fichier' },
  accept: { type: String, default: '' }
});
defineEmits(['change']);

const id = makeRandomId(6);
const onClick = e => e.target.parentNode.click();
</script>

<template>
  <label :for="id">
    <slot name="button" :on-click="onClick">
      <dsp-button :left-icon="icon" type="button" @click="onClick">
        <span v-if="label">{{ label }}</span>
      </dsp-button>
    </slot>
    <dsp-visually-hidden>
      <input
        :id="id"
        type="file"
        class="visually-hidden"
        :accept="accept"
        @change="$emit('change', $event.target.files)"
      />
    </dsp-visually-hidden>
  </label>
</template>

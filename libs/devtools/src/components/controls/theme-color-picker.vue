<script setup>
import { computed } from 'vue';
import { useThemeService, getCssVarValue } from '@dsp/ui';

const props = defineProps({
  modelValue: { type: [String, Number], default: null }
});
const emit = defineEmits(['update:modelValue']);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    const cssVal = getCssVarValue(`--color-${val}`);
    if (!cssVal) return;

    emit('update:modelValue', val);
  }
});
const themeService = useThemeService();
</script>

<template>
  <dsp-input-text
    v-model="model"
    :list="`colors-${$attrs.id}`"
    v-bind="$attrs"
    name="ice-cream-choice"
  />

  <datalist :id="`colors-${$attrs.id}`">
    <template
      v-for="(palette, paletteName) in themeService.theme.palettes"
      :key="paletteName"
    >
      <option
        v-for="i in 9"
        :key="i"
        class="color-square"
        :value="`${paletteName}-${i}00`"
      >
        {{ paletteName }}-{{ i }}00
      </option>
    </template>
  </datalist>
</template>

<style lang="scss" scoped></style>

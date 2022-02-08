<script setup>
import { useTheme, useThemeService, vReadableColor } from '@dsp/ui';

const themeService = useThemeService();
</script>
<template>
  <dsp-grid
    v-for="(color, name) in themeService.theme.palettes"
    :key="color"
    :columns="10"
    class="palette"
  >
    <div>{{ name }}</div>
    <dsp-center
      v-for="i in 9"
      :key="i"
      v-readable-color
      class="color-square"
      :style="{ '--bg': `var(--color-${name}-${i}00)` }"
    >
      {{ i }}00
    </dsp-center>
  </dsp-grid>
</template>

<style lang="scss" scoped>
.palette {
  margin-bottom: var(--spacing-sm);
}
.color-square {
  width: 2.5rem;
  aspect-ratio: 1;
  background-color: var(--bg, white);
}
</style>

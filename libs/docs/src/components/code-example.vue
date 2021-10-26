<script setup>
import { ref, computed } from 'vue';

const activePanel = ref('preview');

const isPreview = computed(() => activePanel.value === 'preview');
const isHtml = computed(() => activePanel.value === 'html');
const isJs = computed(() => activePanel.value === 'js');
</script>

<template>
  <dsp-surface class="code-example">
    <dsp-flex class="toolbar" gap="md" justify="flex-end">
      <dsp-plain-button
        @click="activePanel = 'preview'"
        :class="isPreview && 'active'"
      >
        Preview
      </dsp-plain-button>
      <dsp-plain-button
        @click="activePanel = 'html'"
        :class="isHtml && 'active'"
      >
        HTML
      </dsp-plain-button>
      <dsp-plain-button @click="activePanel = 'js'" :class="isJs && 'active'">
        JS
      </dsp-plain-button>
    </dsp-flex>

    <dsp-surface v-if="activePanel === 'preview'">
      <slot>Ce composant ne possède pas de preview.</slot>
    </dsp-surface>

    <div v-if="activePanel === 'html'">
      <slot name="html">Cet example ne possède pas de HTML.</slot>
    </div>

    <div v-if="activePanel === 'js'">
      <slot name="js">Cet example ne possède pas de JS.</slot>
    </div>
  </dsp-surface>
</template>

<style lang="scss" scoped>
.code-example {
  border: solid 1px var(--color-separator);
}

.toolbar {
  --color-brand-100: var(--c-bg-accent);
  --color-primary: var(--c-brand);
  padding: var(--spacing-sm);
  border-bottom: solid 1px var(--color-separator);
}

.active {
  border-bottom: solid 1px var(--c-brand);
}
</style>

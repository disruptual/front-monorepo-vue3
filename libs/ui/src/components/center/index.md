<script setup>
import { ref } from 'vue';
import component from './index.vue'
</script>

# Center

[[toc]]

## Description

Description BackLink

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<dsp-center>My content</dsp-center>
<template v-slot:html>

```html
<dsp-back-link label="Retour">
  <dsp-center>My content</dsp-center>
</dsp-back-link>
```

</template>
</code-example>

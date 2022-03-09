<script setup>
import { ref } from 'vue';
import component from './index.vue'
</script>

# BackLink

[[toc]]

## Description

Description BackLink

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<dsp-back-link label="Retour"><div>My custom content</div></dsp-back-link>
<template v-slot:html>

```html
<dsp-back-link label="Retour">
  <div>My custom content</div>
</dsp-back-link>
```

</template>
</code-example>

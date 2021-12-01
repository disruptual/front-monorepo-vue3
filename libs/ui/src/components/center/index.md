<script setup>
import { ref, computed } from 'vue';
import component from './index.vue'
</script>

# Center

[[toc]]

## Description

DspCenter permet de centrer du contenu en utilisant les flexboxs <br/> 
et plus particulièrement le component [DspFlex](../flex/index).

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

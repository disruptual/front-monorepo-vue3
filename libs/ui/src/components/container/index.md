<script setup>
import { ref } from 'vue';
import component from './index.vue'

</script>

# Container

[[toc]]

## Description

Ce composant affiche son contenu centré, avec une largeur maximum sur tablette et desktop.

## Props

<props-parser :props="component.props" />

## Example

<code-example>
<dsp-container is-small style="border: solid 1px var(--color-separator)">Disruptual UI rocks !</dsp-container>
<template v-slot:html>

```html
<dsp-container is-small style="border: solid 1px var(--color-separator)">
  Disruptual UI rocks !
</dsp-container>
```

</template>
</code-example>

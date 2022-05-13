<script setup>
import { ref } from 'vue';
import component from './index.vue'

const isOpened = ref(false);
</script>

# ChipCount

[[toc]]

## Description

Le composant ChipCount permet d'afficher une pastille informative avec un nombre.

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example


<code-example>
<dsp-chip-count> 
 <p>un texte avec une pastille</p>
</dsp-chip-count>

<template v-slot:html>

```html
<dsp-chip-count> 
 <p>un texte avec une pastille</p>
</dsp-chip-count>
```

</template>

<template v-slot:js>

```js
const isOpened = ref(false);
```

</template>
</code-example>
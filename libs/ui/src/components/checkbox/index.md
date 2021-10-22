<script setup>
import { ref } from 'vue';
import component from './index.vue'

const value = ref(['gamelle'])
</script>

# Checkbox

[[toc]]

## Description

Le composant `<dsp-checkbox />` est utilisé dans un formulaire pour selectionner une plusieurs valeurs d'une liste d'options.

## Props

<props-parser :props="component.props" />

## Example

<code-example>
<fieldset>
  <legend>Où manger ce midi ?</legend>
  <dsp-checkbox v-model="value" value="mcdo" label="Mc Donalds" />
  <dsp-checkbox v-model="value" value="etoiline" label="Etoiline" />
  <dsp-checkbox v-model="value" value="etoiline" label="Sushi Kyo" disabled />
  <dsp-checkbox v-model="value" value="gamelle" label="J'ai ma gamelle" disabled />
</fieldset>
<template v-slot:html>

```html
<fieldset>
  <legend>Où manger ce midi ?</legend>
  <dsp-checkbox v-model="value" value="mcdo" label="Mc Donalds" />
  <dsp-checkbox v-model="value" value="etoiline" label="Etoiline" />
  <dsp-checkbox v-model="value" value="gamelle" label="J'ai ma gamelle" disabled />
</fieldset>
```

</template>

<template v-slot:js>

```js
const value = ref(['mcdo'])
```

</template>
</code-example>

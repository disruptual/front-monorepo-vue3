<script setup>
import { ref } from 'vue';
import component from './index.vue'
const myDate = ref(null)

</script>

# DatePicker

[[toc]]

## Description

Le composant Datepicker permet de choisir une date dans un champs de saisie.

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<p>Un example de date picker :</p>
<dsp-date-picker v-model="myDate"/>
<template v-slot:html>

```html
<dsp-date-picker v-model="myDate"/>
```

</template>

<template v-slot:js>

```js
const myDate = ref(null)
```

</template>
</code-example>

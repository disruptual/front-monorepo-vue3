<script setup>
import { ref } from 'vue';
import component from './index.vue'

const isOpened = ref(false);
</script>

# Dropdown

[[toc]]

## Description

Component description

## Props

<props-parser :props="component.props" />

## Example


<code-example>
<dsp-dropdown v-model:isOpened="isOpened">
  <template v-slot:toggle>
    Actions
  </template>
  <template v-slot:menu>
    <dsp-dropdown-item>Edit</dsp-dropdown-item>
    <dsp-dropdown-item>Delete</dsp-dropdown-item>
  </template>
</dsp-dropdown>

<template v-slot:html>

```html
<dsp-dropdown v-model:isOpened="isOpened">
  <template v-slot:toggle>
    Actions
  </template>
  <template v-slot:menu>
    <dsp-dropdown-item>Edit</dsp-dropdown-item>
    <dsp-dropdown-item>Delete</dsp-dropdown-item>
  </template>
</dsp-dropdown>
```

</template>

<template v-slot:js>

```js
const isOpened = ref(false);
```

</template>
</code-example>
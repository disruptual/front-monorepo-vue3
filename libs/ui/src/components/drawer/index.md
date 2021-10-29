<script setup>
import { ref } from 'vue';
import component from './index.vue'

const isOpened = ref(false)
</script>

# Drawer

[[toc]]

## Description

Drawer description

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<dsp-button @click="isOpened = true">Open</dsp-button>

<dsp-drawer :isOpened="isOpened" @close="isOpened = false">
  <dsp-button @click="isOpened = false">Close</dsp-button>
</dsp-drawer>

<template v-slot:html>

```html
<dsp-button @click="isOpened = true">Open</dsp-button>

<dsp-drawer :isOpened="isOpened" @close="isOpened = false">
  <dsp-button @click="isOpened = false">Close</dsp-button>
</dsp-drawer>
```

</template>

<template v-slot:js>

```js
const isOpened = ref(false)
```

</template>
</code-example>

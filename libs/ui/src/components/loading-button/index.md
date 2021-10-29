<script setup>
import { ref } from 'vue';
import component from './index.vue'

const isLoading = ref(false);

const onClick = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

# LoadingButton

[[toc]]

## Description

Component description

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<dsp-loading-button :is-loading="isLoading" @click="onClick">Click me</dsp-loading-button>
<template v-slot:html>

```html
<dsp-loading-button :is-loading="isLoading" @click="onClick">Click me</dsp-loading-button>
```

</template>

<template v-slot:js>

```js
const isLoading = ref(false);

const onClick = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
```

</template>
</code-example>

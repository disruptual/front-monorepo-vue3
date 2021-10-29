<script setup>
import { ref } from 'vue';
import component from './index.vue'

const isOpened = ref(false);
</script>

# Modal

[[toc]]

## Description

Component description

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<dsp-button @click="isOpened = true">Open modal</dsp-button>
<dsp-modal :is-opened="isOpened" @close="isOpened = false">
  <div>Modal content</div>
</dsp-modal>
<template v-slot:html>

```html
Your HTML code example here
```

</template>

<template v-slot:js>

```js
Your JS code example here
```

</template>
</code-example>

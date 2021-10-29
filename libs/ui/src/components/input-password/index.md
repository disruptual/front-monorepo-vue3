<script setup>
import { ref } from 'vue';
import component from './index.vue'

const password = ref('');
</script>

# InputPassword

[[toc]]

## Description

Component description

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<dsp-input-password v-model="password" />
<template v-slot:html>

```html
<dsp-input-password v-model="password" />
```

</template>

<template v-slot:js>

```js
const password = ref('');
```

</template>
</code-example>

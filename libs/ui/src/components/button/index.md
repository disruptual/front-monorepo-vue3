<script setup>
import { ref } from 'vue';
import component from './index.vue'

const count = ref(0);
const variant = ref('default');
</script>

# Button

[[toc]]

## Description

Component description

## Props

<props-parser :props="component.props" />

## Example

<code-example>
<dsp-button @click="count++" :variant="variant">Click me</dsp-button>
<span>Number of clicks: {{count}}</span>
<variant-selector v-model="variant" :variants="['default', 'gradient']" />

<template v-slot:html>

```html
<dsp-button @click="count++" :variant="variant">
  Click me
</dsp-button>
<span>Number of clicks: {{count}}</span>
<variant-selector v-model="variant" :variants="['default', 'gradient']" />
```

</template>

<template v-slot:js>

```js
const count = ref(0);
const variant = ref('default');
```

</template>
</code-example>

<script setup>
import { ref } from 'vue';
import component from './index.vue'

const isToggled = ref(false)
</script>

# Radio

[[toc]]

## Description

Component description

## Props

<props-parser :props="component.props" />

## Example

<code-example>
<dsp-switch v-model="isToggled" />

<template v-slot:html>

```html
<dsp-switch v-model="isToggled />
```

</template>

<template v-slot:js>

```js
const isToggled = ref(false)
```

</template>
</code-example>

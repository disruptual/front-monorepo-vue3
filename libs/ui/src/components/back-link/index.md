<script setup>
import { ref } from 'vue';
import component from './index.vue'
console.log(component)
</script>

# BackLink

[[toc]]

## Description

Description BackLink

## Props

<props-parser :props="component.props" />

## Example

<code-example>
<dsp-back-link label="Retour"><div>My custom content</div></dsp-back-link>
<template v-slot:html>

```html
<dsp-back-link label="Retour">
  <div>My custom content</div>
</dsp-back-link>
```

</template>
</code-example>

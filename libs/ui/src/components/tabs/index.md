<script setup>
import { ref } from 'vue';
import component from './index.vue'
</script>

# Tabs

[[toc]]

## Description

Component description

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<dsp-tabs initial-open-tab="sales">
<dsp-tab name="sales" label="My sales">
<p>Content of the sales tab</p>
</dsp-tab>

<dsp-tab name="purchases" label="My purchases">
<p>Content of the purchases tab</p>
</dsp-tab>
</dsp-tabs>
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

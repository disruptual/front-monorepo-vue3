<script setup>
import { ref } from 'vue';
import component from './index.vue'

</script>

# Flex

[[toc]]

## Description

DspFlex permet de conteneuriser un élément avec un élément html utilisant flexbox.

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<p>Un exemple de contenu :</p>
<dsp-flex as="div" direction="row" justify="center">contenu</dsp-flex>
<template v-slot:html>

```html
<dsp-flex as="div" direction="row" justify="center">contenu</dsp-flex>
```

</template>

<template v-slot:js>

```js
Your JS code example here
```

</template>
</code-example>

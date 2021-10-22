<script setup>
import { ref } from 'vue';
import component from './index.vue'

const ratio = ref(1);
const values = [
  { value: 1, label: '1' },
  { value: 4 / 3, label: '4/3' }, 
  { value: 16 / 9, label: '16 / 9' }
]
</script>

# AspectRatio

[[toc]]

## Description

Le composant `<dsp-aspect-ratio>` sert à assurer que la hauteur de ses enfants respectera un certain ratio. Il est utilisé pour wrapper des images, embeds de video ou un slider d'images type carousel, par exemple.

## Example

<code-example>
<dsp-radio-group v-model.number="ratio" :values="values" row />
<dsp-aspect-ratio :ratio="ratio">
  <dsp-image src="https://mcdn.wallpapersafari.com/medium/73/77/pAPo1m.jpg" />
</dsp-aspect-ratio>
<template v-slot:html>

```html
<dsp-radio-group v-model="ratio" :values="values" row />
<dsp-aspect-ratio :ratio="ratio">
  <dsp-image src="https://mcdn.wallpapersafari.com/medium/73/77/pAPo1m.jpg" />
</dsp-aspect-ratio>
```

</template>

<template v-slot:js>

```js
const ratio = ref(1);
const values = [
  { value: 1, label: 1 },
  { value: 4 / 3, label: '4/3' }, 
  { value: 16 / 9, label: '16 / 9' }
]

```

</template>
</code-example>

## Props

<props-parser :props="component.props" />

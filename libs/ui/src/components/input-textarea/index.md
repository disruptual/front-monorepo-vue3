<script setup>
import { ref, computed } from 'vue';
import component from './index.vue'
const content = ref("")

</script>

# TextArea

[[toc]]

## Description

InputTextarea est un composant permettant de taper du texte dans un champs de saisis de texte. <br/> 

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<h3>Une exemple d'utilisation de textearea :</h3>
    <p>Pas de resize manuelle, ni auto</p>
    <dsp-input-textarea v-model="content" :isAutoResizable="false" :isResizable="false"/>
    <p>resize manuelle et auto activé</p>
    <dsp-input-textarea v-model="content" :isAutoResizable="true" :isResizable="true"/>
<template v-slot:html>

```html
<dsp-input-textarea v-model="content" :isAutoResizable="false" :isResizable="false"/>
```

</template>

<template v-slot:js>

```js
const content = ref("")
```

</template>
</code-example>
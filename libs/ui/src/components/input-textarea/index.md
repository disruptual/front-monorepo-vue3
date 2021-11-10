<script setup>
import { ref, computed } from 'vue';
import component from './index.vue'
let isToggledContent = ref(false)
const content1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
const content2 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
const getContent = computed(() => {
    return isToggledContent.value ? content1 : content2
})

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
<p>Une exemple d'utilisation de textearea :</p>
<dsp-flex align="center"> 
    <p>Changer de contenu : </p>  
    <dsp-switch class="switch" v-model="isToggledContent"/>
</dsp-flex>
<dsp-input-textarea v-model="getContent" />
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

<style lang="scss" scoped>
    .dsp-switch {
        margin-left: var(--spacing-md)
    }
</style>

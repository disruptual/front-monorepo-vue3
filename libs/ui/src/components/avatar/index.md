<script setup>
import { ref } from 'vue';
import component from './index.vue'

const user1 = {
  avatar: { url: 'https://mcdn.wallpapersafari.com/medium/73/77/pAPo1m.jpg' }
}

const user2 = {
   firstName: 'John', lastName: 'Doe' 
}

</script>

# Avatar

[[toc]]

## Description

Ce composant affiche l'avatar d'un utililsateur ou, si celui-ci n'en possède pas, ses initiales.
## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />
## Example


<code-example>
<dsp-flex gap="md">
  <dsp-avatar :user="user1"/>
  <dsp-avatar :user="user2"/>
</dsp-flex>

<template v-slot:html>

```html
<dsp-flex gap="md">
  <dsp-avatar :user="user1"/>
  <dsp-avatar :user="user2"/>
</dsp-flex>
```

</template>

<template v-slot:js>

```js
const user1 = {
  avatar: { url: 'https://mcdn.wallpapersafari.com/medium/73/77/pAPo1m.jpg' }
}

const user2 = {
   firstName: 'John', lastName: 'Doe' 
}
```

</template>
</code-example>
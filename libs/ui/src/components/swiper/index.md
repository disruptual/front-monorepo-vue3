<script setup>
import { ref } from 'vue';
import component from './index.vue'
const content = 'Example'
const items = new Array(10).fill({content});

</script>

# Swiper

[[toc]]

## Description

Component description

## Props

<props-parser :props="component.props" />

## Emits

<emits-parser :emits="component.emits" />

## Example

<code-example>
<p>An example of an swiper :</p>
<dsp-swiper as="ul">
        <dsp-swiper-item class="items-list" v-for="(item, index) in items" as="li">
            <dsp-flex class="item" align="center" justify="center">
                {{item.content}}
            </dsp-flex>
        </dsp-swiper-item>
    </dsp-swiper>
<template v-slot:html>

```html
    <dsp-swiper as="ul">
        <dsp-swiper-item v-for="item in items" :key="item.id" as="li">
            <p>test</p>
        </dsp-swiper-item>
    </dsp-swiper>
```

</template>

<template v-slot:js>
```js
Your JS code example here
```

</template>
</code-example>

<style lang="scss" scoped>
    .items-list {
        border: 1px solid var(--color-primary);
        list-style-type: none;
        cursor: pointer;
        user-select: none;
    }
    .item {
        width:var(--spacing-xxl);
        height:var(--spacing-xxl);
    }
</style>

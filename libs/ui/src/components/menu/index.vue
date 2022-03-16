<script>
export default { name: 'DspMenu' };
</script>

<script setup>
import { vReadableColor } from '@dsp/ui/directives/readableColor';
import schema from './index.schema';

const emit = defineEmits(['click']);
const props = defineProps({
  items: { type: Array, required: true },
  ...schema.toProps()
});

const context = schema.toContext(props);

const getItemClasses = item => ({
  'menu-item--is-active': item.isActive
});
</script>

<template>
  <nav v-readable-color class="menu">
    <dsp-swiper as="ul">
      <dsp-swiper-item
        v-for="item in props.items"
        :key="item.name"
        as="li"
        :class="getItemClasses(item)"
      >
        <slot v-bind="{ item }">
          <dsp-plain-button @click="emit('click', item.name)">
            {{ item.label }}
          </dsp-plain-button>
        </slot>
      </dsp-swiper-item>
    </dsp-swiper>
  </nav>
</template>

<style lang="scss" scoped>
.menu {
  margin: var(--spacing-sm) auto 0;
  padding-bottom: var(--spacing-sm);
  width: fit-content;
  max-width: 100%;
  overflow-x: hidden;

  li {
    border-bottom: 2px solid var(--color-disabled);
    display: flex;
    align-items: center;
    position: relative;

    &.menu-item--is-active {
      border-color: v-bind('context.activeColor');
    }
  }
}
</style>

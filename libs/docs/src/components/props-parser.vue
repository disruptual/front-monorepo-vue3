<script setup>
const props = defineProps({
  props: { type: Object, default: null }
});

const hasProps = props.props && Object.keys(props.props).length > 0;
</script>

<template>
  <p v-if="!hasProps">Ce composant ne possède pas de props.</p>
  <ul v-else>
    <li v-for="(prop, key) in props.props" :key="key" class="prop">
      <div class="prop__name">
        {{ key }}
        <span v-show="prop.required">required</span>
      </div>
      <div>
        Type:
        <code>{{ prop.type?.name || 'any' }}</code>
      </div>
      <div v-show="prop.default">
        default:
        {{ prop.default }}
      </div>

      <div>{{ prop.description }}</div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.prop {
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-sm);

  > * {
    margin-bottom: var(--spacing-xs);
  }
}

.prop__name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);

  span {
    font-weight: var(--font-weight-medium);
    margin-left: var(--spacing-md);
    font-size: var(--font-size-md);
  }
}
</style>

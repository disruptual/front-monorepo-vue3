<script setup>
import { inject } from 'vue';
import { useAppContext } from '@dsp/core';
import { get } from 'lodash-es';

defineProps({
  component: { type: String, required: true },
  schema: { type: Object, required: true }
});

const devtoolsContext = inject('devtoolsContext');
const appContext = useAppContext();

const getValue = (propPath, devtoolsCtxPath = propPath) => {
  return (
    get(appContext, propPath) ??
    get(devtoolsContext.schema, `${devtoolsCtxPath}.default`)
  );
};

const update = (path, value) => {
  devtoolsContext.update({ path, value });
};
</script>

<template>
  <dsp-flex direction="column" gap="sm">
    <h3>{{ component }}</h3>
    <dsp-grid :columns="3">
      <fieldset v-for="(property, propertyKey) in schema" :key="propertyKey">
        <template v-if="property.type === 'object'">
          <legend>{{ propertyKey }}</legend>
          <template
            v-for="(objectProp, objectPropKey) in property.shape"
            :key="objectPropKey"
          >
            <label :for="`${component}:${propertyKey}:${objectPropKey}`">
              {{ objectPropKey }}
            </label>
            <input
              :for="`${component}:${propertyKey}:${objectPropKey}`"
              :value="
                getValue(
                  `${component}.${propertyKey}.${objectPropKey}`,
                  `${component}.${propertyKey}.shape.${objectPropKey}`
                )
              "
              @input="
                update(
                  `${component}.${propertyKey}.${objectPropKey}`,
                  $event.target.value
                )
              "
            />
          </template>
        </template>

        <template v-else>
          <label :for="`${component}:${propertyKey}`">
            {{ propertyKey }}
          </label>
          <input
            v-if="property.type === 'boolean'"
            :id="`${component}:${propertyKey}`"
            type="checkbox"
            :checked="getValue(`${component}.${propertyKey}`)"
            @change="
              update(`${component}.${propertyKey}`, $event.target.checked)
            "
          />
          <input
            v-else
            :id="`${component}:${propertyKey}`"
            :value="getValue(`${component}.${propertyKey}`)"
            @input="update(`${component}.${propertyKey}`, $event.target.value)"
          />
        </template>
      </fieldset>
    </dsp-grid>
  </dsp-flex>
</template>

<style scoped>
h3 {
  margin: 0;
}

fieldset {
  border: none;
  padding: 0;
}
label,
input {
  display: block;
}

label,
legend {
  text-transform: capitalize;
}
</style>

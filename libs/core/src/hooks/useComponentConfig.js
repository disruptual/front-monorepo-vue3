import { useStore } from 'vuex';
import { computed } from 'vue';
import { toConfig } from '@dsp/core/types/schemaValidation';

export const useComponentConfig = (name, props, schema) => {
  const store = useStore();
  const context = computed(() => store.getters.componentContext(name));

  return computed(() => toConfig(name, schema, context.value, props));
};

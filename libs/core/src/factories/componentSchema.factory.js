import {
  toProps as toMappedProps,
  toConfig
} from '@dsp/core/types/schemaValidation';
import { types } from '@dsp/core/types/helpers';
import { useStore } from 'vuex';
import { useAttrs, computed, shallowRef, watchEffect } from 'vue';

export const createComponentSchema = (name, schema) => {
  function toContext(props) {
    const store = useStore();
    const context = computed(() => store.getters.componentContext(name));

    return computed(() => toConfig(name, schema, context.value, props));
  }

  function toProps() {
    return toMappedProps(name, schema);
  }

  function toVariantProps() {
    const { variant, ...props } = toProps(name, schema);

    return props;
  }

  function toVariant(props) {
    const attrs = useAttrs();
    const config = toContext(props);
    const variantComponent = shallowRef(null);
    const variantProps = computed(() => ({
      ...attrs,
      ...props,
      ...config.value
    }));

    watchEffect(async () => {
      const module = await config.value.variant();
      variantComponent.value = module.default;
    });

    return { variantComponent, variantProps };
  }

  function toDevtools() {
    return [name, schema(types)];
  }

  return { toContext, toProps, toVariantProps, toVariant, toDevtools };
};

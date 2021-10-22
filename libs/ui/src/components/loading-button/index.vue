<script>
export default { name: 'DspLoadingButton' };
</script>
<script setup>
import schema from './index.schema';

const props = defineProps({
  isLoading: { type: Boolean, required: true },
  ...schema.toProps()
});

const context = schema.toContext(props);
</script>

<template>
  <dsp-button v-bind="$attrs" :disabled="isLoading" class="loading-button">
    <template v-if="context.showLabelWhileLoading" #right-icon>
      <dsp-loader class="icon" :class="!isLoading && 'icon--is-hidden'" />
    </template>

    <div class="content">
      <div
        class="label"
        :class="
          !context.showLabelWhileLoading && isLoading && 'label--is-hidden'
        "
      >
        <slot />
      </div>
      <dsp-flex justify="center">
        <dsp-loader v-if="!context.showLabelWhileLoading && isLoading" />
      </dsp-flex>
    </div>
  </dsp-button>
</template>

<style lang="scss" scoped>
.icon {
  transition: width var(--transition-sm);
  margin-left: var(--spacing-sm);
}

.icon--is-hidden {
  visibility: hidden;
  width: 0;
}

.content {
  display: grid;
  place-content: center;

  > * {
    grid-column: 1;
    grid-row: 1;
  }
}

.label--is-hidden {
  visibility: hidden;
}
</style>

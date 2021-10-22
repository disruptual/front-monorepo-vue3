<script>
export default { name: 'DspCenter' };
</script>

<template>
  <dsp-flex align="center" justify="center" direction="column" v-bind="$attrs">
    <slot />
  </dsp-flex>
</template>

<script>
export default { name: 'HeaderBreadcrumbs' };
</script>

<script setup>
import { inject } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';
import { useDevice, useReadableColor } from '@dsp/ui';

const device = useDevice();
const breadcrumbs = inject(CONTEXT_KEYS.BREADCRUMB);

const textColor = useReadableColor('--color-brand-500');
</script>

<template>
  <dsp-flex class="header-breadcrumbs" align="center">
    <router-link :to="{ name: 'Home' }" class="home-entry">
      <dsp-icon icon="home" />
      <span v-if="!device.isMobile">Home</span>
    </router-link>

    <router-link
      v-for="breadcrumb in breadcrumbs.breadcrumbs"
      :key="breadcrumb.id"
      class="entry"
      :to="breadcrumb.target"
      @click="breadcrumbs.goTo(breadcrumb.id)"
    >
      <dsp-truncated-text width="15ch">
        {{ breadcrumb.label }}
      </dsp-truncated-text>
    </router-link>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.header-breadcrumbs {
  background-color: var(--color-brand-500);
  color: v-bind(textColor);
  overflow: hidden;
}

a {
  color: inherit;
  text-decoration: none;
  padding: var(--spacing-xs);
  background-color: var(--color-brand-500);

  &:hover {
    background-color: var(--color-brand-600);
  }
}

.home-entry {
  display: flex;
  gap: var(--spacing-xxs);
  align-items: center;
  border-right: solid 1px v-bind(textColor);
}

.entry {
  display: flex;
  align-items: center;
  position: relative;

  &:not(:last-child):after {
    content: '';
    height: 8px;
    width: 8px;
    position: absolute;
    left: 100%;
    z-index: 1;
    transform: rotateZ(45deg) translateY(25%);
    border-top: solid 1px v-bind(textColor);
    border-right: solid 1px v-bind(textColor);
    background: inherit;
  }

  &:not(:nth-of-type(2)) {
    padding-left: var(--spacing-lg);
  }

  > div {
    position: relative;
    z-index: 2;
  }
}
</style>

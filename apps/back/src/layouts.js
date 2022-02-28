import { defineAsyncComponent } from 'vue';

const lazyDefaultLayout = defineAsyncComponent(() =>
  import('@/components/layouts/default-layout/index.vue')
);
const lazyFullPageLayout = defineAsyncComponent(() =>
  import('@/components/layouts/full-page-layout/index.vue')
);

export default {
  default: lazyDefaultLayout,
  fullPage: lazyFullPageLayout
};

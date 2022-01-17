import { defineAsyncComponent } from 'vue';

// async components
// These are the lesser used components that we don't want to include in the main bundle
export const DspBackLink = defineAsyncComponent(() =>
  import('./back-link/index.vue')
);
export const DspInputText = defineAsyncComponent(() =>
  import('./input-text/index.vue')
);
export const DspInputTextarea = defineAsyncComponent(() =>
  import('./input-textarea/index.vue')
);
export const DspInputPassword = defineAsyncComponent(() =>
  import('./input-password/index.vue')
);
export const DspFormControl = defineAsyncComponent(() =>
  import('./form-control/index.vue')
);
export const DspFormError = defineAsyncComponent(() =>
  import('./form-error/index.vue')
);
export const DspCheckbox = defineAsyncComponent(() =>
  import('./checkbox/index.vue')
);
export const DspRadio = defineAsyncComponent(() => import('./radio/index.vue'));
export const DspRadioGroup = defineAsyncComponent(() =>
  import('./radio-group/index.vue')
);
export const DspModal = defineAsyncComponent(() => import('./modal/index.vue'));
export const DspVisuallyHidden = defineAsyncComponent(() =>
  import('./visually-hidden/index.vue')
);
export const DspVNode = defineAsyncComponent(() => import('./v-node/index.js'));
export const DspSwitch = defineAsyncComponent(() =>
  import('./switch/index.vue')
);
export const DspInputSearch = defineAsyncComponent(() =>
  import('./input-search/index.vue')
);
export const DspDatePicker = defineAsyncComponent(() =>
  import('./date-picker/index.vue')
);
export const DspSlider = defineAsyncComponent(() =>
  import('./slider/index.vue')
);
export const DspSelect = defineAsyncComponent(() =>
  import('./select/index.vue')
);
export const DspInputFile = defineAsyncComponent(() =>
  import('./input-file/index.vue')
);

// Multi part components
export * from './smart-form';
export * from './transitions';
export * from './drawer';
export * from './dropdown';
export * from './tabs';
export * from './swiper';
export * from './grid';

// commonly used, single part components
// this also includes component that are likely to cause a layout shift if they were imported asychronously
export { default as DspTruncatedText } from './truncated-text/index.vue';
export { default as DspAspectRatio } from './aspect-ratio/index.vue';
export { default as DspIcon } from './icon/index.vue';
export { default as DspImage } from './image/index.vue';
export { default as DspSurface } from './surface/index.vue';
export { default as DspButton } from './button/index.vue';
export { default as DspPlainButton } from './plain-button/index.vue';
export { default as DspFlex } from './flex/index.vue';
export { default as DspContainer } from './container/index.vue';
export { default as DspLoader } from './loader/index.vue';
export { default as DspLoadingButton } from './loading-button/index.vue';
export { default as DspInfiniteScroll } from './infinite-scroll/index.vue';
export { default as DspInfiniteQueryLoader } from './infinite-query-loader/index.vue';
export { default as DspIconButton } from './icon-button/index.vue';
export { default as DspAvatar } from './avatar/index.vue';
export { default as DspQueryLoader } from './query-loader/index.vue';
export { default as DspCenter } from './center/index.vue';
export { default as DspToastsContainer } from './toasts-container/index.vue';
export { default as DspAlert } from './alert/index.vue';
export { default as DspMenu } from './menu/index.vue';

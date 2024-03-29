import { computed, unref } from 'vue';
import {
  CAROUSEL_VIEW_MODES,
  CAROUSEL_CTA_ALIGNMENTS
} from '@/utils/constants';
export const usePreviewStyle = ({ isExpanded, model, containerWidth }) => {
  const shouldAdjustSizes = computed(() => {
    return model.viewMode === CAROUSEL_VIEW_MODES.DESKTOP && !isExpanded.value;
  });

  const height = computed(() => {
    let height;
    if (model.viewMode === CAROUSEL_VIEW_MODES.MOBILE) {
      height = model.settings.carouselMobileHeight;
    } else if (shouldAdjustSizes.value) {
      height =
        (model.settings.carouselHeight * unref(containerWidth)) /
        window.innerWidth;
    } else {
      height = model.settings.carouselMobileHeight;
    }
    return `${height}px`;
  });

  const background = computed(
    () => `url(${model.getSlideSrc(model.selectedSlide)})`
  );

  const sizes = computed(() => {
    const baseFontSize = 18;
    const baseCtaPadding = 14;

    const fontSize = shouldAdjustSizes.value
      ? (baseFontSize * unref(containerWidth)) / window.innerWidth
      : baseFontSize;
    const ctaPadding = shouldAdjustSizes.value
      ? (baseCtaPadding * unref(containerWidth)) / window.innerWidth
      : baseCtaPadding;

    return {
      fontSize: `${fontSize}px`,
      ctaPadding: `${ctaPadding}px`
    };
  });

  const ctaAlign = computed(
    () => CAROUSEL_CTA_ALIGNMENTS[model.settings.textAlign]
  );

  const backgroundColor = computed(() => {
    const { overlayBackgroundColor = {} } =
      model.selectedSlide?.carouselItemSettings;
    const { r = '0', g = '0', b = '0', a = '0.5' } = overlayBackgroundColor;

    return `rgba(${r},${g},${b},${a})`;
  });

  const overlayBackgroundColor = computed(() => {
    return model.selectedSlide?.textHasAnOverlay
      ? backgroundColor.value
      : 'transparent';
  });

  const overlayColor = computed(() => {
    return (
      model.selectedSlide?.carouselItemSettings?.overlayTextColor || 'white'
    );
  });

  return {
    height,
    sizes,
    background,
    ctaAlign,
    overlayBackgroundColor,
    overlayColor
  };
};

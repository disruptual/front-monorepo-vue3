<script>
export default { name: 'CarouselEditor' };
</script>

<script setup>
import { reactive, provide, ref } from 'vue';
import { Carousel } from '@dsp/business';
import { CONTEXT_KEYS } from '@/utils/constants';
import { CarouselEditor } from '@/models/CarouselEditor.model';
import { useDevice, vOnIntersect, useToast } from '@dsp/ui';
import { useMediaApi, useCarouselItemApi, useCarouselApi } from '@dsp/core';

import CarouselEditorSlidesManager from './carousel-editor-slides-manager/index.vue';
import CarouselEditorPreview from './carousel-editor-preview/index.vue';
import CarouselEditorSelectedSlideForm from './carousel-editor-selected-slide-form/index.vue';
import CarouselEditorGlobalOptionsForm from './carousel-editor-global-options-form/index.vue';
import CarouselEditorActionBar from './carousel-editor-action-bar/index.vue';

const props = defineProps({
  carousel: { type: Carousel, required: true }
});
const emit = defineEmits(['save:success']);

const device = useDevice();
const { showSuccess, showError } = useToast();
const model = reactive(new CarouselEditor({ settings: props.carousel }));

const isSaving = ref(false);

const mediaApi = useMediaApi();
const { mutateAsync: createMedia } = mediaApi.createMutation();
const carouselItemApi = useCarouselItemApi();
const { mutateAsync: createCarouselItem } = carouselItemApi.createMutation();
const { mutateAsync: updateCarouselItem } = carouselItemApi.updateMutation();
const { mutateAsync: deleteCarouselItems } =
  carouselItemApi.deleteManyMutation();
const { mutateAsync: updateCarousel } = useCarouselApi().updateMutation();

const saveMedias = () => {
  return Promise.all(
    Object.entries(model.newMedias).map(async ([carouselItemId, entity]) => {
      const carouselItem = model.settings.carouselItems.find(
        item => String(item.id) === carouselItemId
      );
      if (!carouselItem) return;

      const media = await createMedia(entity);
      carouselItem.media = media;
    })
  );
};

const saveCarouselItems = async () => {
  await Promise.all(
    model.settings.carouselItems.map(carouselItem => {
      if (model.createdIds.includes(carouselItem.id)) {
        const { id, media, ...entity } = carouselItem;
        return createCarouselItem({ ...entity, media: media['@id'] });
      } else {
        const { media, id, ...item } = carouselItem;
        return updateCarouselItem({
          id,
          entity: { ...item, media: media['@id'] }
        });
      }
    })
  );

  await deleteCarouselItems(model.deletedIds);
};

const saveCarousel = () => {
  const { carouselItems, carouselSettings, ...carousel } = model.settings;
  return updateCarousel({
    id: carousel.id,
    entity: { ...carousel, carouselSettings: carouselSettings ?? {} }
  });
};

provide(CONTEXT_KEYS.CAROUSEL, {
  model,
  isSaving,
  async save() {
    try {
      isSaving.value = true;
      await saveMedias();
      await saveCarouselItems();
      await saveCarousel();
      model.reset();
      emit('save:success');
      showSuccess('Carousel sauvegardé avec succès.');
    } catch (err) {
      console.error(err);
      showError('Erreur lors de la sauvegarde du carousel');
    } finally {
      isSaving.value = false;
    }
  }
});

const isActionBarSticking = ref(null);
const onActionBarIntersect = entry => {
  isActionBarSticking.value = entry.intersectionRatio < 1;
};

const headerHeight =
  document.documentElement.style.getPropertyValue('--header-height');
const intersectOptions = {
  rootMargin: `-${headerHeight} 9999px -${headerHeight} 9999px`, // we want to avoid horizontal intersecting
  threshold: 1
};
</script>

<template>
  <CarouselEditorActionBar
    v-on-intersect:[intersectOptions]="onActionBarIntersect"
    class="action-bar"
    :class="isActionBarSticking && 'action-bar--is-sticking'"
  />
  <dsp-grid :columns="device.isMobile ? 1 : 2" gap="md">
    <dsp-grid-item :column="device.isMobile ? 1 : 2">
      <CarouselEditorPreview />
    </dsp-grid-item>
    <dsp-grid-item :row="device.isMobile ? 2 : 1">
      <CarouselEditorGlobalOptionsForm />
    </dsp-grid-item>

    <dsp-grid-item>
      <h3>Slides Desktop</h3>
      <CarouselEditorSlidesManager :slides="model.desktopSlides" />
      <h3>Slides Mobile</h3>
      <CarouselEditorSlidesManager :slides="model.mobileSlides" />
    </dsp-grid-item>

    <dsp-grid-item>
      <CarouselEditorSelectedSlideForm v-if="model.selectedSlide" />
    </dsp-grid-item>
  </dsp-grid>
</template>

<style lang="scss" scoped>
.action-bar {
  position: sticky;
  top: calc(var(--header-height) - 6px);
  z-index: 1;
  background-color: var(--color-surface);
}

.action-bar--is-sticking {
  box-shadow: var(--box-shadow-md);
  margin-left: calc(-1 * var(--spacing-lg));
  margin-right: calc(-1 * var(--spacing-lg));
  padding-left: var(--spacing-lg);
  padding-right: var(--spacing-lg);
}
</style>

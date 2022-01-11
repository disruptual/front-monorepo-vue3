<script>
export default { name: 'CarouselEditorSlidesManager' };
</script>

<script setup>
import { inject, ref } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';

defineProps({
  slides: { type: Array, required: true }
});

defineEmits(['add']);

const { model } = inject(CONTEXT_KEYS.CAROUSEL);
const draggedSlide = ref(null);

const onDragStart = slide => {
  draggedSlide.value = slide;
};

const onDragEnd = () => {
  draggedSlide.value = null;
};

const onDragEnter = newIndex => {
  if (!draggedSlide.value) return;

  model.moveSlide(draggedSlide.value, newIndex);
};
</script>

<template>
  <dsp-flex gap="md" class="carousel-editor-slides-manager">
    <div
      v-for="(slide, index) in slides"
      :key="`${index}${slide.id}`"
      :draggable="true"
      class="thumbnail-grid"
      @dragstart="onDragStart(slide)"
      @dragend="onDragEnd(slide)"
      @dragenter="onDragEnter(index)"
    >
      <button
        class="slide-thumbnail"
        :class="
          slide.id === model.selectedSlideId && 'slide-thumbnail--is-active'
        "
        :style="{ '--background-url': `url(${model.getSlideSrc(slide)})` }"
        @click="model.selectedSlideId = slide.id"
      />
      <dsp-icon-button
        class="delete-button"
        icon="remove"
        is-plain
        @click="model.deleteSlide(slide.id)"
      />
    </div>
    <dsp-button class="add-button" @click="model.addSlide">
      <dsp-icon icon="add" />
    </dsp-button>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.carousel-editor-slides-manager {
  --item-size: 65px;
}

.thumbnail-grid {
  display: grid;
  height: var(--item-size);
  width: var(--item-size);
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
}

.slide-thumbnail {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  background-image: var(--background-url);
  background-size: cover;
  border: solid black 1px;
}

.slide-thumbnail--is-active {
  border: solid 3px var(--color-brand-500);
}

.add-button {
  height: var(--item-size);
  width: var(--item-size);
  background-color: var(--color-brand-500);
}

.delete-button {
  grid-row: 1;
  grid-column: 2;
  background-color: var(--color-red-600);
  color: white;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(50%, -50%);
}
</style>

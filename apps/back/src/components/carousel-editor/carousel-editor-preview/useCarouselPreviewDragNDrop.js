import { reactive } from 'vue';
import { throttle } from 'lodash-es';

export const useCarouselPreviewDragNDrop = (model, previewEl) => {
  const dragState = reactive({
    isDragging: false,
    direction: null
  });

  const onMousedown = direction => {
    dragState.isDragging = true;
    dragState.direction = direction;
  };

  const onMousemove = throttle(e => {
    if (!dragState.isDragging) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      previewEl.value.getBoundingClientRect();
    const isHorizontal = ['X', 'XEnd'].includes(dragState.direction);

    const percentage = isHorizontal
      ? ((clientX - left) * 100) / width
      : ((clientY - top) * 100) / height;

    const newPosition = Math.round(
      (percentage * model.settings.contentGridSize) / 100
    );
    const adjustedPosition = dragState.direction.includes('End')
      ? newPosition + 1
      : newPosition;

    const property = `textPosition${dragState.direction}`;
    model.selectedSlide[property] = adjustedPosition;
  }, 100);

  const onMouseup = () => {
    dragState.isDragging = false;
  };

  return { onMousedown, onMousemove, onMouseup };
};

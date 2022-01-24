<script>
export default { name: 'CarouselEditorPreview' };
</script>

<script setup>
import { inject, ref, computed, watch, nextTick } from 'vue';
import { debounce } from 'lodash-es';
import { vOnResize } from '@dsp/ui';
import { CONTEXT_KEYS, CAROUSEL_VIEW_MODES } from '@/utils/constants';
import { useCarouselPreviewDragNDrop } from './useCarouselPreviewDragNDrop';
import { usePreviewStyle } from './usePreviewStyle';

const { model } = inject(CONTEXT_KEYS.CAROUSEL);

const containerEl = ref(null);
const previewEl = ref(null);
const titleEl = ref(null);
const contentEl = ref(null);
const linkEl = ref(null);

const { onMousedown, onMouseup, onMousemove } = useCarouselPreviewDragNDrop(
  model,
  previewEl
);
const isGridDisplayed = ref(false);
const isExpanded = ref(false);
const containerWidth = ref(false);
const previewStyle = usePreviewStyle({
  model,
  isExpanded,
  containerWidth
});

const onContainerResize = debounce(([entry]) => {
  containerWidth.value = entry.contentRect.width;
}, 100);

const containerClasses = computed(() => ({
  'preview-container--is-mobile': model.viewMode === CAROUSEL_VIEW_MODES.MOBILE,
  'preview-container--is-expanded': isExpanded.value
}));

const onInput = () => {
  model.selectedSlide.title = titleEl.value.innerText;
  model.selectedSlide.content = contentEl.value.innerText;
  model.selectedSlide.btn = linkEl.value.innerText;
};

const updatePreviewText = slide => {
  const { title, content, btn } = slide;
  // checking for property equality avoids cursor position bugs due to contenteditable native behavior clash with vue binding
  if (titleEl.value.innerText !== title) {
    titleEl.value.innerText = title;
  }
  if (contentEl.value.innerText !== content) {
    contentEl.value.innerText = content;
  }
  if (linkEl.value.innerText !== btn) {
    linkEl.value.innerText = btn;
  }
};

watch(
  () => model.selectedSlide,
  (newVal, oldVal) => {
    if (!newVal) return;

    nextTick(() => {
      updatePreviewText(newVal);
    });
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <dsp-container>
    <dsp-checkbox
      id="has-guides"
      v-model="isGridDisplayed"
      label="Afficher la grille"
    />
  </dsp-container>
  <div ref="containerEl" v-on-resize="onContainerResize">
    <div :class="containerClasses">
      <div v-if="model.selectedSlide">
        <div
          ref="previewEl"
          class="slide-preview"
          :class="isGridDisplayed && 'slide-preview--with-guides'"
          @mouseup="onMouseup"
          @mousemove="onMousemove"
        >
          <dsp-icon-button
            icon="expand"
            class="expand-button"
            @click="isExpanded = !isExpanded"
          />
          <dsp-flex
            v-show="!model.settings.imagesAsLink"
            direction="column"
            gap="sm"
            wrap="nowrap"
            class="slide-content"
          >
            <button class="handle top-handle" @mousedown="oneMousedown('Y')" />
            <button
              class="handle bottom-handle"
              @mousedown="onMousedown('YEnd')"
            />
            <button class="handle left-handle" @mousedown="onMousedown('X')" />
            <button
              class="handle right-handle"
              @mousedown="onMousedown('XEnd')"
            />
            <p
              ref="titleEl"
              class="slide-content__title"
              contenteditable
              spellcheck="false"
              @input="onInput($event, 'title')"
            />
            <p
              ref="contentEl"
              class="slide-content__content"
              contenteditable
              spellcheck="false"
              @input="onInput($event, 'content')"
            />
            <div
              v-if="model.selectedSlide.link"
              ref="linkEl"
              class="slide-content__link"
              contenteditable
              spellcheck="false"
              @input="onInput($event, 'btn')"
            />
          </dsp-flex>
          <template v-for="i in model.settings.contentGridSize">
            <div
              v-for="j in model.settings.contentGridSize"
              :key="`cell-${i}-${j}`"
              class="cell"
              :style="{ '--row': i, '--column': j }"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
  <dsp-container>
    <dsp-alert color-scheme="yellow" icon="warning">
      La preview des slides peut ne pas être 100% identique au rendu dans votre
      application.
    </dsp-alert>
  </dsp-container>
</template>

<style lang="scss" scoped>
.preview-container--is-mobile {
  .slide-preview {
    width: 100%;
    max-width: 375px;
    margin-left: auto;
    margin-right: auto;
  }

  .slide-content__link {
    width: 100%;
  }
}

.slide-preview {
  --grid-size: v-bind('model.settings.contentGridSize');
  position: relative;
  height: v-bind('previewStyle.height.value');
  background: v-bind('previewStyle.background.value'), #444;
  background-size: cover;
  background-position: center;
  display: grid;
  grid-template-columns: repeat(var(--grid-size), minmax(0, 1fr));
  grid-template-rows: repeat(var(--grid-size), minmax(0, 1fr));
  margin: var(--spacing-md) 0;
  padding: var(--spacing-sm);
}

.preview-container--is-expanded {
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100%;
}

.slide-content {
  --x: v-bind('model.selectedSlide.textPositionX || 2');
  --x-end: v-bind('model.selectedSlide.textPositionXEnd || -1');
  --y: v-bind('model.selectedSlide.textPositionY || 4');
  --y-end: v-bind('model.selectedSlide.textPositionYEnd || 4');
  position: relative;
  font-size: 16px;
  grid-column: var(--x) / var(--x-end);
  grid-row: var(--y) / var(--y-end);
  color: white;
  text-align: v-bind('model.settings.textAlign');
  padding: var(--spacing-md);
  background-color: v-bind('previewStyle.overlay.value');

  p {
    margin: 0;
  }

  .handle {
    position: absolute;
    background: transparent;
    display: block;
    cursor: move;
    opacity: 0;
  }

  .top-handle {
    border-top: solid 4px var(--color-brand-500);
    left: 0;
    top: 0;
    height: 10px;
    width: 100%;
  }
  .bottom-handle {
    border-bottom: solid 4px var(--color-brand-500);
    left: 0;
    bottom: 0;
    height: 10px;
    width: 100%;
  }
  .left-handle {
    border-left: solid 4px var(--color-brand-500);
    left: 0;
    top: 0;
    bottom: 0;
    width: 10px;
  }
  .right-handle {
    border-right: solid 4px var(--color-brand-500);
    right: 0;
    top: 0;
    bottom: 0;
    width: 10px;
  }
}

.slide-content__title {
  font-weight: bold;
  font-size: v-bind('previewStyle.sizes.value.fontSize');
  margin-bottom: 14px;
}

.slide-content__content {
  font-size: v-bind('previewStyle.sizes.value.fontSize');
}

.slide-content__link {
  display: inline;
  margin-top: auto;
  padding: v-bind('previewStyle.sizes.value.ctaPadding');
  background: transparent;
  border: solid 1px white;
  color: inherit;
  align-self: v-bind('previewStyle.ctaAlign.value');
  font-size: v-bind('previewStyle.sizes.value.fontSize');
}

.cell {
  grid-row: var(--row);
  grid-column: var(--column);
  border: solid 1px rgba(0, 255, 255, 0.4);
  pointer-events: none;
  opacity: 0;
}

.slide-preview--with-guides {
  .cell,
  .handle {
    opacity: 1;
  }
}

.expand-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>

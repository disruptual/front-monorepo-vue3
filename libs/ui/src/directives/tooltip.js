import { isObject, isFunction } from '@dsp/core';
import { merge } from 'lodash-es';

const tooltipMap = new WeakMap();

const defaultOptions = {
  timeout: 400,
  popper: {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ]
  },
  text: ''
};

const getOptions = ({ arg, value }) =>
  merge({}, defaultOptions, isObject(value) ? value : { text: value }, {
    popper: {
      placement: arg || 'top'
    }
  });

const createTooltip = async (el, options) => {
  if (tooltipMap.has(el)) return;

  const text = isFunction(options.text) ? options.text() : options.text;
  if (!text) return;

  let tooltipElement = document.createElement('div');
  tooltipElement.classList.add('tooltip');
  const tooltipContentElement = document.createElement('span');
  const tooltipArrowAllement = document.createElement('div');
  tooltipArrowAllement.dataset.popperArrow = true;

  tooltipElement.appendChild(tooltipContentElement);
  tooltipElement.appendChild(tooltipArrowAllement);
  document.body.appendChild(tooltipElement);

  tooltipContentElement.textContent = text;
  const { createPopper } = await import('@popperjs/core');
  const popper = createPopper(el, tooltipElement, options.popper);
  tooltipElement.style.opacity = 1;

  tooltipMap.set(el, [tooltipElement, popper]);
};

const destroyTooltip = el => {
  if (!tooltipMap.has(el)) return;
  const [tooltipElement, popperInstance] = tooltipMap.get(el);
  popperInstance?.destroy();
  tooltipElement?.remove();
  tooltipMap.delete(el);
};

export const vTooltip = {
  mounted(el, binding) {
    const isTouchDevice = window.matchMedia(
      '(hover: none) and (pointer: coarse)'
    ).matches;
    if (isTouchDevice) return;

    let appearTimeout;
    const options = getOptions(binding);
    el.addEventListener('mouseenter', () => {
      appearTimeout = setTimeout(() => {
        createTooltip(el, options);
        appearTimeout = null;
      }, options.timeout);
    });

    el.addEventListener('mouseleave', () => {
      clearTimeout(appearTimeout);
      appearTimeout = null;
      destroyTooltip(el);
    });
  },

  unmounted(el) {
    destroyTooltip(el);
  }
};

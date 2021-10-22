import { onUnmounted, watchEffect, unref } from 'vue';
import { useDevice } from './useDevice';

export const useBodyScrollLock = (isLocked = true) => {
  const device = useDevice();

  const unset = () => {
    document.getElementById('app').removeAttribute('inert');
    document.body.style.overflow = null;
    document.body.style.width = null;
  };

  watchEffect(onInvalidate => {
    const appElement = document.getElementById('app');

    const scrollbarWidth = appElement.offsetWidth - appElement.clientWidth;

    if (unref(isLocked)) {
      appElement.setAttribute('inert', true);
      document.body.style.overflow = 'hidden';
      if (!device.isDesktop) return;

      document.body.style.width =
        document.body.clientWidth - scrollbarWidth + 'px';
    }

    onInvalidate(unset);
  });

  onUnmounted(unset);
};

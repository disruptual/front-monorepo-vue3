import { reactive } from 'vue';
import { debounce } from 'lodash-es';
import { getBreakpoints } from '@dsp/ui/utils/getBreakpoints';

const state = reactive({
  isMobile: false,
  isTablet: false,
  isLaptop: false,
  isDesktop: false,
  isUpToLaptop: false,
  isUpToDesktop: false
});

const checkCurrentDevice = debounce(() => {
  const { mobile, tablet } = getBreakpoints();

  state.isDesktop = window.matchMedia(
    `screen and (min-width: ${tablet})`
  ).matches;
  state.isTablet = window.matchMedia(
    `screen and (min-width: ${mobile}) and (max-width: ${tablet})`
  ).matches;
  state.isMobile = window.matchMedia(
    `screen and (max-width: ${mobile})`
  ).matches;
}, 100);
checkCurrentDevice();

window.addEventListener('resize', checkCurrentDevice);

export function useDevice() {
  checkCurrentDevice();

  return state;
}

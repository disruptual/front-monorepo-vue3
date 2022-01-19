import { mount } from '@vue/test-utils';
import DspIcon from './index.vue';

const defaultIcon = 'info';

describe('DspIcon', () => {
  it('should render correctly', () => {
    const wrapper = mount(DspIcon, { props: { icon: defaultIcon } });

    expect(wrapper.find('.dsp-icon')).toBeDefined();
  });

  it('should render an icon', () => {
    const wrapper = mount(DspIcon, {
      props: { icon: defaultIcon }
    });

    const svg = wrapper.find('svg');

    expect(svg.exists()).toBe(true);
  });
});

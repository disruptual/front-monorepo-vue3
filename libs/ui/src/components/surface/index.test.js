import { mount } from '@vue/test-utils';
import Surface from './index.vue';

describe('DspSurface', () => {
  it('should render correctly', () => {
    const wrapper = mount(Surface);

    expect(wrapper.find('.dsp-surface')).toBeDefined();
  });

  it('should have rounded corners', () => {
    const wrapper = mount(Surface, {
      props: { isRounded: true }
    });

    const classes = wrapper.find('.dsp-surface').classes();

    expect(classes).toContain('dsp-surface--is-rounded');
  });

  it('should render slot', () => {
    const wrapper = mount(Surface, {
      slots: { default: 'Test Slot' }
    });

    expect(wrapper.find('.dsp-surface').text()).toContain('Test Slot');
  });
});

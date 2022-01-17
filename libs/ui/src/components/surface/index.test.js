import * as utils from '@dsp/test-utils';
import Surface from './index.vue';

describe('DspSurface', () => {
  it('should render correctly', () => {
    const wrapper = utils.mountComponent(Surface);

    expect(wrapper.find('.dsp-surface')).toBeDefined();
  });

  it('should have rounded corners', () => {
    const wrapper = utils.mountComponent(Surface, {
      props: { isRounded: true }
    });

    const classes = wrapper.find('.dsp-surface').classes();

    expect(classes).toContain('dsp-surface--is-rounded');
  });

  it('should render slot', () => {
    const wrapper = utils.mountComponent(Surface, {
      slots: { default: 'Test Slot' }
    });

    expect(wrapper.find('.dsp-surface').text()).toContain('Test Slot');
  });
});

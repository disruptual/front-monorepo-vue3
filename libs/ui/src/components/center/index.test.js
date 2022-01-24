import { mount } from '@vue/test-utils';
import DspCenter from './index.vue';

describe('DspBackLink', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspCenter)).not.toThrow();
  });

  it('should render slot', () => {
    const textSlot = 'Text example';

    const wrapper = mount(DspCenter, {
      slots: { default: textSlot }
    });

    const child = wrapper.find('.dsp-flex');

    expect(child.text()).toContain(textSlot);
  });
});

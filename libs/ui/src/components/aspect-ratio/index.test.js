import { mount } from '@vue/test-utils';
import DspAspectRatio from './index.vue';

describe('DspAlert', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspAspectRatio)).not.toThrow();
  });

  it('should render slot', () => {
    const text = 'Text Slot';
    const wrapper = mount(DspAspectRatio, {
      slots: { default: text }
    });
    const button = wrapper.find('.dsp-aspect-ratio');

    expect(button.text()).toContain(text);
  });
});

import { mount } from '@vue/test-utils';
import TruncatedText from './index.vue';

describe('DspSurface', () => {
  it('should render correctly', () => {
    const wrapper = mount(TruncatedText);

    expect(wrapper.find('.dsp-button')).toBeDefined();
  });

  it('should render slot', () => {
    const wrapper = mount(TruncatedText, {
      slots: { default: 'Test Slot' }
    });

    expect(wrapper.find('.dsp-truncated-text').text()).toContain('Test Slot');
  });
});

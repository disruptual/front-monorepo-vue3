import { mountComponent } from '@dsp/test-utils';
import TruncatedText from './index.vue';

describe('DspSurface', () => {
  it('should render correctly', () => {
    const wrapper = mountComponent(TruncatedText);

    expect(wrapper.find('.dsp-button')).toBeDefined();
  });

  it('should render slot', () => {
    const wrapper = mountComponent(TruncatedText, {
      slots: { default: 'Test Slot' }
    });

    expect(wrapper.find('.dsp-truncated-text').text()).toContain('Test Slot');
  });
});

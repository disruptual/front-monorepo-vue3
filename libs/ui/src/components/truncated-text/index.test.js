import { mount } from '@vue/test-utils';
import TruncatedText from './index.vue';

const setup = ({ props, slots } = {}) => {
  const wrapper = mount(TruncatedText, {
    props,
    slots,
    global: {
      provide: {
        APP_CONTEXT: {}
      }
    }
  });

  return { wrapper };
};

describe('DspSurface', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();

    expect(wrapper.find('.dsp-truncated-text')).toBeDefined();
  });

  it('should render slot', () => {
    const { wrapper } = setup({ slots: { default: 'Test Slot' } });

    expect(wrapper.find('.dsp-truncated-text').text()).toContain('Test Slot');
  });
});

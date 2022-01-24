import { mount } from '@vue/test-utils';
import DspAlert from './index.vue';

describe('DspAlert', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspAlert)).not.toThrow();
  });

  it('should render slot', () => {
    const text = 'Text Slot';
    const wrapper = mount(DspAlert, {
      slots: { default: text }
    });
    const button = wrapper.find('.dsp-alert');

    expect(button.text()).toContain(text);
  });

  describe('props', () => {
    it('should render with an icon', () => {
      const wrapper = mount(DspAlert, { props: { icon: 'info' } });

      const iconComponent = wrapper.getComponent({ name: 'DspIcon' });

      expect(iconComponent.props('icon')).toBe('info');
    });
  });
});

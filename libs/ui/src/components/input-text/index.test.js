import { mount } from '@vue/test-utils';
import DspInputSearch from './index.vue';

describe('DspInputSearch', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspInputSearch)).not.toThrow();
  });

  it('should render slot', () => {
    const textSlot = 'Text example';

    const wrapper = mount(DspInputSearch, {
      slots: { 'left-icon': textSlot }
    });

    expect(wrapper.html()).toContain(textSlot);
  });

  describe('props', () => {
    it('should render a svg at left', async () => {
      const wrapper = mount(DspInputSearch, { props: { leftIcon: 'info' } });

      const rightIcon = wrapper.find('input + .icon .dsp-icon');
      const leftIcon = wrapper.find('.dsp-icon');

      expect(rightIcon.exists()).not.toBeTruthy();
      expect(leftIcon.exists()).toBeTruthy();
    });

    it('should render a svg at right', async () => {
      const wrapper = mount(DspInputSearch, { props: { rightIcon: 'info' } });

      const rightIcon = wrapper.find('input + .icon .dsp-icon');

      expect(rightIcon.exists()).toBeTruthy();
    });
  });
  describe('emit', () => {
    it('should emit update:modelValue when input is triggered', async () => {
      const modelValue = 'modelValue test';
      const wrapper = mount(DspInputSearch, {
        props: { modelValue: modelValue }
      });

      const input = wrapper.find('input');

      expect(input.element.value).toEqual(modelValue);

      await input.trigger('input', modelValue);

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([modelValue]);
    });
  });
});

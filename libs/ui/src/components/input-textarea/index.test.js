import { mount } from '@vue/test-utils';
import DspInputTextarea from './index.vue';

describe('DspInputTextarea', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspInputTextarea)).not.toThrow();
  });

  describe('emit', () => {
    it('should emit update:modelValue when input is triggered', async () => {
      const modelValue = 'modelValue test';
      const wrapper = mount(DspInputTextarea, {
        props: { modelValue: modelValue }
      });

      const input = wrapper.find('textarea');

      expect(input.element.value).toEqual(modelValue);

      await input.trigger('input', modelValue);

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([modelValue]);
    });
  });
});

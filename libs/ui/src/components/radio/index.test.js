import { mount } from '@vue/test-utils';
import DspRadio from './index.vue';

const testLabel = 'testLabel';

describe('DspRadio', () => {
  it('should render without throwing', () => {
    expect(() =>
      mount(DspRadio, {
        props: { label: testLabel, modelValue: false, value: false }
      })
    ).not.toThrow();
  });

  describe('emit', () => {
    it('should emit update:modelValue at input event', async () => {
      const expectedModelValue = 'false';
      const wrapper = mount(DspRadio, {
        props: { label: testLabel, modelValue: true, value: false }
      });

      const inputRadio = wrapper.find('input[type="radio"]');
      await inputRadio.trigger('input');

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
        expectedModelValue
      ]);
    });
  });

  describe('props', () => {
    it('should render a label', async () => {
      const wrapper = mount(DspRadio, {
        props: { label: testLabel, modelValue: false, value: false }
      });

      expect(wrapper.html()).toContain(testLabel);
    });
  });
});
